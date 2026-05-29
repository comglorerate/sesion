// Netlify Function: calendario económico (proxy + normalizador de ForexFactory).
// - Resuelve el problema de CORS (la fuente no envía cabeceras CORS).
// - Filtra a impacto alto/medio de divisas mayores y cachea ~10 min.
// Se consume desde la web (mismo origen) y desde la app Android (CORS *).

const SOURCES = [
  'https://nfs.faireconomy.media/ff_calendar_thisweek.json',
  'https://nfs.faireconomy.media/ff_calendar_nextweek.json'
];

const MAJORS = new Set(['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'NZD', 'CNY']);

// Cache en memoria por instancia "caliente"
let cache = { at: 0, data: null };
const TTL_MS = 10 * 60 * 1000;

const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'public, max-age=600'
};

async function fetchSource(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TradingSuite/1.0)' } });
  if (!res.ok) throw new Error('upstream ' + res.status + ' ' + url);
  return res.json();
}

exports.handler = async (event) => {
  if (event && event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: HEADERS, body: '' };
  }

  try {
    const now = Date.now();
    if (cache.data && (now - cache.at) < TTL_MS) {
      return { statusCode: 200, headers: HEADERS, body: JSON.stringify(cache.data) };
    }

    // Trae esta semana + (si se puede) la próxima
    const results = await Promise.allSettled(SOURCES.map(fetchSource));
    const raw = results
      .filter(r => r.status === 'fulfilled' && Array.isArray(r.value))
      .flatMap(r => r.value);

    if (!raw.length) throw new Error('sin datos de las fuentes');

    const seen = new Set();
    const events = raw
      .filter(e => e && e.title && e.date)
      .filter(e => e.impact === 'High' || e.impact === 'Medium')
      .filter(e => MAJORS.has(String(e.country || '').toUpperCase()))
      .map(e => ({
        title: String(e.title),
        currency: String(e.country || '').toUpperCase(),
        date: e.date,                  // ISO con offset de zona horaria
        impact: e.impact,              // High | Medium
        forecast: e.forecast || '',
        previous: e.previous || '',
        actual: e.actual || ''
      }))
      .filter(e => {
        const k = e.date + '|' + e.currency + '|' + e.title;
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const data = { updated: new Date(now).toISOString(), count: events.length, events };
    cache = { at: now, data };
    return { statusCode: 200, headers: HEADERS, body: JSON.stringify(data) };
  } catch (err) {
    // Degradación elegante: si hay cache previo, devuélvelo aunque esté viejo
    if (cache.data) {
      return { statusCode: 200, headers: HEADERS, body: JSON.stringify(cache.data) };
    }
    return { statusCode: 502, headers: HEADERS, body: JSON.stringify({ error: String(err && err.message || err), events: [] }) };
  }
};
