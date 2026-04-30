// Centralized application JS

// ============================================================
// Internationalization (ES / EN)
// ============================================================
const translations = {
    es: {
        title: 'Horarios de Mercados Financieros',
        nav: { calculator: 'Calculadora', journal: 'Journal', calculator_open: 'Abrir Calculadora', journal_open: 'Abrir Journal' },
        detecting: 'Detectando...',
        stocks: { title: 'Bolsa de Valores de EE. UU', subtitle: 'Mercado de Acciones' },
        forex: { title: 'Sesión de Forex', subtitle: 'Mercado de Divisas' },
        status: {
            closed: 'Cerrado',
            closed_holiday: 'Cerrado (Feriado: {0})',
            open: 'Mercado abierto',
            upcoming_open: 'Próxima apertura',
            opens_in: 'Abre en {0} min',
            liquidity_limited: 'Liquidez limitada (Feriado)',
            open_high_spreads: 'Mercado abierto (Spreads altos)'
        },
        elapsed: 'Transcurrido',
        open_label: 'Apertura:',
        close_label: 'Cierre:',
        market_time: 'Hora del mercado:',
        early_close: 'Cierre temprano por feriado',
        holiday_prefix: 'Feriado:',
        countdown: { opens_in: 'Abre en {0}', closes_in: 'Cierra en {0}' },
        timeline: {
            title: 'Solapamiento de sesiones (Forex)',
            hint: 'Hora local · Las zonas oscuras indican mayor liquidez · Pasa el ratón para explorar',
            no_sessions: 'Sin sesiones activas'
        },
        crypto: {
            title: 'Cripto',
            subtitle: 'Mercado 24/7',
            name: 'Cripto (BTC, ETH…)',
            always_open: '24/7 abierto',
            liquidity_label: 'Liquidez ahora',
            level: { high: 'Alta', medium_high: 'Media-alta', medium: 'Media', low: 'Baja' },
            window: {
                golden: 'Golden hour (London + NY)',
                ny: 'Sesión NY',
                asia: 'Sesión Asia',
                dead: 'Hora muerta global',
                weekend: 'Fin de semana — volumen reducido'
            },
            next_golden: 'Próxima ventana alta en {0}',
            closing_golden: 'Liquidez alta cierra en {0}',
            windows_title: 'Mejores ventanas (hora NY)',
            ny_time: 'Hora NY:',
            tip: 'Tip: el cripto sigue los flujos institucionales — concentra tu trading en estas horas.'
        },
        nasdaq: { high_volatility: 'Alta volatilidad', calm_zone: 'Zona de calma' },
        tz_picker: {
            title: 'Seleccionar zona horaria',
            search_placeholder: 'Buscar ciudad o zona...',
            use_system: 'Usar zona horaria del sistema',
            no_results: 'Sin resultados',
            open: 'Cambiar zona horaria',
            close: 'Cerrar',
            groups: {
                americas: 'América',
                europe: 'Europa',
                asia: 'Asia',
                oceania: 'Oceanía',
                africa: 'África'
            }
        }
    },
    en: {
        title: 'Market Session Times',
        nav: { calculator: 'Calculator', journal: 'Journal', calculator_open: 'Open Calculator', journal_open: 'Open Journal' },
        detecting: 'Detecting...',
        stocks: { title: 'US Stock Exchanges', subtitle: 'Stock Market' },
        forex: { title: 'Forex Session', subtitle: 'Currency Market' },
        status: {
            closed: 'Closed',
            closed_holiday: 'Closed (Holiday: {0})',
            open: 'Market open',
            upcoming_open: 'Upcoming open',
            opens_in: 'Opens in {0} min',
            liquidity_limited: 'Limited liquidity (Holiday)',
            open_high_spreads: 'Market open (High spreads)'
        },
        elapsed: 'Elapsed',
        open_label: 'Open:',
        close_label: 'Close:',
        market_time: 'Market time:',
        early_close: 'Early close (holiday)',
        holiday_prefix: 'Holiday:',
        countdown: { opens_in: 'Opens in {0}', closes_in: 'Closes in {0}' },
        timeline: {
            title: 'Forex session overlaps',
            hint: 'Local time · Darker zones = more liquidity · Hover to explore',
            no_sessions: 'No active sessions'
        },
        crypto: {
            title: 'Crypto',
            subtitle: '24/7 market',
            name: 'Crypto (BTC, ETH…)',
            always_open: '24/7 open',
            liquidity_label: 'Liquidity now',
            level: { high: 'High', medium_high: 'Medium-high', medium: 'Medium', low: 'Low' },
            window: {
                golden: 'Golden hour (London + NY)',
                ny: 'NY session',
                asia: 'Asia session',
                dead: 'Global dead hours',
                weekend: 'Weekend — reduced volume'
            },
            next_golden: 'Next high window in {0}',
            closing_golden: 'High liquidity closes in {0}',
            windows_title: 'Best windows (NY time)',
            ny_time: 'NY time:',
            tip: 'Tip: crypto follows institutional flows — concentrate your trading in these hours.'
        },
        nasdaq: { high_volatility: 'High volatility', calm_zone: 'Calm zone' },
        tz_picker: {
            title: 'Select timezone',
            search_placeholder: 'Search city or zone...',
            use_system: 'Use system timezone',
            no_results: 'No results',
            open: 'Change timezone',
            close: 'Close',
            groups: {
                americas: 'Americas',
                europe: 'Europe',
                asia: 'Asia',
                oceania: 'Oceania',
                africa: 'Africa'
            }
        }
    }
};

const SUPPORTED_LANGS = ['es', 'en'];
let currentLang = 'es';

function getNested(obj, path) {
    return path.split('.').reduce((o, k) => {
        if (o && Object.prototype.hasOwnProperty.call(o, k)) return o[k];
        return undefined;
    }, obj);
}

function t(key, params) {
    const val = getNested(translations[currentLang], key) ?? getNested(translations['es'], key) ?? key;
    if (params && Array.isArray(params)) {
        let s = String(val);
        params.forEach((p, i) => { s = s.replace(new RegExp('\\{' + i + '\\}', 'g'), String(p)); });
        return s;
    }
    return val;
}

function detectLanguage() {
    const stored = localStorage.getItem('lang');
    if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
    const nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'es';
    const code = nav.slice(0, 2).toLowerCase();
    return SUPPORTED_LANGS.includes(code) ? code : 'es';
}

function setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) lang = 'es';
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    // Actualizar también el title del documento (para pestañas / share previews)
    document.title = t('title');
    translatePage();
    // Re-render para que las cards adopten el nuevo idioma
    if (typeof renderMarkets === 'function') renderMarkets({ force: true });
}

function translatePage(root = document) {
    const nodes = root.querySelectorAll('[data-i18n]');
    nodes.forEach(n => {
        const key = n.getAttribute('data-i18n');
        n.textContent = t(key);
    });
    // Atributos title/aria-label localizables
    root.querySelectorAll('[data-i18n-title]').forEach(n => {
        n.setAttribute('title', t(n.getAttribute('data-i18n-title')));
    });
    root.querySelectorAll('[data-i18n-aria-label]').forEach(n => {
        n.setAttribute('aria-label', t(n.getAttribute('data-i18n-aria-label')));
    });
    root.querySelectorAll('[data-i18n-placeholder]').forEach(n => {
        n.setAttribute('placeholder', t(n.getAttribute('data-i18n-placeholder')));
    });
}

// Escapa HTML para inserciones seguras (defensa en profundidad si datos vinieran de fuera)
function escapeHtml(str) {
    return String(str ?? '').replace(/[&<>"']/g, ch => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[ch]));
}

// ============================================================
// Datos de mercados
// ============================================================
// `openDays` usa formato Date.getDay() (0=Dom,1=Lun,...6=Sáb)
const forexMarkets = [
    { id: 'sydney', name: 'Sydney', tz: 'Australia/Sydney', open: 7, close: 16, icon: 'fa-earth-oceania', openDays: [0, 1, 2, 3, 4, 5] },
    { id: 'tokyo',  name: 'Tokyo',  tz: 'Asia/Tokyo',       open: 9, close: 18, icon: 'fa-yen-sign',     openDays: [0, 1, 2, 3, 4, 5] },
    { id: 'london', name: 'London', tz: 'Europe/London',    open: 8, close: 17, icon: 'fa-sterling-sign', openDays: [1, 2, 3, 4, 5] },
    { id: 'ny',     name: 'New York', tz: 'America/New_York', open: 8, close: 17, icon: 'fa-dollar-sign',  openDays: [1, 2, 3, 4, 5] }
];

const stockMarkets = [
    {
        id: 'nasdaq', name: 'NASDAQ', tz: 'America/New_York',
        open: 9, openMin: 30, close: 16, closeMin: 0,
        icon: 'fa-laptop-code', openDays: [1, 2, 3, 4, 5],
        // Ventanas internas (para resaltado y para la sección informativa de la card)
        // weekday=1=lunes ... weekday=4=jueves
        windows: [
            { kind: 'volatile', startH: 9,  startM: 30, endH: 10, endM: 30, labelKey: 'nasdaq.high_volatility' },
            { kind: 'calm',     startH: 11, startM: 30, endH: 13, endM: 30, labelKey: 'nasdaq.calm_zone' },
            { kind: 'volatile', startH: 15, startM: 0,  endH: 16, endM: 0,  labelKey: 'nasdaq.high_volatility' }
        ]
    }
];

// ============================================================
// Sistema de feriados — CALCULADO POR AÑO (no más fechas hardcoded)
// ============================================================
// Tipos:
//  - 'fixed':    { type: 'fixed', month, day }
//  - 'nthDow':   { type: 'nthDow', month, weekday, n }  (n = 1..5 ó -1 para "último")
//  - 'goodFriday': { type: 'goodFriday' }  (calculado desde Pascua)
//
// Para feriados de fecha fija que caen en fin de semana, NYSE los observa el
// viernes (sábado) o lunes (domingo). Esa lógica está en `observedDate`.

function nthWeekdayOfMonth(year, month, weekday, n) {
    if (n > 0) {
        const first = new Date(Date.UTC(year, month - 1, 1));
        const firstDow = first.getUTCDay();
        const offset = (weekday - firstDow + 7) % 7;
        return 1 + offset + (n - 1) * 7;
    }
    // n === -1: último weekday del mes
    const lastDay = new Date(Date.UTC(year, month, 0));
    const lastDayNum = lastDay.getUTCDate();
    const lastDow = lastDay.getUTCDay();
    const offset = (lastDow - weekday + 7) % 7;
    return lastDayNum - offset;
}

// Algoritmo de Pascua (Anonymous Gregorian / Meeus)
function easterDate(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const L = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * L) / 451);
    const month = Math.floor((h + L - 7 * m + 114) / 31);
    const day = ((h + L - 7 * m + 114) % 31) + 1;
    return { month, day };
}

function goodFridayDate(year) {
    const e = easterDate(year);
    const d = new Date(Date.UTC(year, e.month - 1, e.day));
    d.setUTCDate(d.getUTCDate() - 2);
    return { month: d.getUTCMonth() + 1, day: d.getUTCDate() };
}

// Ajusta una fecha fija a su día observado por NYSE.
// mode = 'both'         (default): Sab → Vie, Dom → Lun (Independence Day, Juneteenth, Christmas, etc.)
// mode = 'sundayOnly':              solo Dom → Lun (New Year's Day)
function observedDate(year, month, day, mode) {
    const d = new Date(Date.UTC(year, month - 1, day));
    const dow = d.getUTCDay();
    if (mode === 'sundayOnly') {
        if (dow === 0) d.setUTCDate(d.getUTCDate() + 1);
    } else {
        if (dow === 6) d.setUTCDate(d.getUTCDate() - 1);
        else if (dow === 0) d.setUTCDate(d.getUTCDate() + 1);
    }
    return { month: d.getUTCMonth() + 1, day: d.getUTCDate() };
}

// Definiciones de feriados (sin year, se calcula por año)
const HOLIDAY_RULES = [
    {
        name: { es: 'Año Nuevo', en: "New Year's Day" },
        rule: { type: 'fixed', month: 1, day: 1 },
        observe: 'sundayOnly', // Sat → no shift (sábado ya es no-trading); Dom → Lun
        flags: { stocksClose: true, forexClose: true }
    },
    {
        name: { es: 'Día de MLK', en: 'MLK Day' },
        rule: { type: 'nthDow', month: 1, weekday: 1, n: 3 },
        flags: { stocksClose: true }
    },
    {
        name: { es: 'Día de los Presidentes', en: 'Presidents Day' },
        rule: { type: 'nthDow', month: 2, weekday: 1, n: 3 },
        flags: { stocksClose: true }
    },
    {
        name: { es: 'Viernes Santo', en: 'Good Friday' },
        rule: { type: 'goodFriday' },
        flags: { stocksClose: true }
    },
    {
        name: { es: 'Memorial Day', en: 'Memorial Day' },
        rule: { type: 'nthDow', month: 5, weekday: 1, n: -1 },
        flags: { stocksClose: true }
    },
    {
        name: { es: 'Juneteenth', en: 'Juneteenth' },
        rule: { type: 'fixed', month: 6, day: 19 },
        observe: true,
        flags: { stocksClose: true }
    },
    {
        name: { es: 'Día de la Independencia EE. UU.', en: 'US Independence Day' },
        rule: { type: 'fixed', month: 7, day: 4 },
        observe: true,
        flags: { stocksClose: true, forexLimited: true }
    },
    {
        name: { es: 'Labor Day', en: 'Labor Day' },
        rule: { type: 'nthDow', month: 9, weekday: 1, n: 1 },
        flags: { stocksClose: true }
    },
    {
        name: { es: 'Acción de Gracias', en: 'Thanksgiving' },
        rule: { type: 'nthDow', month: 11, weekday: 4, n: 4 },
        flags: { stocksClose: true, forexHighSpreads: true }
    },
    {
        // Día después de Thanksgiving: cierre temprano (1 PM ET) — viernes negro
        name: { es: 'Black Friday (cierre temprano)', en: 'Black Friday (early close)' },
        rule: { type: 'dayAfterNthDow', month: 11, weekday: 4, n: 4 },
        flags: { stocksClose: false, stocksEarlyClose: { hour: 13, minute: 0 } }
    },
    {
        name: { es: 'Nochebuena', en: 'Christmas Eve' },
        rule: { type: 'fixed', month: 12, day: 24 },
        flags: { stocksClose: false, stocksEarlyClose: { hour: 13, minute: 0 }, forexLimited: true }
    },
    {
        name: { es: 'Navidad', en: 'Christmas' },
        rule: { type: 'fixed', month: 12, day: 25 },
        observe: true,
        flags: { stocksClose: true, forexClose: true }
    },
    {
        name: { es: 'Fin de año', en: "New Year's Eve" },
        rule: { type: 'fixed', month: 12, day: 31 },
        flags: { stocksClose: false, forexLimited: true }
    }
];

function resolveHolidayDate(rule, year) {
    if (rule.type === 'fixed') return { month: rule.month, day: rule.day };
    if (rule.type === 'goodFriday') return goodFridayDate(year);
    if (rule.type === 'nthDow') {
        const day = nthWeekdayOfMonth(year, rule.month, rule.weekday, rule.n);
        return { month: rule.month, day };
    }
    if (rule.type === 'dayAfterNthDow') {
        const baseDay = nthWeekdayOfMonth(year, rule.month, rule.weekday, rule.n);
        const d = new Date(Date.UTC(year, rule.month - 1, baseDay));
        d.setUTCDate(d.getUTCDate() + 1);
        return { month: d.getUTCMonth() + 1, day: d.getUTCDate() };
    }
    return null;
}

// Devuelve los feriados de un año específico, ya con fecha resuelta y observada.
const __holidayCacheByYear = new Map();
function getHolidaysForYear(year) {
    if (__holidayCacheByYear.has(year)) return __holidayCacheByYear.get(year);
    const list = [];
    for (const def of HOLIDAY_RULES) {
        const date = resolveHolidayDate(def.rule, year);
        if (!date) continue;
        let { month, day } = date;
        if (def.observe) {
            const mode = (def.observe === 'sundayOnly') ? 'sundayOnly' : 'both';
            const obs = observedDate(year, month, day, mode);
            month = obs.month; day = obs.day;
        }
        list.push({
            month, day,
            name: def.name[currentLang] || def.name.es,
            // Re-evaluamos el name dinámicamente al usarlo; cacheamos por año pero
            // para nombres traducidos forzamos lookup vivo:
            __def: def,
            ...def.flags
        });
    }
    __holidayCacheByYear.set(year, list);
    return list;
}

// Limpiar caché si cambia el idioma (porque el name traducido cambia)
function invalidateHolidayCache() { __holidayCacheByYear.clear(); }

function getHolidayForMarket(mkt) {
    const local = TzUtils.getZonedParts(Date.now(), mkt.tz);
    const list = getHolidaysForYear(local.year);
    for (const h of list) {
        if (h.month !== local.month || h.day !== local.day) continue;
        // ¿Aplica a este mercado?
        if (h.stocksClose && isStockMarket(mkt.id)) return h;
        if (h.stocksEarlyClose && isStockMarket(mkt.id)) return h;
        if ((h.forexClose || h.forexLimited || h.forexHighSpreads) && isForexMarket(mkt.id)) return h;
    }
    return null;
}

function isStockMarket(id) { return stockMarkets.some(m => m.id === id); }
function isForexMarket(id) { return forexMarkets.some(m => m.id === id); }

// ============================================================
// Helpers de tiempo
// ============================================================
function formatLocalTime(dateObj) {
    const opts = { hour: '2-digit', minute: '2-digit' };
    if (userTimezoneOverride) opts.timeZone = userTimezoneOverride;
    return new Intl.DateTimeFormat(undefined, opts).format(dateObj);
}

// Formatea una hora cruda (h, m en formato 24h) en 12h con a.m./p.m.
// Respeta la zona horaria efectiva del usuario.
function formatHourMin12h(h, m) {
    // Construir un Date concreto con esa hora en la zona del usuario para
    // formatear consistentemente con su locale.
    const tz = getEffectiveUserTimezone();
    try {
        const today = TzUtils.getZonedParts(Date.now(), tz);
        const utcInstant = TzUtils.zonedTimeToUtc({
            year: today.year, month: today.month, day: today.day,
            hour: h, minute: m, second: 0
        }, tz);
        const opts = { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: tz };
        return new Intl.DateTimeFormat(undefined, opts).format(utcInstant);
    } catch (e) {
        // Fallback manual
        const period = h >= 12 ? 'p.m.' : 'a.m.';
        const h12 = h % 12 === 0 ? 12 : h % 12;
        return `${h12}:${pad2(m)} ${period}`;
    }
}

// Pasa un now (en ms) opcional para mantener consistencia entre llamadas en el mismo render.
// Devuelve los parts crudos + alias `h`/`m`/`dayOfWeek` que usa el resto del código.
function getZonedNow(timeZone, now) {
    const p = TzUtils.getZonedParts(now ?? Date.now(), timeZone);
    return {
        ...p,
        h: p.hour,
        m: p.minute,
        dayOfWeek: p.weekdayIndex
    };
}

// Formatea hora del mercado a hora local del usuario
function getFormattedUserTimeFromMarketTime(h, m, tz, nowMs) {
    const today = TzUtils.getZonedParts(nowMs ?? Date.now(), tz);
    const utcInstant = TzUtils.zonedTimeToUtc({
        year: today.year, month: today.month, day: today.day,
        hour: h, minute: m, second: 0
    }, tz);
    return formatLocalTime(utcInstant);
}

// ============================================================
// Lógica de estado de mercado
// ============================================================
function getMarketData(mkt, nowMs) {
    const now = nowMs ?? Date.now();
    const z = getZonedNow(mkt.tz, now);
    const currentMins = z.h * 60 + z.m;

    const openDays = Array.isArray(mkt.openDays) ? mkt.openDays : [1, 2, 3, 4, 5];
    if (!openDays.includes(z.dayOfWeek)) {
        return baseClosed(mkt, z, null);
    }

    const holiday = getHolidayForMarket(mkt);
    if (holiday) {
        if (holiday.stocksClose && isStockMarket(mkt.id)) {
            return {
                ...baseClosed(mkt, z, holiday),
                labelId: 'status.closed_holiday',
                labelParams: [holiday.name]
            };
        }
        if (holiday.forexClose && isForexMarket(mkt.id)) {
            return {
                ...baseClosed(mkt, z, holiday),
                labelId: 'status.closed_holiday',
                labelParams: [holiday.name]
            };
        }
    }

    const openMins = mkt.open * 60 + (mkt.openMin || 0);
    let closeMins = mkt.close * 60 + (mkt.closeMin || 0);
    let isEarlyClose = false;

    if (holiday && holiday.stocksEarlyClose && isStockMarket(mkt.id)) {
        closeMins = holiday.stocksEarlyClose.hour * 60 + holiday.stocksEarlyClose.minute;
        isEarlyClose = true;
    }

    let status = 'closed', labelId = 'status.closed', labelParams = [];
    let colorClass = 'status-closed', dotClass = 'dot-closed';
    let progress = 0, barClass = 'fill-ended';
    let highlightClass = '', minsToOpen = null;

    if (currentMins >= openMins && currentMins < closeMins) {
        status = 'open';
        labelId = 'status.open';
        colorClass = 'status-open';
        dotClass = 'dot-open';
        const totalDuration = closeMins - openMins;
        const elapsed = currentMins - openMins;
        progress = (elapsed / totalDuration) * 100;
        barClass = 'fill-active';
    } else if (currentMins < openMins) {
        const diff = openMins - currentMins;
        if (diff <= 60) {
            status = 'soon';
            labelId = 'status.opens_in';
            labelParams = [diff];
            colorClass = 'status-soon';
            dotClass = 'dot-soon';
            minsToOpen = diff;
        } else {
            status = 'closed';
            labelId = 'status.closed';
        }
    } else {
        // Después del cierre
        progress = 100;
        barClass = 'fill-ended';
    }

    // Ajustes para feriados con liquidez limitada / spreads altos en FX
    if (holiday && isForexMarket(mkt.id)) {
        if (holiday.forexLimited) {
            labelId = 'status.liquidity_limited';
            labelParams = [];
            colorClass = 'status-limited';
            dotClass = 'dot-limited';
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

    // Resaltado de ventanas (NASDAQ u otros mercados con `windows`)
    if (Array.isArray(mkt.windows)) {
        for (const w of mkt.windows) {
            const ws = w.startH * 60 + (w.startM || 0);
            const we = w.endH * 60 + (w.endM || 0);
            if (currentMins >= ws && currentMins < we) {
                highlightClass = w.kind === 'calm' ? 'highlight-calm' : 'highlight-volatile';
                break;
            }
        }
    }

    return {
        status, labelId, labelParams,
        colorClass, dotClass,
        progress: Number(progress.toFixed(1)),
        barClass, highlightClass,
        nowZone: z,
        holiday,
        isEarlyClose,
        closeMinsEffective: closeMins,
        minsToOpen
    };
}

// ============================================================
// Countdown al próximo evento (apertura/cierre del mercado)
// ============================================================
function findNextMarketEvent(mkt, nowMs) {
    const z = getZonedNow(mkt.tz, nowMs);
    const currentMins = z.h * 60 + z.m;
    const openDays = Array.isArray(mkt.openDays) ? mkt.openDays : [1, 2, 3, 4, 5];

    // 1) HOY
    if (openDays.includes(z.dayOfWeek)) {
        const holiday = getHolidayForMarket(mkt);
        const fullClosed =
            (holiday && holiday.stocksClose && isStockMarket(mkt.id)) ||
            (holiday && holiday.forexClose && isForexMarket(mkt.id));
        if (!fullClosed) {
            const openMins = mkt.open * 60 + (mkt.openMin || 0);
            let closeMins = mkt.close * 60 + (mkt.closeMin || 0);
            if (holiday && holiday.stocksEarlyClose && isStockMarket(mkt.id)) {
                closeMins = holiday.stocksEarlyClose.hour * 60 + holiday.stocksEarlyClose.minute;
            }
            if (currentMins < openMins) return { type: 'opens', minutes: openMins - currentMins };
            if (currentMins < closeMins) return { type: 'closes', minutes: closeMins - currentMins };
        }
    }

    // 2) Próximos hasta 8 días
    const minsRemainingToday = 24 * 60 - currentMins;
    for (let offset = 1; offset <= 8; offset++) {
        const futureDate = TzUtils.addDaysYMD({ year: z.year, month: z.month, day: z.day }, offset);
        const futureDow = (z.dayOfWeek + offset) % 7;
        if (!openDays.includes(futureDow)) continue;
        const futureHolidays = getHolidaysForYear(futureDate.year);
        const futureHoliday = futureHolidays.find(h => h.month === futureDate.month && h.day === futureDate.day);
        const fullClosed =
            (futureHoliday && futureHoliday.stocksClose && isStockMarket(mkt.id)) ||
            (futureHoliday && futureHoliday.forexClose && isForexMarket(mkt.id));
        if (fullClosed) continue;
        const openMins = mkt.open * 60 + (mkt.openMin || 0);
        const total = minsRemainingToday + (offset - 1) * 1440 + openMins;
        return { type: 'opens', minutes: total };
    }
    return null;
}

function formatCountdown(minutes) {
    if (minutes < 1) return '< 1 min';
    if (minutes < 60) return `${minutes} min`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h < 24) return m === 0 ? `${h}h` : `${h}h ${m}m`;
    const d = Math.floor(h / 24);
    const remH = h % 24;
    return remH === 0 ? `${d}d` : `${d}d ${remH}h`;
}

function baseClosed(mkt, z, holiday) {
    return {
        status: 'closed',
        labelId: holiday ? 'status.closed_holiday' : 'status.closed',
        labelParams: holiday ? [holiday.name] : [],
        colorClass: 'status-closed',
        dotClass: 'dot-closed',
        progress: 0,
        barClass: 'fill-ended',
        highlightClass: '',
        nowZone: z,
        holiday,
        isEarlyClose: false,
        closeMinsEffective: mkt.close * 60 + (mkt.closeMin || 0),
        minsToOpen: null
    };
}

// ============================================================
// Renderizado: primera vez con HTML completo, luego updates quirúrgicos
// ============================================================
function buildCardHTML(mkt) {
    // Estructura estática; los nodos dinámicos tienen data-field para updates.
    // Las "ventanas" del mercado siguen usándose para resaltar la barra de progreso
    // cuando estamos dentro de una zona, pero ya no se renderizan como info-blocks
    // visibles (la información ya vive en el timeline de overlaps de Forex).

    return `
        <div class="card" data-mkt-id="${escapeHtml(mkt.id)}" role="article" aria-label="${escapeHtml(mkt.name)}">
            <div class="card-header">
                <span class="market-name">${escapeHtml(mkt.name)}</span>
                <i class="fa-solid ${escapeHtml(mkt.icon)} market-icon" aria-hidden="true"></i>
            </div>

            <div class="status-badge" data-field="status-badge" role="status" aria-live="polite">
                <span class="indicator-dot" data-field="dot"></span>
                <span data-field="status-text"></span>
            </div>

            <div class="countdown-chip hidden" data-field="countdown" aria-live="polite">
                <i class="fa-regular fa-hourglass-half" aria-hidden="true"></i>
                <span data-field="countdown-text"></span>
            </div>

            <div class="session-progress">
                <div class="progress-labels">
                    <span data-i18n="elapsed">${escapeHtml(t('elapsed'))}</span>
                    <span data-field="progress-pct">0%</span>
                </div>
                <div class="progress-track">
                    <div class="progress-fill" data-field="progress-fill"></div>
                </div>
            </div>

            <div class="time-row">
                <span class="time-label" data-i18n="open_label">${escapeHtml(t('open_label'))}</span>
                <span class="time-value" data-field="open-time">--:--</span>
            </div>
            <div class="time-row">
                <span class="time-label" data-field="close-label" data-i18n="close_label">${escapeHtml(t('close_label'))}</span>
                <span class="time-value" data-field="close-time">--:--</span>
            </div>
            <div class="sub-time"><span data-i18n="market_time">${escapeHtml(t('market_time'))}</span> <span data-field="mkt-time">--:--</span></div>

            <div class="early-close-note hidden" data-field="early-close-note">
                <i class="fa-solid fa-clock"></i> <span data-i18n="early_close">${escapeHtml(t('early_close'))}</span>
            </div>
            <div class="holiday-badge hidden" data-field="holiday-badge"></div>
        </div>
    `;
}

function pad2(n) { return String(n).padStart(2, '0'); }

function updateCard(card, mkt, data) {
    if (!card) return;
    const statusLabel = t(data.labelId, data.labelParams);

    // Status badge: clases + texto
    const badge = card.querySelector('[data-field="status-badge"]');
    if (badge) {
        badge.classList.remove('status-open', 'status-closed', 'status-soon', 'status-limited');
        badge.classList.add(data.colorClass);
        badge.setAttribute('aria-label', `${mkt.name}: ${statusLabel}`);
    }
    setText(card, 'status-text', statusLabel);

    // Dot
    const dot = card.querySelector('[data-field="dot"]');
    if (dot) {
        dot.classList.remove('dot-open', 'dot-closed', 'dot-soon', 'dot-limited');
        dot.classList.add(data.dotClass);
    }

    // Progreso
    setText(card, 'progress-pct', `${data.progress}%`);
    const fill = card.querySelector('[data-field="progress-fill"]');
    if (fill) {
        fill.classList.remove('fill-active', 'fill-ended', 'highlight-calm', 'highlight-volatile');
        fill.classList.add(data.barClass);
        if (data.highlightClass) fill.classList.add(data.highlightClass);
        fill.style.width = `${data.progress}%`;
    }

    // Apertura / cierre (re-formatea por si DST cambió, baratísimo)
    const localOpen = getFormattedUserTimeFromMarketTime(mkt.open, mkt.openMin || 0, mkt.tz);
    // Cierre efectivo: si hay early close por feriado, mostrar el horario reducido
    const closeH = Math.floor(data.closeMinsEffective / 60);
    const closeM = data.closeMinsEffective % 60;
    const localClose = getFormattedUserTimeFromMarketTime(closeH, closeM, mkt.tz);
    setText(card, 'open-time', localOpen);
    setText(card, 'close-time', localClose);

    // Hora del mercado actual (formato 12h con a.m./p.m. consistente con el resto)
    let mktTimeStr = '';
    if (data.nowZone) {
        try {
            const opts = { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: mkt.tz };
            mktTimeStr = new Intl.DateTimeFormat(undefined, opts).format(new Date());
        } catch (e) {
            mktTimeStr = `${pad2(data.nowZone.h)}:${pad2(data.nowZone.m)}`;
        }
    }
    setText(card, 'mkt-time', mktTimeStr);

    // Aviso de cierre temprano
    const earlyNote = card.querySelector('[data-field="early-close-note"]');
    if (earlyNote) earlyNote.classList.toggle('hidden', !data.isEarlyClose);

    // Countdown al próximo evento (apertura/cierre)
    const cdChip = card.querySelector('[data-field="countdown"]');
    const cdText = card.querySelector('[data-field="countdown-text"]');
    if (cdChip && cdText) {
        const next = findNextMarketEvent(mkt, Date.now());
        if (next) {
            const k = next.type === 'opens' ? 'countdown.opens_in' : 'countdown.closes_in';
            cdText.textContent = t(k, [formatCountdown(next.minutes)]);
            cdChip.classList.remove('hidden', 'countdown-opens', 'countdown-closes');
            cdChip.classList.add(next.type === 'opens' ? 'countdown-opens' : 'countdown-closes');
        } else {
            cdChip.classList.add('hidden');
        }
    }

    // Holiday badge
    const holidayEl = card.querySelector('[data-field="holiday-badge"]');
    if (holidayEl) {
        if (data.holiday) {
            holidayEl.classList.remove('hidden');
            holidayEl.textContent = `${t('holiday_prefix')} ${data.holiday.name}`;
        } else {
            holidayEl.classList.add('hidden');
            holidayEl.textContent = '';
        }
    }
}

function setText(root, field, text) {
    const el = root.querySelector(`[data-field="${field}"]`);
    if (el && el.textContent !== text) el.textContent = text;
}

// ============================================================
// Render principal — primera vez crea estructura, después actualiza
// ============================================================
let __initialRenderDone = false;
let __cachedSortedForexIds = null;

function renderMarkets(opts = {}) {
    const force = !!opts.force;
    const forexContainer = document.getElementById('forex-grid');
    const stocksContainer = document.getElementById('stocks-grid');
    if (!forexContainer || !stocksContainer) return;

    const now = Date.now();
    const forexData = forexMarkets.map(mkt => ({ mkt, data: getMarketData(mkt, now) }));
    const stocksData = stockMarkets.map(mkt => ({ mkt, data: getMarketData(mkt, now) }));

    // Orden FX: abiertos primero, sin mutar el array original
    const forexSorted = [...forexData].sort((a, b) => {
        if (a.data.status === 'open' && b.data.status !== 'open') return -1;
        if (b.data.status === 'open' && a.data.status !== 'open') return 1;
        return forexMarkets.findIndex(m => m.id === a.mkt.id) - forexMarkets.findIndex(m => m.id === b.mkt.id);
    });

    const newForexOrder = forexSorted.map(e => e.mkt.id).join('|');

    const needsFullRender = force ||
        !__initialRenderDone ||
        newForexOrder !== __cachedSortedForexIds ||
        forexContainer.children.length !== forexSorted.length ||
        stocksContainer.children.length !== stocksData.length;

    if (needsFullRender) {
        forexContainer.innerHTML = forexSorted.map(e => buildCardHTML(e.mkt)).join('');
        stocksContainer.innerHTML = stocksData.map(e => buildCardHTML(e.mkt)).join('');
        __cachedSortedForexIds = newForexOrder;
        __initialRenderDone = true;
    }

    // Update quirúrgico: una sola pasada por DOM, sin reemplazar nodos
    forexSorted.forEach(({ mkt, data }) => {
        const card = forexContainer.querySelector(`[data-mkt-id="${mkt.id}"]`);
        updateCard(card, mkt, data);
    });
    stocksData.forEach(({ mkt, data }) => {
        const card = stocksContainer.querySelector(`[data-mkt-id="${mkt.id}"]`);
        updateCard(card, mkt, data);
    });

    // Timeline de overlaps de Forex
    try { renderForexTimeline(now); } catch (e) { console.warn('timeline error', e); }

    // Card de Cripto (24/7 con medidor de liquidez)
    try { renderCryptoCard(now); } catch (e) { console.warn('crypto error', e); }
}

// ============================================================
// Zona horaria del usuario (con override seleccionable)
// ============================================================
let userTimezoneOverride = null; // null = usar zona del sistema

function getEffectiveUserTimezone() {
    if (userTimezoneOverride) return userTimezoneOverride;
    try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) { return 'UTC'; }
}

function loadUserTimezoneOverride() {
    try {
        const v = localStorage.getItem('user_tz');
        if (v) userTimezoneOverride = v;
    } catch (e) { /* ignore */ }
}

function saveUserTimezoneOverride(tz) {
    userTimezoneOverride = tz || null;
    try {
        if (tz) localStorage.setItem('user_tz', tz);
        else localStorage.removeItem('user_tz');
    } catch (e) { /* ignore */ }
}

// Listado curado de zonas horarias comunes (agrupado)
const COMMON_TIMEZONES = [
    { groupKey: 'tz_picker.groups.americas', items: [
        { tz: 'America/New_York',    label: 'New York' },
        { tz: 'America/Chicago',     label: 'Chicago' },
        { tz: 'America/Denver',      label: 'Denver' },
        { tz: 'America/Los_Angeles', label: 'Los Angeles' },
        { tz: 'America/Toronto',     label: 'Toronto' },
        { tz: 'America/Mexico_City', label: 'Ciudad de México' },
        { tz: 'America/Bogota',      label: 'Bogotá' },
        { tz: 'America/Lima',        label: 'Lima' },
        { tz: 'America/Caracas',     label: 'Caracas' },
        { tz: 'America/Santiago',    label: 'Santiago' },
        { tz: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires' },
        { tz: 'America/Sao_Paulo',   label: 'São Paulo' }
    ]},
    { groupKey: 'tz_picker.groups.europe', items: [
        { tz: 'Europe/London',    label: 'Londres' },
        { tz: 'Europe/Madrid',    label: 'Madrid' },
        { tz: 'Europe/Paris',     label: 'París' },
        { tz: 'Europe/Berlin',    label: 'Berlín' },
        { tz: 'Europe/Rome',      label: 'Roma' },
        { tz: 'Europe/Amsterdam', label: 'Ámsterdam' },
        { tz: 'Europe/Zurich',    label: 'Zúrich' },
        { tz: 'Europe/Athens',    label: 'Atenas' },
        { tz: 'Europe/Lisbon',    label: 'Lisboa' },
        { tz: 'Europe/Moscow',    label: 'Moscú' },
        { tz: 'Europe/Istanbul',  label: 'Estambul' }
    ]},
    { groupKey: 'tz_picker.groups.asia', items: [
        { tz: 'Asia/Dubai',     label: 'Dubái' },
        { tz: 'Asia/Karachi',   label: 'Karachi' },
        { tz: 'Asia/Kolkata',   label: 'Kolkata (Mumbai)' },
        { tz: 'Asia/Bangkok',   label: 'Bangkok' },
        { tz: 'Asia/Singapore', label: 'Singapur' },
        { tz: 'Asia/Hong_Kong', label: 'Hong Kong' },
        { tz: 'Asia/Shanghai',  label: 'Shanghai (Pekín)' },
        { tz: 'Asia/Tokyo',     label: 'Tokio' },
        { tz: 'Asia/Seoul',     label: 'Seúl' }
    ]},
    { groupKey: 'tz_picker.groups.oceania', items: [
        { tz: 'Australia/Sydney',    label: 'Sídney' },
        { tz: 'Australia/Melbourne', label: 'Melbourne' },
        { tz: 'Pacific/Auckland',    label: 'Auckland' }
    ]},
    { groupKey: 'tz_picker.groups.africa', items: [
        { tz: 'Africa/Cairo',        label: 'El Cairo' },
        { tz: 'Africa/Johannesburg', label: 'Johannesburgo' }
    ]}
];

// Calcula el offset UTC en minutos de una zona en un instante dado
function getTimezoneOffsetMinutes(tz, ms) {
    try {
        const z = TzUtils.getZonedParts(ms, tz);
        const localMs = Date.UTC(z.year, z.month - 1, z.day, z.hour, z.minute, z.second);
        return Math.round((localMs - ms) / 60000);
    } catch (e) { return 0; }
}
function formatOffset(mins) {
    const sign = mins >= 0 ? '+' : '−';
    const abs = Math.abs(mins);
    const h = Math.floor(abs / 60);
    const m = abs % 60;
    return `UTC${sign}${h}${m ? ':' + String(m).padStart(2, '0') : ''}`;
}

// ============================================================
// Picker UI
// ============================================================
function setupTimezonePicker() {
    const trigger = document.getElementById('user-timezone');
    const modal = document.getElementById('tz-modal');
    const closeBtn = document.getElementById('tz-modal-close');
    const search = document.getElementById('tz-search');
    const list = document.getElementById('tz-list');
    const resetBtn = document.getElementById('tz-reset');
    if (!trigger || !modal || !list) return;

    const open = () => {
        renderTzList(list, search ? search.value : '');
        modal.classList.remove('hidden');
        if (search) { search.value = ''; setTimeout(() => search.focus(), 60); }
    };
    const close = () => modal.classList.add('hidden');

    trigger.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) close();
    });

    if (search) {
        search.addEventListener('input', () => renderTzList(list, search.value));
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            saveUserTimezoneOverride(null);
            applyTimezoneChange();
            close();
        });
    }

    // Delegación: clic en cualquier item lo selecciona
    list.addEventListener('click', (e) => {
        const item = e.target.closest('.tz-item');
        if (!item) return;
        const tz = item.dataset.tz;
        if (!tz) return;
        saveUserTimezoneOverride(tz);
        applyTimezoneChange();
        close();
    });
}

function renderTzList(listEl, query) {
    if (!listEl) return;
    const q = (query || '').trim().toLowerCase();
    const now = Date.now();
    const currentSelected = userTimezoneOverride;
    let html = '';
    let totalShown = 0;

    COMMON_TIMEZONES.forEach(group => {
        const filtered = group.items.filter(item => {
            if (!q) return true;
            return item.label.toLowerCase().includes(q) || item.tz.toLowerCase().includes(q);
        });
        if (filtered.length === 0) return;
        html += `<div class="tz-group-title">${escapeHtml(t(group.groupKey))}</div>`;
        filtered.forEach(item => {
            const offMins = getTimezoneOffsetMinutes(item.tz, now);
            const isSel = item.tz === currentSelected;
            html += `
                <button type="button" class="tz-item ${isSel ? 'is-selected' : ''}" data-tz="${escapeHtml(item.tz)}" role="option" aria-selected="${isSel}">
                    <span class="tz-item-name">${escapeHtml(item.label)}</span>
                    <span class="tz-item-offset">${escapeHtml(formatOffset(offMins))}</span>
                </button>
            `;
            totalShown++;
        });
    });

    if (totalShown === 0) {
        html = `<div class="tz-empty">${escapeHtml(t('tz_picker.no_results'))}</div>`;
    }

    listEl.innerHTML = html;
}

// Aplica un cambio de timezone (llamada tras seleccionar/resetear)
function applyTimezoneChange() {
    // Re-render todo lo que dependa de la zona del usuario
    try { updateClock(); } catch (e) {}
    try { renderMarkets({ force: true }); } catch (e) {}
    try { renderForexTimeline(Date.now()); } catch (e) {}
    try { updateTimezoneLabel(); } catch (e) {}
}

function updateTimezoneLabel() {
    const tzText = document.getElementById('user-timezone-text');
    if (!tzText) return;
    const tz = getEffectiveUserTimezone();
    tzText.textContent = tz.replace('_', ' ');
}

// ============================================================
// Timeline de overlaps de Forex
// ============================================================
const FOREX_COLORS = {
    sydney: '#2ecc71',
    tokyo:  '#ef4444',
    london: '#38bdf8',
    ny:     '#f59e0b'
};

// Estado para que el scrub pueda consultar las lanes sin recomputar
let __timelineState = {
    lanes: [], W: 600, H: 140, padX: 56, padY: 18, innerW: 0
};

function renderForexTimeline(nowMs) {
    const container = document.getElementById('forex-timeline');
    const svgHost = document.getElementById('forex-timeline-svg');
    const legendEl = document.getElementById('forex-timeline-legend');
    if (!container || !svgHost) return;

    const W = Math.max(320, container.clientWidth || 600);
    const padX = 56, padY = 18, lanesGap = 6;
    const laneCount = forexMarkets.length;
    const laneH = 22;
    const innerW = W - padX * 2;
    const H = padY * 2 + laneCount * laneH + (laneCount - 1) * lanesGap + 22; // +22 para hour ticks abajo

    const userTz = getEffectiveUserTimezone();
    let userMidnight, userNowMs;
    try {
        const p = TzUtils.getZonedParts(nowMs, userTz);
        // Midnight de la zona efectiva del usuario, expresado como instante UTC
        userMidnight = TzUtils.zonedTimeToUtc({
            year: p.year, month: p.month, day: p.day, hour: 0, minute: 0, second: 0
        }, userTz);
        userNowMs = nowMs;
    } catch (e) {
        const userNow = new Date(nowMs);
        userMidnight = new Date(userNow.getFullYear(), userNow.getMonth(), userNow.getDate(), 0, 0, 0);
        userNowMs = nowMs;
    }

    // Para cada market, calcular sus segmentos visibles dentro de [0, 1440] minutos (hoy user-local).
    // Iteramos sobre 3 fechas (ayer, hoy, mañana) en el TZ del market para capturar sesiones que
    // crucen medianoche del usuario.
    const lanes = forexMarkets.map(mkt => {
        const segs = [];
        for (const dayOffset of [-1, 0, 1]) {
            // Tomar mediodía local del usuario para identificar de forma estable la "fecha" del mercado
            const ref = new Date(userMidnight.getTime() + dayOffset * 86400000 + 12 * 3600 * 1000);
            const mktDate = TzUtils.getZonedParts(ref.getTime(), mkt.tz);

            // Saltar días en los que el mercado no abre
            const openDays = Array.isArray(mkt.openDays) ? mkt.openDays : [1, 2, 3, 4, 5];
            const dow = mktDate.weekdayIndex;
            if (!openDays.includes(dow)) continue;

            const openInstant = TzUtils.zonedTimeToUtc({
                year: mktDate.year, month: mktDate.month, day: mktDate.day,
                hour: mkt.open, minute: mkt.openMin || 0, second: 0
            }, mkt.tz);
            const closeInstant = TzUtils.zonedTimeToUtc({
                year: mktDate.year, month: mktDate.month, day: mktDate.day,
                hour: mkt.close, minute: mkt.closeMin || 0, second: 0
            }, mkt.tz);

            const openMins = (openInstant.getTime() - userMidnight.getTime()) / 60000;
            const closeMins = (closeInstant.getTime() - userMidnight.getTime()) / 60000;

            const visStart = Math.max(0, openMins);
            const visEnd = Math.min(1440, closeMins);
            if (visEnd > visStart) segs.push([visStart, visEnd]);
        }
        return { mkt, color: FOREX_COLORS[mkt.id] || '#cbd5e1', segments: segs };
    });

    // Ahora calculamos el "nivel de overlap" en cada minuto para resaltar zonas densas.
    // Convertimos a un array densamente sampleado cada 15 min (96 segmentos) → suficiente para el ribbon.
    const overlapBand = []; // { start, end, count }
    const SAMPLE = 5; // minutos por sample
    let prev = 0; let prevCount = -1; let segStart = 0;
    for (let m = 0; m <= 1440; m += SAMPLE) {
        let count = 0;
        for (const lane of lanes) {
            for (const [s, e] of lane.segments) {
                if (m >= s && m < e) { count++; break; }
            }
        }
        if (count !== prevCount) {
            if (prevCount > 0) overlapBand.push({ start: segStart, end: m, count: prevCount });
            prevCount = count;
            segStart = m;
        }
        prev = m;
    }
    if (prevCount > 0) overlapBand.push({ start: segStart, end: 1440, count: prevCount });

    // ---- Render SVG ----
    const xAt = (mins) => padX + (mins / 1440) * innerW;
    const yAt = (laneIdx) => padY + laneIdx * (laneH + lanesGap);

    let html = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" width="100%" height="${H}" xmlns="http://www.w3.org/2000/svg">`;

    // Banda de overlap intensity (de fondo, según count)
    overlapBand.forEach(b => {
        if (b.count < 2) return;
        const alpha = b.count >= 3 ? 0.22 : 0.12;
        const x1 = xAt(b.start);
        const x2 = xAt(b.end);
        html += `<rect x="${x1}" y="${padY - 4}" width="${x2 - x1}" height="${H - padY * 2 + 8}" fill="white" fill-opacity="${alpha}" />`;
    });

    // Líneas de hora cada 3h
    for (let h = 0; h <= 24; h += 3) {
        const x = xAt(h * 60);
        html += `<line x1="${x}" y1="${padY - 4}" x2="${x}" y2="${H - padY - 14}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`;
        html += `<text x="${x}" y="${H - 6}" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="Inter, sans-serif">${pad2(h)}:00</text>`;
    }

    // Lanes
    lanes.forEach((lane, i) => {
        const y = yAt(i);
        // label
        html += `<text x="${padX - 10}" y="${y + laneH * 0.7}" text-anchor="end" fill="#cbd5e1" font-size="11" font-weight="600" font-family="Inter, sans-serif">${escapeHtml(lane.mkt.name)}</text>`;
        // background lane
        html += `<rect x="${padX}" y="${y}" width="${innerW}" height="${laneH}" fill="rgba(255,255,255,0.025)" rx="4"/>`;
        // segments
        lane.segments.forEach(([s, e]) => {
            const x1 = xAt(s);
            const x2 = xAt(e);
            html += `<rect x="${x1}" y="${y}" width="${x2 - x1}" height="${laneH}" fill="${lane.color}" fill-opacity="0.65" rx="4"/>`;
        });
    });

    // Cursor "ahora"
    const userNowMins = (userNowMs - userMidnight.getTime()) / 60000;
    if (userNowMins >= 0 && userNowMins <= 1440) {
        const x = xAt(userNowMins);
        html += `<line x1="${x}" y1="${padY - 6}" x2="${x}" y2="${H - padY - 14}" stroke="white" stroke-width="2" stroke-dasharray="3 3" />`;
        html += `<circle cx="${x}" cy="${padY - 6}" r="3.5" fill="white"/>`;
    }

    html += '</svg>';
    svgHost.innerHTML = html;

    // Guardar estado para que el handler de scrub use las mismas dimensiones/lanes
    __timelineState = { lanes, W, H, padX, padY, innerW };

    // Legend
    if (legendEl) {
        legendEl.innerHTML = lanes.map(lane =>
            `<span class="legend-item"><span class="legend-swatch" style="background:${lane.color}"></span>${escapeHtml(lane.mkt.name)}</span>`
        ).join('');
    }
}

let __timelineResizeTimer = null;
window.addEventListener('resize', () => {
    if (__timelineResizeTimer) clearTimeout(__timelineResizeTimer);
    __timelineResizeTimer = setTimeout(() => { try { renderForexTimeline(Date.now()); } catch (e) {} }, 150);
});

// ============================================================
// Scrub interactivo del timeline (hover / drag → muestra hora + sesiones)
// ============================================================
function setupTimelineScrub() {
    const wrap = document.getElementById('forex-timeline');
    const ghost = document.getElementById('timeline-ghost');
    const tooltip = document.getElementById('timeline-tooltip');
    if (!wrap || !ghost || !tooltip) return;

    const ttTime = tooltip.querySelector('.tt-time');
    const ttSessions = tooltip.querySelector('.tt-sessions');

    const updateAtClientX = (clientX) => {
        const state = __timelineState;
        if (!state.lanes || !state.lanes.length) return;
        const rect = wrap.getBoundingClientRect();
        if (rect.width === 0) return;

        // Posición en CSS px relativa al wrapper
        const xCss = clientX - rect.left;
        // Convertir a coordenada del viewBox (svg fue dibujado con W → escalado a rect.width)
        const scale = state.W / rect.width;
        const vbX = xCss * scale;

        if (vbX < state.padX || vbX > state.padX + state.innerW) {
            hide();
            return;
        }

        // Minutos desde medianoche del usuario, snap a 5 min
        const rawMins = ((vbX - state.padX) / state.innerW) * 1440;
        const mins = Math.max(0, Math.min(1440, Math.round(rawMins / 5) * 5));

        const h = Math.floor(mins / 60) % 24;
        const m = mins % 60;
        const timeStr = `${pad2(h)}:${pad2(m)}`;

        // Sesiones abiertas en ese minuto
        const open = state.lanes.filter(lane =>
            lane.segments.some(([s, e]) => mins >= s && mins < e)
        );
        const sessionsLabel = open.length
            ? open.map(l => l.mkt.name).join(' · ')
            : t('timeline.no_sessions');

        if (ttTime) ttTime.textContent = timeStr;
        if (ttSessions) ttSessions.textContent = sessionsLabel;

        // Posicionar ghost (línea vertical) y tooltip
        const ghostXCss = (state.padX + ((mins / 1440) * state.innerW)) / scale;
        ghost.style.left = ghostXCss + 'px';
        ghost.classList.add('is-active');

        // Tooltip: centrado en x, pero clamp a los bordes del wrap
        const ttHalf = tooltip.offsetWidth / 2 || 60;
        const minLeft = ttHalf + 4;
        const maxLeft = rect.width - ttHalf - 4;
        const clampedX = Math.max(minLeft, Math.min(maxLeft, ghostXCss));
        tooltip.style.left = clampedX + 'px';
        tooltip.classList.add('is-active');
        tooltip.setAttribute('aria-hidden', 'false');
        ghost.setAttribute('aria-hidden', 'false');
    };

    const hide = () => {
        ghost.classList.remove('is-active');
        tooltip.classList.remove('is-active');
        tooltip.setAttribute('aria-hidden', 'true');
        ghost.setAttribute('aria-hidden', 'true');
    };

    // Mouse
    wrap.addEventListener('mousemove', (e) => updateAtClientX(e.clientX));
    wrap.addEventListener('mouseleave', hide);

    // Touch (móvil): permite "arrastrar" el dedo a lo largo del timeline
    wrap.addEventListener('touchstart', (e) => {
        if (e.touches[0]) updateAtClientX(e.touches[0].clientX);
    }, { passive: true });
    wrap.addEventListener('touchmove', (e) => {
        if (e.touches[0]) updateAtClientX(e.touches[0].clientX);
    }, { passive: true });
    wrap.addEventListener('touchend', hide);

    // Soporte teclado: flechas izquierda/derecha mueven el ghost en pasos de 15 min
    let kbMins = null;
    wrap.tabIndex = 0;
    wrap.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        const state = __timelineState;
        if (!state.lanes.length) return;
        const rect = wrap.getBoundingClientRect();
        if (kbMins === null) kbMins = 12 * 60; // empezar al mediodía
        kbMins += (e.key === 'ArrowRight' ? 15 : -15);
        kbMins = Math.max(0, Math.min(1440, kbMins));
        // Calcular clientX equivalente
        const scale = state.W / rect.width;
        const vbX = state.padX + (kbMins / 1440) * state.innerW;
        updateAtClientX(rect.left + vbX / scale);
        e.preventDefault();
    });
    wrap.addEventListener('blur', hide);
}

// ============================================================
// Reloj del usuario
// ============================================================
function updateClock() {
    const now = new Date();
    const tz = getEffectiveUserTimezone();
    const opts = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    if (userTimezoneOverride) opts.timeZone = userTimezoneOverride;
    let formatted;
    try {
        formatted = new Intl.DateTimeFormat(undefined, opts).format(now);
    } catch (e) {
        formatted = now.toLocaleTimeString();
    }

    // Reloj del header
    const clockText = document.getElementById('user-clock-text');
    const tzText = document.getElementById('user-timezone-text');
    if (clockText) clockText.textContent = formatted;
    if (tzText) tzText.textContent = tz.replace('_', ' ');

    // "Hora NY" en la card de Cripto (refresca cada segundo para fluidez)
    try {
        const cryptoNy = document.querySelector('[data-field="crypto-ny-time"]');
        if (cryptoNy) {
            const opts2 = { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/New_York' };
            cryptoNy.textContent = new Intl.DateTimeFormat(undefined, opts2).format(now);
        }
    } catch (e) { /* ignore */ }
}

// Re-renderiza el timeline cada minuto (suficiente para el cursor "ahora")
let __timelineMinuteTimer = null;
function startTimelineLoop() {
    if (__timelineMinuteTimer) clearInterval(__timelineMinuteTimer);
    // Sincronizar al inicio del próximo minuto
    const msToNextMinute = 60000 - (Date.now() % 60000);
    setTimeout(() => {
        try { renderForexTimeline(Date.now()); } catch (e) {}
        __timelineMinuteTimer = setInterval(() => {
            try { renderForexTimeline(Date.now()); } catch (e) {}
        }, 60000);
    }, msToNextMinute);
}

// ============================================================
// Bucle principal — sin depender del segundo del reloj
// ============================================================
let __markersTimer = null;
function scheduleNextRender() {
    // Re-render cada 30s, pero usando setTimeout encadenado para no perder ticks
    if (__markersTimer) clearTimeout(__markersTimer);
    __markersTimer = setTimeout(() => {
        try { renderMarkets(); } catch (e) { console.warn(e); }
        scheduleNextRender();
    }, 30 * 1000);
}

let __clockTimer = null;
function startClockLoop() {
    if (__clockTimer) clearInterval(__clockTimer);
    updateClock();
    // Sincronizar al inicio del próximo segundo
    const msToNextSecond = 1000 - (Date.now() % 1000);
    setTimeout(() => {
        updateClock();
        __clockTimer = setInterval(updateClock, 1000);
    }, msToNextSecond);
}

// ============================================================
// Card de Cripto — 24/7 con medidor de liquidez por horario
// ============================================================
// Niveles vs porcentaje del medidor
const CRYPTO_LEVELS = {
    high:        { pct: 95, color: 'crypto-level-high',     i18nKey: 'crypto.level.high' },
    medium_high: { pct: 70, color: 'crypto-level-mhigh',    i18nKey: 'crypto.level.medium_high' },
    medium:      { pct: 50, color: 'crypto-level-medium',   i18nKey: 'crypto.level.medium' },
    low:         { pct: 18, color: 'crypto-level-low',      i18nKey: 'crypto.level.low' }
};

// Devuelve { level, pct, windowKey } basado en hora ET (donde están los flujos institucionales)
function getCryptoLiquidity(nowMs) {
    const z = TzUtils.getZonedParts(nowMs, 'America/New_York');
    const mins = z.hour * 60 + z.minute;
    const dow = z.weekdayIndex;
    const isWeekend = dow === 0 || dow === 6;

    let level, windowKey;

    if (mins >= 8 * 60 && mins < 12 * 60) {
        level = 'high';            windowKey = 'crypto.window.golden';
    } else if (mins >= 12 * 60 && mins < 17 * 60) {
        level = 'medium_high';     windowKey = 'crypto.window.ny';
    } else if (mins >= 20 * 60 || mins < 4 * 60) {
        level = 'medium';          windowKey = 'crypto.window.asia';
    } else {
        level = 'low';             windowKey = 'crypto.window.dead';
    }

    // Penalty de fin de semana: bajar un nivel y forzar windowKey weekend
    if (isWeekend) {
        if (level === 'high')        level = 'medium_high';
        else if (level === 'medium_high') level = 'medium';
        else if (level === 'medium') level = 'low';
        windowKey = 'crypto.window.weekend';
    }

    return {
        level,
        pct: CRYPTO_LEVELS[level].pct,
        levelLabelKey: CRYPTO_LEVELS[level].i18nKey,
        windowKey,
        levelClass: CRYPTO_LEVELS[level].color
    };
}

// Próxima "golden hour" (8 AM ET en día laborable).
// Si estamos dentro de ella, devuelve cuándo cierra.
function findNextCryptoHighWindow(nowMs) {
    const z = TzUtils.getZonedParts(nowMs, 'America/New_York');
    const mins = z.hour * 60 + z.minute;
    const dow = z.weekdayIndex;
    const isWeekend = dow === 0 || dow === 6;

    // ¿Estamos dentro de la golden hour?
    if (!isWeekend && mins >= 8 * 60 && mins < 12 * 60) {
        return { type: 'closes', minutes: 12 * 60 - mins };
    }

    // Buscar el siguiente día laborable a las 8:00 ET
    const minsRemainingToday = 24 * 60 - mins;
    for (let offset = 0; offset <= 7; offset++) {
        const futureDow = (dow + offset) % 7;
        if (futureDow === 0 || futureDow === 6) continue;
        if (offset === 0) {
            // Hoy es laborable: si todavía no son las 8, contamos hoy
            if (mins < 8 * 60) {
                return { type: 'opens', minutes: 8 * 60 - mins };
            }
            // Si ya pasamos las 12, vamos al siguiente día
            continue;
        }
        const total = minsRemainingToday + (offset - 1) * 1440 + 8 * 60;
        return { type: 'opens', minutes: total };
    }
    return null;
}

const CRYPTO_WINDOWS_REFERENCE = [
    { levelClass: 'crypto-level-high',  range: '08:00 – 12:00', labelKey: 'crypto.window.golden' },
    { levelClass: 'crypto-level-mhigh', range: '12:00 – 17:00', labelKey: 'crypto.window.ny' },
    { levelClass: 'crypto-level-medium', range: '20:00 – 04:00', labelKey: 'crypto.window.asia' }
];

function buildCryptoCardHTML() {
    return `
        <div class="card crypto-card" data-mkt-id="crypto" role="article" aria-label="Crypto market">
            <div class="card-header">
                <span class="market-name" data-i18n="crypto.name">Cripto (BTC, ETH…)</span>
                <i class="fa-brands fa-bitcoin market-icon" aria-hidden="true"></i>
            </div>

            <div class="status-badge status-open" role="status" aria-live="polite">
                <span class="indicator-dot dot-open"></span>
                <span data-i18n="crypto.always_open">24/7 abierto</span>
            </div>

            <div class="countdown-chip" data-field="crypto-countdown">
                <i class="fa-regular fa-hourglass-half" aria-hidden="true"></i>
                <span data-field="crypto-countdown-text"></span>
            </div>

            <div class="liquidity-section">
                <div class="liquidity-header">
                    <span class="liquidity-label" data-i18n="crypto.liquidity_label">Liquidez ahora</span>
                    <span class="liquidity-value" data-field="crypto-level"></span>
                </div>
                <div class="liquidity-track">
                    <div class="liquidity-fill" data-field="crypto-fill" style="width:0%"></div>
                </div>
                <div class="liquidity-window" data-field="crypto-window"></div>
            </div>

            <div class="sub-time">
                <span data-i18n="crypto.ny_time">Hora NY:</span>
                <span data-field="crypto-ny-time" class="tabular-nums">--:--</span>
            </div>

            <div class="crypto-windows-ref">
                <div class="crypto-windows-title" data-i18n="crypto.windows_title">Mejores ventanas (hora NY)</div>
                ${CRYPTO_WINDOWS_REFERENCE.map(w => `
                    <div class="cw-row">
                        <span class="cw-dot ${w.levelClass}"></span>
                        <span class="cw-time tabular-nums">${w.range}</span>
                        <span class="cw-label" data-i18n="${w.labelKey}"></span>
                    </div>
                `).join('')}
            </div>

            <div class="crypto-tip" data-i18n="crypto.tip"></div>
        </div>
    `;
}

let __cryptoInitialRender = false;
function renderCryptoCard(nowMs) {
    const container = document.getElementById('crypto-grid');
    if (!container) return;

    if (!__cryptoInitialRender || container.children.length === 0) {
        container.innerHTML = buildCryptoCardHTML();
        translatePage(container);
        __cryptoInitialRender = true;
    }

    const card = container.querySelector('.crypto-card');
    if (!card) return;

    const liq = getCryptoLiquidity(nowMs);
    const next = findNextCryptoHighWindow(nowMs);

    // Liquidez
    setText(card, 'crypto-level', t(liq.levelLabelKey));
    setText(card, 'crypto-window', t(liq.windowKey));
    const fill = card.querySelector('[data-field="crypto-fill"]');
    if (fill) {
        fill.style.width = liq.pct + '%';
        fill.classList.remove('crypto-level-high', 'crypto-level-mhigh', 'crypto-level-medium', 'crypto-level-low');
        fill.classList.add(liq.levelClass);
    }
    const levelEl = card.querySelector('[data-field="crypto-level"]');
    if (levelEl) {
        levelEl.classList.remove('crypto-level-high', 'crypto-level-mhigh', 'crypto-level-medium', 'crypto-level-low');
        levelEl.classList.add(liq.levelClass);
    }

    // Countdown
    const cdChip = card.querySelector('[data-field="crypto-countdown"]');
    if (cdChip) {
        if (next) {
            const k = next.type === 'closes' ? 'crypto.closing_golden' : 'crypto.next_golden';
            setText(card, 'crypto-countdown-text', t(k, [formatCountdown(next.minutes)]));
            cdChip.classList.remove('hidden', 'countdown-opens', 'countdown-closes');
            cdChip.classList.add(next.type === 'closes' ? 'countdown-closes' : 'countdown-opens');
        } else {
            cdChip.classList.add('hidden');
        }
    }

    // Hora NY (referencia institucional para el cripto) en formato 12h con a.m./p.m.
    try {
        const opts = { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/New_York' };
        const nyTime = new Intl.DateTimeFormat(undefined, opts).format(new Date(nowMs));
        setText(card, 'crypto-ny-time', nyTime);
    } catch (e) { /* ignore */ }
}

// ============================================================
// Init
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    loadUserTimezoneOverride();
    setupTimezonePicker();

    const initial = detectLanguage();
    setLanguage(initial); // esto invoca el primer render
    startClockLoop();
    renderMarkets({ force: true });
    scheduleNextRender();
    startTimelineLoop();
    setupTimelineScrub();

    // Si el idioma cambia desde otra pestaña, sincronizar
    window.addEventListener('storage', (e) => {
        if (e.key === 'lang' && e.newValue && e.newValue !== currentLang) {
            invalidateHolidayCache();
            setLanguage(e.newValue);
        }
    });
});

// Refresca render al volver a primer plano (visibilitychange)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        try { renderMarkets(); } catch (e) {}
    }
});

// ============================================================
// Service worker — registro + auto-update
// ============================================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').then((reg) => {
            if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
            reg.addEventListener('updatefound', () => {
                const sw = reg.installing;
                if (!sw) return;
                sw.addEventListener('statechange', () => {
                    if (sw.state === 'installed' && navigator.serviceWorker.controller) {
                        sw.postMessage({ type: 'SKIP_WAITING' });
                    }
                });
            });
        }).catch(err => console.warn('SW registration failed:', err));

        let __reloading = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (__reloading) return;
            __reloading = true;
            setTimeout(() => { try { location.reload(); } catch (e) {} }, 200);
        });
    });
}

// Exponer para tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        nthWeekdayOfMonth, easterDate, goodFridayDate, observedDate,
        getHolidaysForYear, HOLIDAY_RULES, resolveHolidayDate
    };
}
