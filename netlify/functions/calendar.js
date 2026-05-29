// Netlify Function: calendario económico (proxy + normalizador).
// - Resuelve CORS (las fuentes no lo envían) y cachea ~10 min.
// - Si existe FMP_API_KEY (variable de entorno en Netlify) usa Financial Modeling Prep
//   (horizonte de varias semanas). Si no, cae a ForexFactory (solo semana actual).
// - La API key vive SOLO en el servidor; nunca se expone al navegador/app.
// Se consume desde la web (mismo origen) y desde la app Android (CORS *).

const FF_SOURCE = 'https://nfs.faireconomy.media/ff_calendar_thisweek.json';
const MAJORS = new Set(['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'NZD', 'CNY']);
const COUNTRY_TO_CURRENCY = {
  US: 'USD', EU: 'EUR', EA: 'EUR', GB: 'GBP', UK: 'GBP', JP: 'JPY',
  CH: 'CHF', CA: 'CAD', AU: 'AUD', NZ: 'NZD', CN: 'CNY'
};

// Cache en memoria por instancia "caliente"
let cache = { at: 0, data: null };
const TTL_MS = 10 * 60 * 1000;

const HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'public, max-age=600'
};

const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; TradingSuite/1.0)' };

function ymd(d) { return d.toISOString().slice(0, 10); }

// --- Fuente 1: Financial Modeling Prep (requiere key, horizonte ~5 semanas) ---
async function fetchFMP(key) {
  const now = new Date();
  const from = ymd(new Date(now.getTime() - 2 * 86400000));   // 2 días atrás (para 'actual' reciente)
  const to = ymd(new Date(now.getTime() + 35 * 86400000));    // ~5 semanas adelante
  const url = `https://financialmodelingprep.com/api/v3/economic_calendar?from=${from}&to=${to}&apikey=${encodeURIComponent(key)}`;
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error('fmp ' + res.status);
  const raw = await res.json();
  if (!Array.isArray(raw)) throw new Error('fmp shape');
  return raw
    .filter(e => e && e.event && e.date)
    .filter(e => e.impact === 'High' || e.impact === 'Medium')
    .map(e => {
      const cur = (e.currency && String(e.currency).toUpperCase())
        || COUNTRY_TO_CURRENCY[String(e.country || '').toUpperCase()]
        || String(e.country || '').toUpperCase();
      // FMP entrega la fecha sin offset; la tratamos como UTC.
      let date = String(e.date).replace(' ', 'T');
      if (!/(Z|[+\-]\d\d:?\d\d)$/.test(date)) date += 'Z';
      return {
        title: String(e.event),
        currency: cur,
        date,
        impact: e.impact,
        forecast: (e.estimate != null ? String(e.estimate) : ''),
        previous: (e.previous != null ? String(e.previous) : ''),
        actual: (e.actual != null ? String(e.actual) : '')
      };
    })
    .filter(e => MAJORS.has(e.currency));
}

// --- Fuente 2 (fallback): ForexFactory / faireconomy (sin key, solo semana actual) ---
async function fetchForexFactory() {
  const res = await fetch(FF_SOURCE, { headers: UA });
  if (!res.ok) throw new Error('ff ' + res.status);
  const raw = await res.json();
  if (!Array.isArray(raw)) throw new Error('ff shape');
  return raw
    .filter(e => e && e.title && e.date)
    .filter(e => e.impact === 'High' || e.impact === 'Medium')
    .filter(e => MAJORS.has(String(e.country || '').toUpperCase()))
    .map(e => ({
      title: String(e.title),
      currency: String(e.country || '').toUpperCase(),
      date: e.date,
      impact: e.impact,
      forecast: e.forecast || '',
      previous: e.previous || '',
      actual: e.actual || ''
    }));
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

    const key = process.env.FMP_API_KEY;
    let events = null;
    let source = 'forexfactory';

    if (key) {
      try { events = await fetchFMP(key); source = 'fmp'; }
      catch (e) { events = null; /* cae al fallback */ }
    }
    if (!events || !events.length) {
      events = await fetchForexFactory();
      source = 'forexfactory';
    }

    // Dedupe + orden cronológico
    const seen = new Set();
    events = events
      .filter(e => {
        const k = e.date + '|' + e.currency + '|' + e.title;
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const data = { updated: new Date(now).toISOString(), source, count: events.length, events };
    cache = { at: now, data };
    return { statusCode: 200, headers: HEADERS, body: JSON.stringify(data) };
  } catch (err) {
    if (cache.data) {
      return { statusCode: 200, headers: HEADERS, body: JSON.stringify(cache.data) };
    }
    return { statusCode: 502, headers: HEADERS, body: JSON.stringify({ error: String(err && err.message || err), events: [] }) };
  }
};
