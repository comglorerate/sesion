// Centralized application JS (extracted from inline script)
const APP_VERSION = '1.0.0';

// --- Data ---
const forexMarkets = [
    { id: 'sydney', name: 'Sydney', tz: 'Australia/Sydney', open: 7, close: 16, icon: 'fa-earth-oceania' },
    { id: 'tokyo', name: 'Tokyo', tz: 'Asia/Tokyo', open: 9, close: 18, icon: 'fa-yen-sign' },
    { id: 'london', name: 'London', tz: 'Europe/London', open: 8, close: 17, icon: 'fa-sterling-sign' },
    { id: 'ny', name: 'New York', tz: 'America/New_York', open: 8, close: 17, icon: 'fa-dollar-sign' }
];

const stockMarkets = [
    { 
        id: 'nasdaq', name: 'NASDAQ', tz: 'America/New_York', 
        open: 9, openMin: 30, close: 16, closeMin: 0, 
        preOpen: 4, afterClose: 20, icon: 'fa-laptop-code'
    }
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

    const openMins = mkt.open * 60 + (mkt.openMin || 0);
    const closeMins = mkt.close * 60 + (mkt.closeMin || 0);

    let status = 'closed';
    let label = 'Cerrado';
    let colorClass = 'status-closed';
    let dotClass = 'dot-closed';
    let progress = 0;
    let barClass = 'fill-ended'; // default grey
    let highlightClass = '';

    // Weekend Check (Simplified)
    if (nowZone.dayOfWeek === 6 || (nowZone.dayOfWeek === 0 && currentMins < openMins && mkt.id !== 'sydney')) {
        progress = 0;
    } else {
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
