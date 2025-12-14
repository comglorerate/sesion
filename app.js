// Centralized application JS (extracted from inline script)

// --- Internationalization (ES / EN) ---
const translations = {
    es: {
        title: 'Horarios de Mercados Financieros',
        nav: { calculator: 'Calculadora', journal: 'Journal' },
        detecting: 'Detectando... ',
        stocks: { title: 'Bolsa de Valores de EE. UU', subtitle: 'Mercado de Acciones' },
        forex: { title: 'Sesión de Forex', subtitle: 'Mercado de Divisas' },
        status: {
            closed: 'Cerrado',
            closed_holiday: 'Cerrado (Feriado: {0})',
            open: 'Mercado abierto',
            upcoming_open: 'Próxima apertura',
            liquidity_limited: 'Liquidez limitada (Feriado)',
            open_high_spreads: 'Mercado abierto (Spreads altos)'
        },
        elapsed: 'Transcurrido',
        open_label: 'Apertura:',
        close_label: 'Cierre:',
        market_time: 'Hora del mercado:',
        holiday_prefix: 'Feriado:',
        nasdaq: { high_volatility: 'Alta volatilidad', calm_zone: 'Zona de calma' }
    },
    en: {
        title: 'Market Session Times',
        nav: { calculator: 'Calculator', journal: 'Journal' },
        detecting: 'Detecting... ',
        stocks: { title: 'US Stock Exchanges', subtitle: 'Stock Market' },
        forex: { title: 'Forex Session', subtitle: 'Currency Market' },
        status: {
            closed: 'Closed',
            closed_holiday: 'Closed (Holiday: {0})',
            open: 'Market open',
            upcoming_open: 'Upcoming open',
            liquidity_limited: 'Limited liquidity (Holiday)',
            open_high_spreads: 'Market open (High spreads)'
        },
        elapsed: 'Elapsed',
        open_label: 'Open:',
        close_label: 'Close:',
        market_time: 'Market time:',
        holiday_prefix: 'Holiday:',
        nasdaq: { high_volatility: 'High volatility', calm_zone: 'Calm zone' }
    }
};

const SUPPORTED_LANGS = ['es', 'en'];
let currentLang = 'es';

function getNested(obj, path) {
    return path.split('.').reduce((o, k) => (o && o[k] !== undefined) ? o[k] : undefined, obj);
}

function t(key, params) {
    const val = getNested(translations[currentLang], key) || getNested(translations['es'], key) || key;
    if (params && Array.isArray(params)) {
        let s = String(val);
        params.forEach((p, i) => { s = s.replace(new RegExp('\\{' + i + '\\}', 'g'), p); });
        return s;
    }
    return val;
}

function detectLanguage() {
    const stored = localStorage.getItem('lang');
    if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
    const nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'es';
    const code = nav.slice(0,2).toLowerCase();
    return SUPPORTED_LANGS.includes(code) ? code : 'es';
}

function setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) lang = 'es';
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    const sel = document.getElementById('lang-select');
    if (sel) sel.value = lang;
    translatePage();
}

function translatePage(root=document) {
    const nodes = root.querySelectorAll('[data-i18n]');
    nodes.forEach(n => {
        const key = n.getAttribute('data-i18n');
        const txt = t(key);
        // Keep HTML where explicit HTML used elsewhere; default to textContent
        n.textContent = txt;
    });
}


// --- Data ---
// `openDays` usa el formato de `Date.getDay()` (0=Dom,1=Lun,..6=Sáb)
// Stocks: normalmente Lun-Vie -> [1,2,3,4,5]
// Forex: suele operar Sun-Fri (en práctica domingo por la tarde en UTC) -> [0,1,2,3,4,5]
const forexMarkets = [
    { id: 'sydney', name: 'Sydney', tz: 'Australia/Sydney', open: 7, close: 16, icon: 'fa-earth-oceania', openDays: [0,1,2,3,4,5] },
    { id: 'tokyo', name: 'Tokyo', tz: 'Asia/Tokyo', open: 9, close: 18, icon: 'fa-yen-sign', openDays: [0,1,2,3,4,5] },
    { id: 'london', name: 'London', tz: 'Europe/London', open: 8, close: 17, icon: 'fa-sterling-sign', openDays: [0,1,2,3,4,5] },
    { id: 'ny', name: 'New York', tz: 'America/New_York', open: 8, close: 17, icon: 'fa-dollar-sign', openDays: [1,2,3,4,5] }
];

const stockMarkets = [
    { 
        id: 'nasdaq', name: 'NASDAQ', tz: 'America/New_York', 
        open: 9, openMin: 30, close: 16, closeMin: 0, 
        icon: 'fa-laptop-code', openDays: [1,2,3,4,5]
    }
];

// --- Holidays (recurren cada año) ---
// month: 1-12, day: 1-31
// propiedades posibles:
//  - stocksClose: boolean
//  - forexClose: boolean
//  - forexLimited: boolean (liquidez limitada)
//  - forexHighSpreads: boolean
//  - closeStockIds: array de ids de mercados de acciones afectados
//  - name/description
const holidays = [
    { month: 12, day: 24, name: 'Nochebuena', stocksClose: true, forexClose: true, description: 'Cierre oficial para bolsas y operaciones FX en la mayoría de los centros financieros' },
    { month: 12, day: 31, name: 'Año Nuevo (Fin de año)', stocksClose: true, forexClose: true, description: 'Año nuevo - feriado global' },
    { month: 7, day: 4, name: 'Independencia EE. UU.', closeStockIds: ['nasdaq'], forexLimited: true, description: 'Wall Street cierra; FX mantiene liquidez limitada' },
    { month: 11, day: 25, name: 'Acción de Gracias', stocksClose: true, forexHighSpreads: true, description: 'Bolsa cerrada. Algunas sesiones FX operan con spreads más altos' }
];

// --- Helpers ---
function formatLocalTime(dateObj) {
    return new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(dateObj);
}

// Returns { h, m, dayOfWeek } in the Target Timezone
function getTimeInZone(timeZone) {
    const now = new Date();
    const str = now.toLocaleString('en-US', { timeZone: timeZone, hour12: false });
    const [date, time] = str.split(', ');
    const [h, m] = time.split(':').map(Number);
    const targetDate = new Date(str);
    return { h, m, dayOfWeek: targetDate.getDay() };
}

// Returns local date components in target timezone: { year, month, day }
function getDateInZone(timeZone) {
    const now = new Date();
    const str = now.toLocaleString('en-US', { timeZone: timeZone, hour12: false });
    const d = new Date(str);
    return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
}

function isStockMarket(id) {
    return stockMarkets.some(m => m.id === id);
}

function isForexMarket(id) {
    return forexMarkets.some(m => m.id === id);
}

// Check if there is a holiday affecting this market in its local date
function getHolidayForMarket(mkt) {
    const local = getDateInZone(mkt.tz);
    for (const h of holidays) {
        if (h.month === local.month && h.day === local.day) {
            // Determine if applies to this market
            // Stocks
            if (h.stocksClose && isStockMarket(mkt.id)) return h;
            if (Array.isArray(h.closeStockIds) && isStockMarket(mkt.id) && h.closeStockIds.includes(mkt.id)) return h;
            // Forex
            if ((h.forexClose || h.forexLimited || h.forexHighSpreads) && isForexMarket(mkt.id)) return h;
            // If holiday is generic (without specific flags) return it
            if (!h.stocksClose && !h.forexClose && !h.forexLimited && !h.forexHighSpreads && !Array.isArray(h.closeStockIds)) return h;
        }
    }
    return null;
}

// Helper to display market time converted to User Local Time
function getFormattedUserTimeFromMarketTime(h, m, tz) {
    const nowLocal = new Date();
    const nowMarketStr = nowLocal.toLocaleString('en-US', { timeZone: tz });
    const nowMarket = new Date(nowMarketStr);
    const diffMs = nowMarket - nowLocal;

    const targetMarketDate = new Date(nowMarket);
    targetMarketDate.setHours(h, m, 0);

    // Subtract offset to get local time equivalent
    const targetLocalDate = new Date(targetMarketDate.getTime() - diffMs);
    return formatLocalTime(targetLocalDate);
}

// --- Core Logic ---
function updateClock() {
    const now = new Date();
    const clockEl = document.getElementById('user-clock');
    const tzEl = document.getElementById('user-timezone');
    if (clockEl) clockEl.innerHTML = `<i class="fa-regular fa-clock"></i> ${now.toLocaleTimeString()}`;
    if (tzEl) tzEl.innerHTML = `<i class="fa-solid fa-globe"></i> ${Intl.DateTimeFormat().resolvedOptions().timeZone.replace('_', ' ')}`;
}

function getMarketData(mkt) {
    const nowZone = getTimeInZone(mkt.tz);
    const currentMins = nowZone.h * 60 + nowZone.m;

    // Comprobación explícita de días de apertura usando `openDays`.
    // Por defecto asumimos Lun-Vie ([1,2,3,4,5]) para mercados que no declaren openDays.
    const openDays = Array.isArray(mkt.openDays) ? mkt.openDays : [1,2,3,4,5];
    if (!openDays.includes(nowZone.dayOfWeek)) {
        return { status: 'closed', labelId: 'status.closed', labelParams: [], colorClass: 'status-closed', dotClass: 'dot-closed', progress: 0, barClass: 'fill-ended', highlightClass: '' };
    }

    // Check holidays for this market (in market local date)
    const holiday = getHolidayForMarket(mkt);
    // If holiday causes full closure for this market, return closed immediately
    if (holiday) {
        if (holiday.stocksClose && isStockMarket(mkt.id)) {
            return { status: 'closed', labelId: 'status.closed_holiday', labelParams: [holiday.name], colorClass: 'status-closed', dotClass: 'dot-closed', progress: 0, barClass: 'fill-ended', highlightClass: '' };
        }
        if (holiday.forexClose && isForexMarket(mkt.id)) {
            return { status: 'closed', labelId: 'status.closed_holiday', labelParams: [holiday.name], colorClass: 'status-closed', dotClass: 'dot-closed', progress: 0, barClass: 'fill-ended', highlightClass: '' };
        }
    }

    const openMins = mkt.open * 60 + (mkt.openMin || 0);
    const closeMins = mkt.close * 60 + (mkt.closeMin || 0);

    let status = 'closed';
    let labelId = 'status.closed';
    let labelParams = [];
    let colorClass = 'status-closed';
    let dotClass = 'dot-closed';
    let progress = 0;
    let barClass = 'fill-ended'; // default grey
    let highlightClass = '';

    // Determinar estado principal (sin pre-mercado ni sesión extendida)

    if (currentMins >= openMins && currentMins < closeMins) {
        status = 'open';
        labelId = 'status.open';
        labelParams = [];
        colorClass = 'status-open';
        dotClass = 'dot-open';

        const totalDuration = closeMins - openMins;
        const elapsed = currentMins - openMins;
        progress = (elapsed / totalDuration) * 100;
        barClass = 'fill-active';

    } else if (currentMins < openMins) {
        // Antes de la apertura: mostrar 'upcoming_open' si falta menos de 60 min, sino 'closed'
        status = (currentMins >= openMins - 60) ? 'soon' : 'closed';
        labelId = (status === 'soon') ? 'status.upcoming_open' : 'status.closed';
        labelParams = [];
        colorClass = status === 'soon' ? 'status-soon' : 'status-closed';
        dotClass = status === 'soon' ? 'dot-soon' : 'dot-closed';
        progress = 0;
    } else {
        // Después del cierre: siempre marcar como cerrado (sin sesión extendida)
        status = 'closed';
        labelId = 'status.closed';
        labelParams = [];
        colorClass = 'status-closed';
        dotClass = 'dot-closed';
        progress = 100;
        barClass = 'fill-ended';
    }

    // Adjust labels/flags if today is a holiday with limited FX liquidity or high spreads
    if (holiday && isForexMarket(mkt.id)) {
        if (holiday.forexLimited) {
            labelId = 'status.liquidity_limited';
            labelParams = [];
            colorClass = 'status-soon';
            dotClass = 'dot-soon';
            if (status !== 'open') progress = 0;
        } else if (holiday.forexHighSpreads) {
            if (status === 'open') {
                labelId = 'status.open_high_spreads';
                labelParams = [];
                colorClass = 'status-soon';
                dotClass = 'dot-soon';
            } else {
                labelId = 'status.closed_holiday';
                labelParams = [holiday.name];
                colorClass = 'status-closed';
                dotClass = 'dot-closed';
                progress = 0;
            }
        }
    }

    if (mkt.id === 'nasdaq') {
        const morningStart = 9 * 60 + 30;
        const morningEnd = 10 * 60 + 30;
        const middayStart = 11 * 60 + 30;
        const middayEnd = 13 * 60 + 30;
        const afternoonStart = 15 * 60;
        const afternoonEnd = 16 * 60;

        if (currentMins >= morningStart && currentMins < morningEnd) {
            highlightClass = 'highlight-morning';
        } else if (currentMins >= middayStart && currentMins < middayEnd) {
            highlightClass = 'highlight-midday';
        } else if (currentMins >= afternoonStart && currentMins < afternoonEnd) {
            highlightClass = 'highlight-afternoon';
        } else {
            highlightClass = '';
        }
    }

    return {
        status,
        labelId,
        labelParams,
        colorClass,
        dotClass,
        progress: Number(progress.toFixed(1)),
        barClass,
        highlightClass,
        nowZone,
        holiday
    };
}

function createCard(mkt, data) {
    // data is precomputed in renderMarkets to avoid duplicate work
    const statusLabel = t(data.labelId, data.labelParams);
    const localOpen = getFormattedUserTimeFromMarketTime(mkt.open, mkt.openMin || 0, mkt.tz);
    const localClose = getFormattedUserTimeFromMarketTime(mkt.close, mkt.closeMin || 0, mkt.tz);
    const mktTimeStr = data.nowZone ? `${data.nowZone.h.toString().padStart(2,'0')}:${data.nowZone.m.toString().padStart(2,'0')}` : '';
    const holiday = data.holiday;
    const holidayHTML = holiday ? `<div class="holiday-badge">${t('holiday_prefix')} ${holiday.name}</div>` : '';

    return `
        <div class="card">
            <div class="card-header">
                <span class="market-name">${mkt.name}</span>
                <i class="fa-solid ${mkt.icon} market-icon"></i>
            </div>

            <div class="status-badge ${data.colorClass}">
                <span class="indicator-dot ${data.dotClass}"></span> ${statusLabel}
            </div>

            <!-- Progress Bar Section -->
            <div class="session-progress">
                <div class="progress-labels">
                    <span>${t('elapsed')}</span>
                    <span>${data.progress}%</span>
                </div>
                <div class="progress-track">
                    <div class="progress-fill ${data.barClass} ${data.highlightClass || ''}" data-progress="${data.progress}"></div>
                </div>
            </div>

            <div class="time-row">
                <span class="time-label">${t('open_label')}</span>
                <span class="time-value">${localOpen}</span>
            </div>
            <div class="time-row">
                <span class="time-label">${t('close_label')}</span>
                <span class="time-value">${localClose}</span>
            </div>
            <div class="sub-time">${t('market_time')} ${mktTimeStr}</div>

            ${mkt.id === 'nasdaq' ? `
            <div class="nasdaq-info">
                <div class="info-block">
                    <div class="info-title">${t('nasdaq.high_volatility')}</div>
                    <div class="info-time">9:30 – 10:30</div>
                </div>
                <div class="info-block">
                    <div class="info-title">${t('nasdaq.calm_zone')}</div>
                    <div class="info-time">11:30 – 13:30</div>
                </div>
                <div class="info-block">
                    <div class="info-title">${t('nasdaq.high_volatility')}</div>
                    <div class="info-time">15:00 – 16:00</div>
                </div>
            </div>
            ` : ''}
            ${holidayHTML}
        </div>
    `;
}

function applyProgressWidths(root) {
    const fills = (root || document).querySelectorAll('.progress-fill');
    fills.forEach(el => {
        const p = Number(el.getAttribute('data-progress')) || 0;
        el.style.width = `${p}%`;
    });
}

function renderMarkets() {
    const forexContainer = document.getElementById('forex-grid');
    const stocksContainer = document.getElementById('stocks-grid');

    const forexData = forexMarkets.map(mkt => ({ mkt, data: getMarketData(mkt) }));
    const stocksData = stockMarkets.map(mkt => ({ mkt, data: getMarketData(mkt) }));

    const forexSorted = forexData.sort((a, b) => {
        if (a.data.status === 'open' && b.data.status !== 'open') return -1;
        if (b.data.status === 'open' && a.data.status !== 'open') return 1;
        return 0;
    });

    const forexHTML = forexSorted.map(entry => createCard(entry.mkt, entry.data)).join('');
    if (forexContainer) forexContainer.innerHTML = forexHTML;

    const stocksHTML = stocksData.map(entry => createCard(entry.mkt, entry.data)).join('');
    if (stocksContainer) stocksContainer.innerHTML = stocksHTML;

    // Apply widths after DOM insertion (avoid inline style in HTML)
    applyProgressWidths(forexContainer);
    applyProgressWidths(stocksContainer);
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language and UI translations
    const initial = detectLanguage();
    setLanguage(initial);

    // No language selector in UI: language is detected automatically and stored in localStorage

    // Initial render
    updateClock();
    renderMarkets();

    setInterval(() => {
        updateClock();
        const s = new Date().getSeconds();
        if (s % 30 === 0 || s === 0) renderMarkets();
    }, 1000);
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').catch(err => {
            console.warn('Service worker registration failed:', err);
        });
    });
}
