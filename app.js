// Centralized application JS (extracted from inline script)
const APP_VERSION = '1.0.0';

// --- Data ---
// `openDays` usa el formato de `Date.getDay()` (0=Dom,1=Lun,..6=Sáb)
// Stocks: normalmente Lun-Vie -> [1,2,3,4,5]
// Forex: suele operar Sun-Fri (en práctica domingo por la tarde en UTC) -> [0,1,2,3,4,5]
const forexMarkets = [
    { id: 'sydney', name: 'Sydney', tz: 'Australia/Sydney', open: 7, close: 16, icon: 'fa-earth-oceania', openDays: [0,1,2,3,4,5] },
    { id: 'tokyo', name: 'Tokyo', tz: 'Asia/Tokyo', open: 9, close: 18, icon: 'fa-yen-sign', openDays: [0,1,2,3,4,5] },
    { id: 'london', name: 'London', tz: 'Europe/London', open: 8, close: 17, icon: 'fa-sterling-sign', openDays: [0,1,2,3,4,5] },
    { id: 'ny', name: 'New York', tz: 'America/New_York', open: 8, close: 17, icon: 'fa-dollar-sign', openDays: [0,1,2,3,4,5] }
];

const stockMarkets = [
    { 
        id: 'nasdaq', name: 'NASDAQ', tz: 'America/New_York', 
        open: 9, openMin: 30, close: 16, closeMin: 0, 
        preOpen: 4, afterClose: 20, icon: 'fa-laptop-code', openDays: [1,2,3,4,5]
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
        return { status: 'closed', label: 'Cerrado', colorClass: 'status-closed', dotClass: 'dot-closed', progress: 0, barClass: 'fill-ended', highlightClass: '' };
    }

    // Check holidays for this market (in market local date)
    const holiday = getHolidayForMarket(mkt);
    // If holiday causes full closure for this market, return closed immediately
    if (holiday) {
        if (holiday.stocksClose && isStockMarket(mkt.id)) {
            return { status: 'closed', label: `Cerrado (Feriado: ${holiday.name})`, colorClass: 'status-closed', dotClass: 'dot-closed', progress: 0, barClass: 'fill-ended', highlightClass: '' };
        }
        if (holiday.forexClose && isForexMarket(mkt.id)) {
            return { status: 'closed', label: `Cerrado (Feriado: ${holiday.name})`, colorClass: 'status-closed', dotClass: 'dot-closed', progress: 0, barClass: 'fill-ended', highlightClass: '' };
        }
    }

    const openMins = mkt.open * 60 + (mkt.openMin || 0);
    const closeMins = mkt.close * 60 + (mkt.closeMin || 0);

    let status = 'closed';
    let label = 'Cerrado';
    let colorClass = 'status-closed';
    let dotClass = 'dot-closed';
    let progress = 0;
    let barClass = 'fill-ended'; // default grey
    let highlightClass = '';

    // Determinar pre/post-session y estado principal
    let isPre = false;
    let isAfter = false;

    if (mkt.preOpen) {
        if (currentMins >= mkt.preOpen * 60 && currentMins < openMins) isPre = true;
    }
    if (mkt.afterClose) {
        if (currentMins >= closeMins && currentMins < mkt.afterClose * 60) isAfter = true;
    }

    if (currentMins >= openMins && currentMins < closeMins) {
        status = 'open';
        label = 'Mercado abierto';
        colorClass = 'status-open';
        dotClass = 'dot-open';

        const totalDuration = closeMins - openMins;
        const elapsed = currentMins - openMins;
        progress = (elapsed / totalDuration) * 100;
        barClass = 'fill-active';

    } else if (currentMins < openMins) {
        status = isPre ? 'soon' : (currentMins >= openMins - 60 ? 'soon' : 'closed');
        label = isPre ? 'Pre-mercado' : (status === 'soon' ? 'Próxima apertura' : 'Cerrado');
        colorClass = status === 'soon' ? 'status-soon' : 'status-closed';
        dotClass = status === 'soon' ? 'dot-soon' : 'dot-closed';
        progress = 0;

    } else {
        status = isAfter ? 'soon' : 'closed';
        label = isAfter ? 'Horario extendido' : 'Cerrado';
        colorClass = isAfter ? 'status-soon' : 'status-closed';
        dotClass = isAfter ? 'dot-soon' : 'dot-closed';
        progress = 100;
        barClass = 'fill-ended';
    }

    // Adjust labels/flags if today is a holiday with limited FX liquidity or high spreads
    if (holiday && isForexMarket(mkt.id)) {
        if (holiday.forexLimited) {
            // mark as liquidity-limited (use 'soon' styling to warn)
            label = 'Liquidez limitada (Feriado)';
            colorClass = 'status-soon';
            dotClass = 'dot-soon';
            if (status !== 'open') progress = 0;
        } else if (holiday.forexHighSpreads) {
            if (status === 'open') {
                label = 'Mercado abierto (Spreads altos)';
                colorClass = 'status-soon';
                dotClass = 'dot-soon';
            } else {
                label = `Cerrado (Feriado: ${holiday.name})`;
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

    return { status, label, colorClass, dotClass, progress: Number(progress.toFixed(1)), barClass, highlightClass };
}

function createCard(mkt) {
    const data = getMarketData(mkt);
    const localOpen = getFormattedUserTimeFromMarketTime(mkt.open, mkt.openMin || 0, mkt.tz);
    const localClose = getFormattedUserTimeFromMarketTime(mkt.close, mkt.closeMin || 0, mkt.tz);
    const curTime = getTimeInZone(mkt.tz);
    const mktTimeStr = `${curTime.h.toString().padStart(2,'0')}:${curTime.m.toString().padStart(2,'0')}`;
    const holiday = getHolidayForMarket(mkt);
    const holidayHTML = holiday ? `<div class="holiday-badge">Feriado: ${holiday.name}</div>` : '';

    return `
        <div class="card">
            <div class="card-header">
                <span class="market-name">${mkt.name}</span>
                <i class="fa-solid ${mkt.icon} market-icon"></i>
            </div>

            <div class="status-badge ${data.colorClass}">
                <span class="indicator-dot ${data.dotClass}"></span> ${data.label}
            </div>

            <!-- Progress Bar Section -->
            <div class="session-progress">
                <div class="progress-labels">
                    <span>Transcurrido</span>
                    <span>${data.progress}%</span>
                </div>
                <div class="progress-track">
                    <div class="progress-fill ${data.barClass} ${data.highlightClass || ''}" data-progress="${data.progress}"></div>
                </div>
            </div>

            <div class="time-row">
                <span class="time-label">Apertura:</span>
                <span class="time-value">${localOpen}</span>
            </div>
            <div class="time-row">
                <span class="time-label">Cierre:</span>
                <span class="time-value">${localClose}</span>
            </div>
            <div class="sub-time">Hora del mercado: ${mktTimeStr}</div>

            ${mkt.id === 'nasdaq' ? `
            <div class="nasdaq-info">
                <div class="info-block">
                    <div class="info-title">Alta volatilidad</div>
                    <div class="info-time">9:30 – 10:30</div>
                </div>
                <div class="info-block">
                    <div class="info-title">Zona de calma</div>
                    <div class="info-time">11:30 – 13:30</div>
                </div>
                <div class="info-block">
                    <div class="info-title">Alta volatilidad</div>
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

    const forexSorted = [...forexMarkets].sort((a, b) => {
        const da = getMarketData(a);
        const db = getMarketData(b);
        if (da.status === 'open' && db.status !== 'open') return -1;
        if (db.status === 'open' && da.status !== 'open') return 1;
        return 0;
    });

    let forexHTML = '';
    forexSorted.forEach(m => forexHTML += createCard(m));
    if (forexContainer) forexContainer.innerHTML = forexHTML;

    let stocksHTML = '';
    stockMarkets.forEach(m => stocksHTML += createCard(m));
    if (stocksContainer) stocksContainer.innerHTML = stocksHTML;

    // Apply widths after DOM insertion (avoid inline style in HTML)
    applyProgressWidths(forexContainer);
    applyProgressWidths(stocksContainer);
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    renderMarkets();

    setInterval(() => {
        updateClock();
        const s = new Date().getSeconds();
        if (s % 30 === 0 || s === 0) renderMarkets();
    }, 1000);
});
