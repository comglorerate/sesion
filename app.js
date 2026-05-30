// Centralized application JS

// ============================================================
// Internationalization (ES / EN)
// ============================================================
const translations = {
    es: {
        title: 'Horarios de Mercados Financieros',
        nav: { calculator: 'Calculadora', journal: 'Journal', news: 'Noticias', calculator_open: 'Abrir Calculadora', journal_open: 'Abrir Journal', news_open: 'Ver eventos macro' },
        detecting: 'Detectando...',
        stocks: { title: 'Bolsa de Valores de EE. UU', subtitle: 'Mercado de Acciones' },
        forex: { title: 'Sesión de Forex', subtitle: 'Mercado de Divisas', lunch: 'Almuerzo (volumen bajo)', lunch_label: 'Almuerzo:' },
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
        news: {
            title: 'Eventos macro',
            subtitle: 'Noticias económicas que mueven al cripto y al mercado en general',
            impact_max: 'Impacto máximo',
            impact_high: 'Impacto alto',
            impact_med: 'Impacto medio',
            next: 'Próximo',
            next_approx: 'Próximo (aprox.)',
            why: 'Impacto en el mercado',
            past: 'Hoy / sucedió hoy',
            events: {
                fomc: {
                    name: 'FOMC',
                    long: 'Reunión del Comité de la Reserva Federal (decisión de tasas)',
                    when: '8 veces al año · 14:00 ET (anuncio)',
                    why: 'La Fed decide tasas. BTC y todo el cripto suelen tener movimientos masivos en los minutos posteriores al anuncio. Muchas veces el mayor evento del mes.'
                },
                pce: {
                    name: 'PCE',
                    long: 'Gasto en consumo personal (inflación preferida de la Fed)',
                    when: 'Mensual · ~fin de mes · 8:30 AM ET',
                    why: 'La medida de inflación que MÁS mira la Fed. Sorpresas mueven con fuerza al dólar y, por contagio, al BTC.'
                },
                retail: {
                    name: 'Ventas minoristas',
                    long: 'Consumo de los hogares en EE. UU. (Retail Sales)',
                    when: 'Mensual · ~mediados de mes · 8:30 AM ET',
                    why: 'Mide la fortaleza del consumidor. Dato fuerte → dólar arriba y presión sobre el cripto.'
                },
                ppi: {
                    name: 'PPI',
                    long: 'Precios al productor (inflación mayorista EE. UU.)',
                    when: 'Mensual · ~mediados de mes · 8:30 AM ET',
                    why: 'Adelanta tendencias del CPI. Sorpresas mueven las expectativas de tasas y al BTC.'
                },
                ism_svc: {
                    name: 'ISM Servicios',
                    long: 'PMI de servicios (la mayor parte de la economía EE. UU.)',
                    when: 'Mensual · ~3er día hábil · 10:00 ET',
                    why: 'Aún más relevante que el manufacturero. Sorpresas mueven dólar y cripto.'
                },
                ism_mfg: {
                    name: 'ISM Manufacturero',
                    long: 'PMI manufacturero (actividad industrial EE. UU.)',
                    when: 'Mensual · 1er día hábil · 10:00 ET',
                    why: 'Termómetro de la economía. Bajo 50 = contracción; mueve dólar y apetito de riesgo.'
                },
                jobless: {
                    name: 'Peticiones de desempleo',
                    long: 'Solicitudes iniciales de subsidio (EE. UU.)',
                    when: 'Semanal · jueves · 8:30 AM ET',
                    why: 'Pulso semanal del empleo. El acumulado de sorpresas mueve expectativas de tasas y al dólar.'
                },
                cpi: {
                    name: 'CPI',
                    long: 'Índice de precios al consumidor (inflación EE. UU.)',
                    when: 'Mensual · ~10º–13º día del mes · 8:30 AM ET',
                    why: 'Mide la inflación US. Si sale por encima de lo esperado → BTC suele caer 3–8%. Por debajo → sube igual de fuerte.'
                },
                nfp: {
                    name: 'NFP',
                    long: 'Nóminas no agrícolas (empleo EE. UU.)',
                    when: 'Primer viernes del mes · 8:30 AM ET',
                    why: 'Termómetro del empleo. Mucho movimiento en USD, oro, BTC y acciones en los primeros 30–60 min. Spreads y slippage altos.'
                },
                cme: {
                    name: 'CME · Vencimiento de futuros',
                    long: 'Cierre mensual de futuros BTC y ETH en CME',
                    when: 'Último viernes hábil del mes · 16:00 ET',
                    why: 'Reposicionamiento institucional. "Wicks" de manipulación los días previos. Los cierres trimestrales (Mar/Jun/Sep/Dec) son los más movidos.'
                }
            },
            disclaimer: 'Las fechas FOMC son las oficiales de la Fed. CPI es aproximado (verifica el calendario del BLS para fechas exactas). Horas en hora del Este (ET).'
        },
        nasdaq: { high_volatility: 'Alta volatilidad', calm_zone: 'Zona de calma' },
        notifs: {
            button: 'Notificaciones',
            open: 'Abrir notificaciones',
            close: 'Cerrar',
            title: 'Notificaciones',
            master: 'Activar notificaciones',
            permission_default: 'Permiso aún no concedido. Activa el interruptor para pedirlo.',
            permission_granted: '✓ Permiso concedido — listo para avisarte.',
            permission_denied: '✗ Permiso denegado. Actívalo en los ajustes de notificaciones de la app.',
            permission_unsupported: 'Este dispositivo no soporta notificaciones.',
            macro_title: 'Eventos macro',
            macro_hint: 'Te avisa 5 minutos antes',
            opens_title: 'Aperturas de mercado',
            opens_hint: 'Te avisa al momento de la apertura',
            custom_title: 'Alarmas personalizadas',
            custom_hint: 'Crea tus propias alarmas (ej. "13:00 — Reanudación de sesión")',
            add: 'Añadir',
            empty: 'No hay alarmas personalizadas aún.',
            disclaimer: 'Las notificaciones se entregan a través de Android y funcionan aunque cierres la app. Se reprograman automáticamente.',
            preset: {
                fomc: 'FOMC (decisión de la Fed)',
                nfp: 'NFP (empleo US)',
                cpi: 'CPI (inflación US)',
                cme: 'CME (vencimiento futuros)',
                openNasdaq: 'NASDAQ abre',
                openNY: 'New York (Forex) abre',
                openLondon: 'London abre',
                openTokyo: 'Tokyo abre',
                openSydney: 'Sydney abre',
                goldenHour: 'Inicio Golden Hour (cripto)'
            },
            preset_msg: {
                fomc: 'FOMC en 5 min · Decisión de tasas — máxima volatilidad',
                nfp: 'NFP en 5 min · Datos de empleo US — alta volatilidad',
                cpi: 'CPI en 5 min · Inflación US — atento al BTC',
                cme: 'CME en 5 min · Vencimiento de futuros',
                openNasdaq: 'NASDAQ acaba de abrir',
                openNY: 'New York Forex acaba de abrir',
                openLondon: 'London acaba de abrir — alta liquidez',
                openTokyo: 'Tokyo acaba de abrir',
                openSydney: 'Sydney acaba de abrir',
                goldenHour: 'Golden Hour comienza ahora · London + NY → máxima liquidez cripto'
            },
            form: {
                title_add: 'Nueva alarma',
                title_edit: 'Editar alarma',
                time: 'Hora',
                message: 'Mensaje',
                message_placeholder: 'Ej: Reanudación de sesión',
                days: 'Días de la semana',
                cancel: 'Cancelar',
                save: 'Guardar',
                save_edit: 'Actualizar'
            },
            day_short: { 0: 'D', 1: 'L', 2: 'M', 3: 'X', 4: 'J', 5: 'V', 6: 'S' },
            edit: 'Editar',
            delete: 'Eliminar',
            toggle_on: 'Desactivar',
            toggle_off: 'Activar',
            every_day: 'Todos los días',
            weekdays: 'L–V',
            once: 'Una vez'
        },
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
        nav: { calculator: 'Calculator', journal: 'Journal', news: 'News', calculator_open: 'Open Calculator', journal_open: 'Open Journal', news_open: 'View macro events' },
        detecting: 'Detecting...',
        stocks: { title: 'US Stock Exchanges', subtitle: 'Stock Market' },
        forex: { title: 'Forex Session', subtitle: 'Currency Market', lunch: 'Lunch lull (low volume)', lunch_label: 'Lunch:' },
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
        news: {
            title: 'Macro events',
            subtitle: 'Economic news that move crypto and the broader market',
            impact_max: 'Maximum impact',
            impact_high: 'High impact',
            impact_med: 'Medium impact',
            next: 'Next',
            next_approx: 'Next (approx.)',
            why: 'Market impact',
            past: 'Today / happened today',
            events: {
                fomc: {
                    name: 'FOMC',
                    long: 'Federal Open Market Committee meeting (rate decision)',
                    when: '8 times a year · 2:00 PM ET (statement)',
                    why: 'The Fed sets rates. BTC and all crypto usually move massively in the minutes after the announcement. Often the biggest event of the month.'
                },
                pce: {
                    name: 'PCE',
                    long: 'Personal Consumption Expenditures (the Fed\'s preferred inflation gauge)',
                    when: 'Monthly · ~end of month · 8:30 AM ET',
                    why: 'The inflation measure the Fed watches MOST. Surprises move the dollar hard and, by contagion, BTC.'
                },
                retail: {
                    name: 'Retail Sales',
                    long: 'US household consumption',
                    when: 'Monthly · ~mid-month · 8:30 AM ET',
                    why: 'Measures consumer strength. Strong print → dollar up and pressure on crypto.'
                },
                ppi: {
                    name: 'PPI',
                    long: 'Producer Price Index (US wholesale inflation)',
                    when: 'Monthly · ~mid-month · 8:30 AM ET',
                    why: 'Leads CPI trends. Surprises move rate expectations and BTC.'
                },
                ism_svc: {
                    name: 'ISM Services',
                    long: 'Services PMI (most of the US economy)',
                    when: 'Monthly · ~3rd business day · 10:00 ET',
                    why: 'Even more relevant than manufacturing. Surprises move the dollar and crypto.'
                },
                ism_mfg: {
                    name: 'ISM Manufacturing',
                    long: 'Manufacturing PMI (US industrial activity)',
                    when: 'Monthly · 1st business day · 10:00 ET',
                    why: 'Economy thermometer. Below 50 = contraction; moves the dollar and risk appetite.'
                },
                jobless: {
                    name: 'Jobless Claims',
                    long: 'Initial unemployment claims (US)',
                    when: 'Weekly · Thursday · 8:30 AM ET',
                    why: 'Weekly employment pulse. The run of surprises shifts rate expectations and the dollar.'
                },
                cpi: {
                    name: 'CPI',
                    long: 'Consumer Price Index (US inflation)',
                    when: 'Monthly · ~10th–13th of month · 8:30 AM ET',
                    why: 'Measures US inflation. If hotter than expected → BTC usually drops 3–8%. Cooler than expected → rallies just as hard.'
                },
                nfp: {
                    name: 'NFP',
                    long: 'Non-Farm Payrolls (US employment)',
                    when: 'First Friday of month · 8:30 AM ET',
                    why: 'Employment thermometer. Heavy movement in USD, gold, BTC, and equities in the first 30–60 min. Spreads and slippage spike.'
                },
                cme: {
                    name: 'CME · Futures expiration',
                    long: 'Monthly BTC & ETH futures close on CME',
                    when: 'Last business Friday of month · 4:00 PM ET',
                    why: 'Institutional repositioning. Manipulation "wicks" common in the days around it. Quarterly closes (Mar/Jun/Sep/Dec) are the biggest.'
                }
            },
            disclaimer: 'FOMC dates are the Fed\'s official ones. CPI is approximate (verify the BLS calendar for exact dates). Times are Eastern Time (ET).'
        },
        nasdaq: { high_volatility: 'High volatility', calm_zone: 'Calm zone' },
        notifs: {
            button: 'Notifications',
            open: 'Open notifications',
            close: 'Close',
            title: 'Notifications',
            master: 'Enable notifications',
            permission_default: 'Permission not granted yet. Toggle to request it.',
            permission_granted: '✓ Permission granted — ready to alert you.',
            permission_denied: '✗ Permission denied. Enable it in the app notification settings.',
            permission_unsupported: 'This device does not support notifications.',
            macro_title: 'Macro events',
            macro_hint: 'Alerts 5 minutes before',
            opens_title: 'Market opens',
            opens_hint: 'Alerts at market open',
            custom_title: 'Custom alarms',
            custom_hint: 'Create your own alarms (e.g. "1:00 PM — Session resume")',
            add: 'Add',
            empty: 'No custom alarms yet.',
            disclaimer: 'Notifications are delivered through Android and work even if you close the app. They reschedule automatically.',
            preset: {
                fomc: 'FOMC (Fed rate decision)',
                nfp: 'NFP (US jobs)',
                cpi: 'CPI (US inflation)',
                cme: 'CME (futures expiry)',
                openNasdaq: 'NASDAQ opens',
                openNY: 'New York (Forex) opens',
                openLondon: 'London opens',
                openTokyo: 'Tokyo opens',
                openSydney: 'Sydney opens',
                goldenHour: 'Golden Hour start (crypto)'
            },
            preset_msg: {
                fomc: 'FOMC in 5 min · Rate decision — max volatility',
                nfp: 'NFP in 5 min · US jobs data — high volatility',
                cpi: 'CPI in 5 min · US inflation — watch BTC',
                cme: 'CME in 5 min · Futures expiry',
                openNasdaq: 'NASDAQ just opened',
                openNY: 'New York Forex just opened',
                openLondon: 'London just opened — high liquidity',
                openTokyo: 'Tokyo just opened',
                openSydney: 'Sydney just opened',
                goldenHour: 'Golden Hour starts now · London + NY = max crypto liquidity'
            },
            form: {
                title_add: 'New alarm',
                title_edit: 'Edit alarm',
                time: 'Time',
                message: 'Message',
                message_placeholder: 'e.g. Session resume',
                days: 'Days of week',
                cancel: 'Cancel',
                save: 'Save',
                save_edit: 'Update'
            },
            day_short: { 0: 'S', 1: 'M', 2: 'T', 3: 'W', 4: 'T', 5: 'F', 6: 'S' },
            edit: 'Edit',
            delete: 'Delete',
            toggle_on: 'Disable',
            toggle_off: 'Enable',
            every_day: 'Every day',
            weekdays: 'M–F',
            once: 'Once'
        },
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
// `lunch` = receso/lunch lull aproximado: hora local del mercado en que los traders
// institucionales suelen ir a comer y el volumen baja notablemente. No siempre es un
// cierre oficial (excepto Tokyo Stock Exchange que sí cierra; aquí la sesión Forex
// continúa pero el volumen cae).
const forexMarkets = [
    { id: 'sydney', name: 'Sydney', tz: 'Australia/Sydney',  open: 7, close: 16, icon: 'fa-earth-oceania',  openDays: [1, 2, 3, 4, 5],
      windows: [{ kind: 'calm', startH: 12, startM: 0, endH: 13, endM: 0, labelKey: 'forex.lunch' }] },
    { id: 'tokyo',  name: 'Tokyo',  tz: 'Asia/Tokyo',        open: 9, close: 18, icon: 'fa-yen-sign',       openDays: [1, 2, 3, 4, 5],
      windows: [{ kind: 'calm', startH: 11, startM: 30, endH: 12, endM: 30, labelKey: 'forex.lunch' }] },
    { id: 'london', name: 'London', tz: 'Europe/London',     open: 8, close: 17, icon: 'fa-sterling-sign',  openDays: [1, 2, 3, 4, 5],
      windows: [{ kind: 'calm', startH: 12, startM: 0, endH: 13, endM: 0, labelKey: 'forex.lunch' }] },
    { id: 'ny',     name: 'New York', tz: 'America/New_York', open: 8, close: 17, icon: 'fa-dollar-sign',   openDays: [1, 2, 3, 4, 5],
      windows: [{ kind: 'calm', startH: 12, startM: 0, endH: 13, endM: 0, labelKey: 'forex.lunch' }] }
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
    const opts = { hour: '2-digit', minute: '2-digit', hour12: false };
    if (userTimezoneOverride) opts.timeZone = userTimezoneOverride;
    return new Intl.DateTimeFormat(undefined, opts).format(dateObj);
}

// Formatea una hora cruda (h, m en formato 24h) — formato militar, respetando
// la zona horaria efectiva del usuario.
function formatHourMin12h(h, m) {
    const tz = getEffectiveUserTimezone();
    try {
        const today = TzUtils.getZonedParts(Date.now(), tz);
        const utcInstant = TzUtils.zonedTimeToUtc({
            year: today.year, month: today.month, day: today.day,
            hour: h, minute: m, second: 0
        }, tz);
        const opts = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz };
        return new Intl.DateTimeFormat(undefined, opts).format(utcInstant);
    } catch (e) {
        // Fallback manual (24h)
        return `${pad2(h)}:${pad2(m)}`;
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
                    <div class="progress-lunch-zone hidden" data-field="lunch-zone" aria-hidden="true"></div>
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
            <div class="time-row time-row-lunch hidden" data-field="lunch-row">
                <span class="time-label time-label-lunch" data-i18n="forex.lunch_label">Almuerzo:</span>
                <span class="time-value time-value-lunch" data-field="lunch-time">--:-- – --:--</span>
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

    // Resaltar la tarjeta según su estado (abierta brilla, cerrada se atenúa).
    card.classList.remove('card-open', 'card-soon', 'card-closed');
    if (data.status === 'open') card.classList.add('card-open');
    else if (data.status === 'soon') card.classList.add('card-soon');
    else card.classList.add('card-closed');

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

    // Almuerzo / lunch lull (cualquier mercado con una ventana 'calm' configurada:
    // Forex (Sydney/Tokyo/London/NY) y stocks (NASDAQ).
    // Durante este periodo el volumen baja porque los traders institucionales van
    // a comer; el mercado sigue abierto pero los movimientos son menos confiables.
    const lunchRow = card.querySelector('[data-field="lunch-row"]');
    const lunchZone = card.querySelector('[data-field="lunch-zone"]');
    const lunchWindow = Array.isArray(mkt.windows) ? mkt.windows.find(w => w.kind === 'calm') : null;

    if (lunchRow) {
        if (lunchWindow) {
            const lunchStart = getFormattedUserTimeFromMarketTime(lunchWindow.startH, lunchWindow.startM || 0, mkt.tz);
            const lunchEnd = getFormattedUserTimeFromMarketTime(lunchWindow.endH, lunchWindow.endM || 0, mkt.tz);
            setText(card, 'lunch-time', `${lunchStart} – ${lunchEnd}`);
            lunchRow.classList.remove('hidden');
        } else {
            lunchRow.classList.add('hidden');
        }
    }

    // Pintar la zona del almuerzo en la barra de progreso (overlay violeta sutil)
    if (lunchZone) {
        if (lunchWindow) {
            const openMins = mkt.open * 60 + (mkt.openMin || 0);
            const closeMins = data.closeMinsEffective; // contempla early close
            const lunchStartM = lunchWindow.startH * 60 + (lunchWindow.startM || 0);
            const lunchEndM = lunchWindow.endH * 60 + (lunchWindow.endM || 0);
            const totalDur = closeMins - openMins;
            if (totalDur > 0 && lunchEndM > openMins && lunchStartM < closeMins) {
                const startPct = Math.max(0, ((lunchStartM - openMins) / totalDur) * 100);
                const endPct = Math.min(100, ((lunchEndM - openMins) / totalDur) * 100);
                lunchZone.style.left = `${startPct}%`;
                lunchZone.style.width = `${endPct - startPct}%`;
                lunchZone.classList.remove('hidden');
            } else {
                lunchZone.classList.add('hidden');
            }
        } else {
            lunchZone.classList.add('hidden');
        }
    }

    // Hora del mercado actual (formato 24h militar)
    let mktTimeStr = '';
    if (data.nowZone) {
        try {
            const opts = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: mkt.tz };
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

    // Killzones (ICT)
    try { renderKillzones(now); } catch (e) { console.warn('killzones error', e); }

    // Card de Cripto (24/7 con medidor de liquidez)
    try { renderCryptoCard(now); } catch (e) { console.warn('crypto error', e); }

    // Sección de Noticias / Eventos macro
    try { renderNewsSection(now); } catch (e) { console.warn('news error', e); }

    // Resumen "de un vistazo" (chips de mercados abiertos/cerrados)
    try { renderMarketSummary(now); } catch (e) { console.warn('summary error', e); }
}

// Pestañas: muestra solo las secciones de la pestaña activa.
function setupMarketTabs() {
    const bar = document.getElementById('market-tabs');
    if (!bar) return;
    const buttons = Array.from(bar.querySelectorAll('[data-tab-btn]'));
    const sections = Array.from(document.querySelectorAll('main section[data-tab]'));
    const STORAGE_KEY = 'sesion_active_tab';

    const activate = (tab) => {
        buttons.forEach(b => {
            const on = b.getAttribute('data-tab-btn') === tab;
            b.classList.toggle('is-active', on);
            b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        sections.forEach(s => {
            s.style.display = (s.getAttribute('data-tab') === tab) ? '' : 'none';
        });
        try { localStorage.setItem(STORAGE_KEY, tab); } catch (e) {}
        // Re-render para que elementos que dependen del ancho (timeline) se dibujen bien
        // al pasar de oculto a visible.
        try { renderMarkets(); } catch (e) {}
    };

    buttons.forEach(b => {
        b.addEventListener('click', () => activate(b.getAttribute('data-tab-btn')));
    });

    let initial = 'cripto';
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && buttons.some(b => b.getAttribute('data-tab-btn') === saved)) initial = saved;
    } catch (e) {}
    activate(initial);
}

// Resumen compacto en la parte superior: un chip por mercado con su estado actual.
function renderMarketSummary(nowMs) {
    const el = document.getElementById('market-summary');
    if (!el) return;
    const now = nowMs ?? Date.now();

    const items = [];
    // Cripto: 24/7 siempre abierto
    items.push({ name: 'Cripto', status: 'open' });
    // Forex + acciones en orden lógico de la jornada
    const order = ['sydney', 'tokyo', 'london', 'ny', 'nasdaq'];
    const byId = {};
    forexMarkets.forEach(m => { byId[m.id] = m; });
    stockMarkets.forEach(m => { byId[m.id] = m; });
    order.forEach(id => {
        const mkt = byId[id];
        if (!mkt) return;
        const data = getMarketData(mkt, now);
        items.push({ name: mkt.name, status: data.status });
    });

    const stateClass = (s) => (s === 'open' ? 'sum-open' : (s === 'soon' ? 'sum-soon' : 'sum-closed'));
    const stateLabel = (s) => (s === 'open' ? 'Abierto' : (s === 'soon' ? 'Pronto' : 'Cerrado'));

    el.innerHTML = items.map(it => `
        <span class="sum-chip ${stateClass(it.status)}" title="${escapeHtml(it.name)}: ${escapeHtml(stateLabel(it.status))}">
            <span class="sum-dot"></span>${escapeHtml(it.name)}
        </span>
    `).join('');
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
    try { renderNewsSection(Date.now()); } catch (e) {}
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

// ============================================================
// Killzones (ICT) — franjas de alta probabilidad, definidas en hora ET
// ============================================================
// days = días ET válidos (0=Dom .. 6=Sáb). El forex opera dom 17:00 → vie 17:00 ET.
// Asia (20:00 ET) arranca la semana el domingo, así que vale Dom–Jue.
// sb = Silver Bullet (ventana ICT de 1h dentro de la killzone), en hora ET.
const KILLZONES = [
    { id: 'asia',         startH: 20, startM: 0, endH: 22, endM: 0, days: [0, 1, 2, 3, 4] },
    { id: 'london',       startH: 2,  startM: 0, endH: 5,  endM: 0, days: [1, 2, 3, 4, 5], sb: { startH: 3,  endH: 4 } },
    { id: 'ny',           startH: 7,  startM: 0, endH: 11, endM: 0, days: [1, 2, 3, 4, 5], sb: { startH: 10, endH: 11 } },
    { id: 'london_close', startH: 10, startM: 0, endH: 12, endM: 0, days: [1, 2, 3, 4, 5] }
];

// ¿El mercado forex está cerrado ahora? (fin de semana, hora ET)
function isForexClosedNow(etParts) {
    const wd = new Date(Date.UTC(etParts.year, etParts.month - 1, etParts.day, 12)).getUTCDay();
    const h = etParts.hour;
    if (wd === 6) return true;                 // sábado
    if (wd === 0 && h < 17) return true;       // domingo antes de la reapertura
    if (wd === 5 && h >= 17) return true;      // viernes tras el cierre
    return false;
}

function renderKillzones(nowMs) {
    const el = document.getElementById('killzones');
    if (!el) return;
    const now = nowMs ?? Date.now();
    const es = currentLang !== 'en';
    const names = es
        ? { asia: 'Asia', london: 'Londres (apertura)', ny: 'Nueva York (AM)', london_close: 'Cierre de Londres' }
        : { asia: 'Asia', london: 'London (open)', ny: 'New York (AM)', london_close: 'London close' };
    const tz = getEffectiveUserTimezone();
    const fmtT = (inst) => {
        try { return new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }).format(inst); }
        catch (e) { return '--:--'; }
    };

    const p = TzUtils.getZonedParts(now, 'America/New_York');
    const wdOf = (y, m, d) => new Date(Date.UTC(y, m - 1, d, 12)).getUTCDay();

    const rows = KILLZONES.map(kz => {
        const todayWd = wdOf(p.year, p.month, p.day);
        const startToday = instantInET(p.year, p.month, p.day, kz.startH, kz.startM);
        const endToday = instantInET(p.year, p.month, p.day, kz.endH, kz.endM);
        const validToday = kz.days.includes(todayWd);
        const active = validToday && now >= startToday.getTime() && now < endToday.getTime();

        // Próximo inicio en un día válido (busca hasta 8 días)
        let nextStart = null;
        let ymd = { year: p.year, month: p.month, day: p.day };
        for (let i = 0; i < 8; i++) {
            if (kz.days.includes(wdOf(ymd.year, ymd.month, ymd.day))) {
                const st = instantInET(ymd.year, ymd.month, ymd.day, kz.startH, kz.startM);
                if (st.getTime() > now) { nextStart = st; break; }
            }
            ymd = TzUtils.addDaysYMD(ymd, 1);
        }

        // Silver Bullet (sub-ventana de 1h dentro de la killzone)
        let sb = null;
        if (kz.sb) {
            const sbStart = instantInET(p.year, p.month, p.day, kz.sb.startH, kz.sb.startM || 0);
            const sbEnd = instantInET(p.year, p.month, p.day, kz.sb.endH, kz.sb.endM || 0);
            const sbActive = validToday && now >= sbStart.getTime() && now < sbEnd.getTime();
            sb = { sbStart, sbEnd, sbActive };
        }

        return { kz, startToday, endToday, active, nextStart, sb };
    });
    rows.sort((a, b) => {
        if (a.active && !b.active) return -1;
        if (b.active && !a.active) return 1;
        const an = a.nextStart ? a.nextStart.getTime() : Infinity;
        const bn = b.nextStart ? b.nextStart.getTime() : Infinity;
        return an - bn;
    });

    const closed = isForexClosedNow(p);
    const head = `<h3 class="kz-title">Killzones</h3>`;
    const banner = closed
        ? `<div class="kz-banner">${es ? '🔒 Mercado cerrado (fin de semana). Las killzones se reanudan el domingo 17:00 ET.' : '🔒 Market closed (weekend). Killzones resume Sunday 5:00 PM ET.'}</div>`
        : '';

    el.innerHTML = head + banner + rows.map(r => {
        // Ventana mostrada: la del próximo inicio (o la de hoy si está activa)
        const refStart = r.active ? r.startToday : (r.nextStart || r.startToday);
        const winEnd = new Date(refStart.getTime() + (r.endToday.getTime() - r.startToday.getTime()));
        const win = `${fmtT(refStart)}–${fmtT(winEnd)}`;
        let status;
        if (r.active) {
            const cd = diffToFutureCountdown(now, r.endToday);
            status = `<span class="kz-live">${es ? 'ACTIVA' : 'LIVE'}</span>${cd ? ` · ${es ? 'cierra en' : 'ends in'} ${escapeHtml(cd)}` : ''}`;
        } else if (r.nextStart) {
            const cd = diffToFutureCountdown(now, r.nextStart);
            status = `${es ? 'en' : 'in'} <b>${escapeHtml(cd || '--')}</b>`;
        } else {
            status = '—';
        }
        let sbLine = '';
        if (r.sb) {
            const sbWin = `${fmtT(r.sb.sbStart)}–${fmtT(r.sb.sbEnd)}`;
            sbLine = `<div class="kz-sb ${r.sb.sbActive ? 'is-active' : ''}">🎯 Silver Bullet ${escapeHtml(sbWin)}${r.sb.sbActive ? ` · <b>${es ? 'ACTIVA' : 'LIVE'}</b>` : ''}</div>`;
        }
        return `
            <div class="kz-row ${r.active ? 'is-active' : ''} ${closed && !r.active ? 'is-dim' : ''}">
                <span class="kz-dot"></span>
                <div class="kz-main">
                    <div class="kz-name">${escapeHtml(names[r.kz.id] || r.kz.id)}</div>
                    <div class="kz-win">${escapeHtml(win)}</div>
                    ${sbLine}
                </div>
                <div class="kz-status">${status}</div>
            </div>`;
    }).join('');
}

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

    // Colores según tema (claro/oscuro) para que el timeline se vea bien en ambos
    const isLight = document.documentElement.classList.contains('light');
    const COL = {
        band:      isLight ? '#0f172a' : 'white',
        tickLine:  isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.06)',
        tickText:  isLight ? '#64748b' : '#94a3b8',
        laneLabel: isLight ? '#334155' : '#cbd5e1',
        laneBg:    isLight ? 'rgba(15,23,42,0.04)' : 'rgba(255,255,255,0.025)',
        now:       isLight ? '#0f172a' : 'white'
    };

    let html = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" width="100%" height="${H}" xmlns="http://www.w3.org/2000/svg">`;

    // Banda de overlap intensity (de fondo, según count)
    overlapBand.forEach(b => {
        if (b.count < 2) return;
        const alpha = b.count >= 3 ? 0.22 : 0.12;
        const x1 = xAt(b.start);
        const x2 = xAt(b.end);
        html += `<rect x="${x1}" y="${padY - 4}" width="${x2 - x1}" height="${H - padY * 2 + 8}" fill="${COL.band}" fill-opacity="${alpha}" />`;
    });

    // Líneas de hora cada 3h
    for (let h = 0; h <= 24; h += 3) {
        const x = xAt(h * 60);
        html += `<line x1="${x}" y1="${padY - 4}" x2="${x}" y2="${H - padY - 14}" stroke="${COL.tickLine}" stroke-width="1"/>`;
        html += `<text x="${x}" y="${H - 6}" text-anchor="middle" fill="${COL.tickText}" font-size="10" font-family="Inter, sans-serif">${pad2(h)}:00</text>`;
    }

    // Lanes
    lanes.forEach((lane, i) => {
        const y = yAt(i);
        // label
        html += `<text x="${padX - 10}" y="${y + laneH * 0.7}" text-anchor="end" fill="${COL.laneLabel}" font-size="11" font-weight="600" font-family="Inter, sans-serif">${escapeHtml(lane.mkt.name)}</text>`;
        // background lane
        html += `<rect x="${padX}" y="${y}" width="${innerW}" height="${laneH}" fill="${COL.laneBg}" rx="4"/>`;
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
        html += `<line class="tl-now" x1="${x}" y1="${padY - 6}" x2="${x}" y2="${H - padY - 14}" stroke="${COL.now}" stroke-width="2" stroke-dasharray="3 3" />`;
        html += `<circle class="tl-now" cx="${x}" cy="${padY - 6}" r="3.5" fill="${COL.now}"/>`;
    }

    html += '</svg>';
    svgHost.innerHTML = html;

    // Reloj "ahora" (chip HTML) + manija (knob) sobre la línea blanca punteada
    const nowLabel = document.getElementById('timeline-now-label');
    const nowKnob = document.getElementById('timeline-now-knob');
    const inRange = userNowMins >= 0 && userNowMins <= 1440;
    const leftPct = inRange ? ((xAt(userNowMins) / W) * 100) + '%' : null;
    if (nowLabel) {
        if (inRange) {
            let hh = 0, mm = 0;
            try { const pn = TzUtils.getZonedParts(userNowMs, userTz); hh = pn.hour; mm = pn.minute; }
            catch (e) { const dn = new Date(userNowMs); hh = dn.getHours(); mm = dn.getMinutes(); }
            nowLabel.style.left = leftPct;
            nowLabel.innerHTML = `<i class="fa-regular fa-clock" aria-hidden="true"></i> ${pad2(hh)}:${pad2(mm)}`;
            nowLabel.classList.add('is-visible');
            nowLabel.setAttribute('aria-hidden', 'false');
        } else {
            nowLabel.classList.remove('is-visible');
            nowLabel.setAttribute('aria-hidden', 'true');
        }
    }
    if (nowKnob) {
        if (inRange) {
            nowKnob.style.left = leftPct;
            nowKnob.classList.add('is-visible');
            nowKnob.setAttribute('aria-hidden', 'false');
        } else {
            nowKnob.classList.remove('is-visible');
            nowKnob.setAttribute('aria-hidden', 'true');
        }
    }

    // Guardar estado para que el handler de scrub use las mismas dimensiones/lanes
    __timelineState = { lanes, W, H, padX, padY, innerW, nowMins: (userNowMins >= 0 && userNowMins <= 1440) ? userNowMins : null };

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

        // Minutos desde medianoche del usuario (snap a 1 min para un seguimiento fluido)
        const rawMins = ((vbX - state.padX) / state.innerW) * 1440;
        const mins = Math.max(0, Math.min(1440, Math.round(rawMins)));

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
        // Mientras se arrastra, la línea "ahora" (blanca + reloj) se oculta:
        // solo se ve la verde. Al soltar vuelve a aparecer.
        wrap.classList.add('is-scrubbing');
    };

    const hide = () => {
        ghost.classList.remove('is-active');
        tooltip.classList.remove('is-active');
        tooltip.setAttribute('aria-hidden', 'true');
        ghost.setAttribute('aria-hidden', 'true');
        wrap.classList.remove('is-scrubbing');
    };

    // Efecto de pulso (ripple) al aterrizar en "ahora"
    const pulseNow = (xCss) => {
        const pulse = document.getElementById('timeline-now-pulse');
        if (!pulse) return;
        pulse.style.left = xCss + 'px';
        pulse.classList.remove('animate');
        void pulse.offsetWidth; // reflow para reiniciar la animación
        pulse.classList.add('animate');
    };

    // Al soltar: la línea verde regresa con suavidad a "ahora", luego vuelve a ser blanca + pulso
    const snapBack = () => {
        const nx = nowXCss();
        if (nx == null || !ghost.classList.contains('is-active')) { hide(); return; }
        tooltip.classList.remove('is-active');
        tooltip.setAttribute('aria-hidden', 'true');
        ghost.style.transition = 'left 0.34s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.22s ease';
        ghost.style.left = nx + 'px';
        let done = false;
        const finish = () => {
            if (done) return; done = true;
            ghost.removeEventListener('transitionend', finish);
            ghost.style.transition = '';   // restaura el seguimiento rápido
            hide();                          // vuelve la línea blanca "ahora"
            pulseNow(nx);                    // efecto al aterrizar
        };
        ghost.addEventListener('transitionend', finish);
        setTimeout(finish, 420);
    };

    // Posición en CSS px de la línea "ahora" (blanca), o null si no está en rango.
    const nowXCss = () => {
        const state = __timelineState;
        if (!state || state.nowMins == null) return null;
        const rect = wrap.getBoundingClientRect();
        if (!rect.width) return null;
        const scale = state.W / rect.width;
        return (state.padX + (state.nowMins / 1440) * state.innerW) / scale;
    };
    // ¿El toque/clic empezó sobre la línea blanca? (zona de agarre amplia)
    const GRAB_TOL = 26;
    const isGrabbingNow = (clientX) => {
        const nx = nowXCss();
        if (nx == null) return false;
        const rect = wrap.getBoundingClientRect();
        return Math.abs((clientX - rect.left) - nx) <= GRAB_TOL;
    };

    // La línea blanca "ahora" se AGARRA y se arrastra: al hacerlo se transforma en
    // la línea verde (la blanca se oculta). Al soltar, vuelve a su sitio (ahora).

    // Mouse
    let __dragging = false;
    wrap.addEventListener('mousedown', (e) => {
        if (!isGrabbingNow(e.clientX)) return;   // solo si agarras la línea blanca
        __dragging = true;
        e.preventDefault();
        ghost.style.transition = '';             // seguimiento rápido al arrastrar
        updateAtClientX(e.clientX);
    });
    window.addEventListener('mousemove', (e) => {
        if (__dragging) updateAtClientX(e.clientX);
    });
    window.addEventListener('mouseup', () => {
        if (__dragging) { __dragging = false; snapBack(); }
    });
    // Pista visual: cursor "grab" al acercarse a la línea blanca (sin mostrar la verde).
    wrap.addEventListener('mousemove', (e) => {
        if (__dragging) return;
        wrap.classList.toggle('near-now', isGrabbingNow(e.clientX));
    });
    wrap.addEventListener('mouseleave', () => wrap.classList.remove('near-now'));

    // Touch (móvil): igual, solo si el toque empieza sobre la línea blanca.
    let __touchDragging = false;
    wrap.addEventListener('touchstart', (e) => {
        if (e.touches[0] && isGrabbingNow(e.touches[0].clientX)) {
            __touchDragging = true;
            ghost.style.transition = '';          // seguimiento rápido al arrastrar
            updateAtClientX(e.touches[0].clientX);
        }
    }, { passive: true });
    wrap.addEventListener('touchmove', (e) => {
        if (__touchDragging && e.touches[0]) {
            e.preventDefault();               // congela el scroll vertical solo al arrastrar
            updateAtClientX(e.touches[0].clientX);
        }
    }, { passive: false });
    const endTouch = () => { if (__touchDragging) { __touchDragging = false; snapBack(); } };
    wrap.addEventListener('touchend', endTouch);
    wrap.addEventListener('touchcancel', endTouch);

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
    const opts = { hour: '2-digit', minute: '2-digit', hour12: false };
    if (userTimezoneOverride) opts.timeZone = userTimezoneOverride;
    let formatted;
    try {
        formatted = new Intl.DateTimeFormat(undefined, opts).format(now);
    } catch (e) {
        formatted = now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
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
            const opts2 = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/New_York' };
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
            <div class="card-header crypto-card-header-icon-only">
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
        </div>
    `;
}

let __cryptoInitialRender = false;

// ============================================================
// Relojes clave de cripto (funding, cierre diario, CME) — todo calculable
// ============================================================

// Próximo funding de perpetuos: cada 8h UTC (00:00 / 08:00 / 16:00)
function nextFundingMs(now) {
    const d = new Date(now);
    for (const mk of [0, 8, 16]) {
        const t = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), mk, 0, 0);
        if (t > now) return t;
    }
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1, 0, 0, 0);
}
// Próximo cierre de vela diaria: 00:00 UTC
function nextDailyCloseMs(now) {
    const d = new Date(now);
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 1, 0, 0, 0);
}
// ¿Están abiertos los futuros de BTC en CME? Dom 18:00 → Vie 17:00 ET,
// con mantenimiento diario 17:00–18:00 ET.
function isCMEOpen(etParts) {
    const wd = new Date(Date.UTC(etParts.year, etParts.month - 1, etParts.day, 12)).getUTCDay();
    const h = etParts.hour;
    if (wd === 6) return false;                 // sábado
    if (wd === 0 && h < 18) return false;       // domingo antes de 18:00
    if (wd === 5 && h >= 17) return false;      // viernes desde 17:00
    if (wd >= 1 && wd <= 4 && h === 17) return false; // mantenimiento 17:00–18:00
    return true;
}

function renderCryptoClocks(nowMs) {
    const el = document.getElementById('crypto-clocks');
    if (!el) return;
    const now = nowMs ?? Date.now();
    const es = currentLang !== 'en';
    const tz = getEffectiveUserTimezone();
    const fmtT = (ms) => {
        try { return new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }).format(new Date(ms)); }
        catch (e) { return '--:--'; }
    };
    const cd = (ms) => diffToFutureCountdown(now, new Date(ms)) || '--';

    const fund = nextFundingMs(now);
    const daily = nextDailyCloseMs(now);
    const etp = TzUtils.getZonedParts(now, 'America/New_York');
    const cmeOpen = isCMEOpen(etp);

    const rows = [
        {
            icon: 'fa-arrows-rotate', cls: 'cc-fund',
            name: es ? 'Funding (perpetuos)' : 'Funding (perps)',
            note: es ? 'Cada 8h · Binance/Bybit/OKX' : 'Every 8h · Binance/Bybit/OKX',
            main: `<b>${escapeHtml(cd(fund))}</b>`,
            sub: `${fmtT(fund)} · ${new Date(fund).getUTCHours().toString().padStart(2, '0')}:00 UTC`
        },
        {
            icon: 'fa-chart-column', cls: 'cc-daily',
            name: es ? 'Cierre vela diaria' : 'Daily candle close',
            note: '00:00 UTC',
            main: `<b>${escapeHtml(cd(daily))}</b>`,
            sub: fmtT(daily)
        },
        {
            icon: 'fa-building-columns', cls: 'cc-cme',
            name: es ? 'Futuros BTC (CME)' : 'BTC Futures (CME)',
            note: es ? 'Dom 18:00 → Vie 17:00 ET' : 'Sun 6pm → Fri 5pm ET',
            main: cmeOpen
                ? `<span class="cc-open">${es ? 'ABIERTO' : 'OPEN'}</span>`
                : `<span class="cc-closed">${es ? 'CERRADO' : 'CLOSED'}</span>`,
            sub: cmeOpen ? '' : (es ? 'posible gap CME al reabrir' : 'possible CME gap on reopen')
        }
    ];

    const title = es ? 'Relojes clave' : 'Key clocks';
    el.innerHTML = `<h3 class="cc-title">${title}</h3>` + rows.map(r => `
        <div class="cc-row ${r.cls}">
            <div class="cc-icon"><i class="fa-solid ${r.icon}" aria-hidden="true"></i></div>
            <div class="cc-main">
                <div class="cc-name">${escapeHtml(r.name)}</div>
                <div class="cc-note">${escapeHtml(r.note)}</div>
            </div>
            <div class="cc-val">${r.main}${r.sub ? `<span>${escapeHtml(r.sub)}</span>` : ''}</div>
        </div>
    `).join('');
}

// Próximos eventos cripto calculables (sin API). El halving de BTC es el principal.
// Fecha estimada del próximo halving (~bloque 1.050.000, abril 2028).
const NEXT_BTC_HALVING_MS = Date.UTC(2028, 3, 20, 0, 0, 0);

function renderCryptoEvents(nowMs) {
    const el = document.getElementById('crypto-events');
    if (!el) return;
    const now = nowMs ?? Date.now();
    const es = currentLang !== 'en';

    const events = [
        {
            icon: 'fa-brands fa-bitcoin',
            name: es ? 'Halving de Bitcoin' : 'Bitcoin Halving',
            note: es ? 'Reduce a la mitad la emisión de BTC · estimado' : 'Halves BTC issuance · estimated',
            ms: NEXT_BTC_HALVING_MS
        }
    ];

    const fmtDays = (ms) => {
        const days = Math.max(0, Math.round((ms - now) / 86400000));
        if (days >= 365) {
            const y = Math.floor(days / 365);
            const rem = days % 365;
            const mo = Math.round(rem / 30);
            return es ? `~${y} a ${mo} m` : `~${y}y ${mo}m`;
        }
        if (days >= 60) return es ? `~${Math.round(days / 30)} meses` : `~${Math.round(days / 30)} months`;
        return es ? `~${days} días` : `~${days} days`;
    };

    const title = es ? 'Eventos cripto' : 'Crypto events';
    el.innerHTML =
        `<h3 class="crypto-events-title">${escapeHtml(title)}</h3>` +
        events.map(ev => {
            const dstr = (() => {
                try { return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', timeZone: getEffectiveUserTimezone() }).format(new Date(ev.ms)); }
                catch (e) { return ''; }
            })();
            return `
                <div class="crypto-event">
                    <div class="ce-icon"><i class="${ev.icon}" aria-hidden="true"></i></div>
                    <div class="ce-main">
                        <div class="ce-name">${escapeHtml(ev.name)}</div>
                        <div class="ce-note">${escapeHtml(ev.note)}</div>
                    </div>
                    <div class="ce-cd">
                        <b>${escapeHtml(fmtDays(ev.ms))}</b>
                        <span>≈ ${escapeHtml(dstr)}</span>
                    </div>
                </div>`;
        }).join('');
}

function renderCryptoCard(nowMs) {
    const container = document.getElementById('crypto-grid');
    if (!container) return;
    try { renderCryptoClocks(nowMs); } catch (e) { /* ignore */ }
    try { renderCryptoEvents(nowMs); } catch (e) { /* ignore */ }

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

    // Hora NY (referencia institucional para el cripto) en formato 24h militar
    try {
        const opts = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/New_York' };
        const nyTime = new Intl.DateTimeFormat(undefined, opts).format(new Date(nowMs));
        setText(card, 'crypto-ny-time', nyTime);
    } catch (e) { /* ignore */ }
}

// ============================================================
// Eventos macro (Noticias) — fechas de NFP, FOMC, CPI, CME
// ============================================================

// Fechas oficiales del FOMC (publicadas por la Fed). Mantener actualizado.
const FOMC_DATES = [
    { y: 2025, m: 1,  d: 29 }, { y: 2025, m: 3,  d: 19 },
    { y: 2025, m: 5,  d: 7  }, { y: 2025, m: 6,  d: 18 },
    { y: 2025, m: 7,  d: 30 }, { y: 2025, m: 9,  d: 17 },
    { y: 2025, m: 10, d: 29 }, { y: 2025, m: 12, d: 10 },
    { y: 2026, m: 1,  d: 28 }, { y: 2026, m: 3,  d: 18 },
    { y: 2026, m: 4,  d: 29 }, { y: 2026, m: 6,  d: 17 },
    { y: 2026, m: 7,  d: 29 }, { y: 2026, m: 9,  d: 16 },
    { y: 2026, m: 10, d: 28 }, { y: 2026, m: 12, d: 9  }
];

// Helper genérico: a partir de un weekday y posición, devuelve el día del mes
// Reutiliza nthWeekdayOfMonth ya existente.

// Construye un instante UTC desde una fecha+hora ET
function instantInET(year, month, day, hour, minute) {
    return TzUtils.zonedTimeToUtc({
        year, month, day, hour, minute, second: 0
    }, 'America/New_York');
}

// Próximo NFP: primer viernes del mes a las 8:30 AM ET
function findNextNFP(nowMs) {
    const now = new Date(nowMs);
    const nyParts = TzUtils.getZonedParts(nowMs, 'America/New_York');
    let y = nyParts.year, m = nyParts.month;
    for (let i = 0; i < 13; i++) {
        const day = nthWeekdayOfMonth(y, m, 5, 1); // 5 = viernes
        const instant = instantInET(y, m, day, 8, 30);
        if (instant.getTime() > nowMs) return { date: instant, exact: true };
        m++; if (m > 12) { m = 1; y++; }
    }
    return null;
}

// Próximo FOMC: lookup en la tabla
function findNextFOMC(nowMs) {
    for (const f of FOMC_DATES) {
        const instant = instantInET(f.y, f.m, f.d, 14, 0);
        if (instant.getTime() > nowMs) return { date: instant, exact: true };
    }
    return null;
}

// Próximo CPI: 2º martes del mes a las 8:30 AM ET (aproximación)
function findNextCPI(nowMs) {
    const nyParts = TzUtils.getZonedParts(nowMs, 'America/New_York');
    let y = nyParts.year, m = nyParts.month;
    for (let i = 0; i < 13; i++) {
        const day = nthWeekdayOfMonth(y, m, 2, 2); // 2 = martes, n=2 (segundo martes)
        const instant = instantInET(y, m, day, 8, 30);
        if (instant.getTime() > nowMs) return { date: instant, exact: false };
        m++; if (m > 12) { m = 1; y++; }
    }
    return null;
}

// Próximo cierre mensual de futuros CME: último viernes del mes a las 16:00 ET
function findNextCME(nowMs) {
    const nyParts = TzUtils.getZonedParts(nowMs, 'America/New_York');
    let y = nyParts.year, m = nyParts.month;
    for (let i = 0; i < 13; i++) {
        const day = nthWeekdayOfMonth(y, m, 5, -1); // último viernes
        const instant = instantInET(y, m, day, 16, 0);
        if (instant.getTime() > nowMs) return { date: instant, exact: true };
        m++; if (m > 12) { m = 1; y++; }
    }
    return null;
}

// --- Helpers de días hábiles (aproximación: ignora feriados) ---
function isWeekdayYMD(year, month, day) {
    const dow = new Date(Date.UTC(year, month - 1, day, 12)).getUTCDay();
    return dow >= 1 && dow <= 5;
}
function nthBusinessDayOfMonth(year, month, n) {
    const last = new Date(Date.UTC(year, month, 0, 12)).getUTCDate();
    let count = 0;
    for (let day = 1; day <= last; day++) {
        if (isWeekdayYMD(year, month, day)) { count++; if (count === n) return day; }
    }
    return last;
}
function lastBusinessDayOfMonth(year, month) {
    const last = new Date(Date.UTC(year, month, 0, 12)).getUTCDate();
    for (let day = last; day >= 1; day--) if (isWeekdayYMD(year, month, day)) return day;
    return last;
}
function businessDayOnOrAfter(year, month, target) {
    const last = new Date(Date.UTC(year, month, 0, 12)).getUTCDate();
    for (let day = target; day <= last; day++) if (isWeekdayYMD(year, month, day)) return day;
    return last;
}

// Próxima ocurrencia mensual: dayResolver(y,m) decide el día; hora en ET.
function findNextMonthlyET(nowMs, dayResolver, hour, minute, exact) {
    const p = TzUtils.getZonedParts(nowMs, 'America/New_York');
    let y = p.year, m = p.month;
    for (let i = 0; i < 13; i++) {
        const day = dayResolver(y, m);
        if (day) {
            const inst = instantInET(y, m, day, hour, minute);
            if (inst.getTime() > nowMs) return { date: inst, exact };
        }
        m++; if (m > 12) { m = 1; y++; }
    }
    return null;
}

// Core PCE: ~último día hábil del mes · 8:30 ET (aprox · inflación preferida de la Fed)
function findNextPCE(nowMs)    { return findNextMonthlyET(nowMs, (y, m) => lastBusinessDayOfMonth(y, m), 8, 30, false); }
// Ventas minoristas: ~mediados de mes (día hábil desde el 16) · 8:30 ET (aprox)
function findNextRetail(nowMs) { return findNextMonthlyET(nowMs, (y, m) => businessDayOnOrAfter(y, m, 16), 8, 30, false); }
// PPI: ~mediados de mes (día hábil desde el 13) · 8:30 ET (aprox)
function findNextPPI(nowMs)    { return findNextMonthlyET(nowMs, (y, m) => businessDayOnOrAfter(y, m, 13), 8, 30, false); }
// ISM Manufacturero: 1er día hábil del mes · 10:00 ET
function findNextISMmfg(nowMs) { return findNextMonthlyET(nowMs, (y, m) => nthBusinessDayOfMonth(y, m, 1), 10, 0, false); }
// ISM Servicios: ~3er día hábil del mes · 10:00 ET
function findNextISMsvc(nowMs) { return findNextMonthlyET(nowMs, (y, m) => nthBusinessDayOfMonth(y, m, 3), 10, 0, false); }
// Peticiones de desempleo: cada jueves · 8:30 ET
function findNextJobless(nowMs) {
    const p = TzUtils.getZonedParts(nowMs, 'America/New_York');
    let ymd = { year: p.year, month: p.month, day: p.day };
    for (let i = 0; i < 10; i++) {
        const dow = new Date(Date.UTC(ymd.year, ymd.month - 1, ymd.day, 12)).getUTCDay();
        if (dow === 4) {
            const inst = instantInET(ymd.year, ymd.month, ymd.day, 8, 30);
            if (inst.getTime() > nowMs) return { date: inst, exact: true };
        }
        ymd = TzUtils.addDaysYMD(ymd, 1);
    }
    return null;
}

// Formatea una fecha (instante UTC) en hora local del usuario
function formatNewsDate(date) {
    const tz = getEffectiveUserTimezone();
    const optsDate = { day: 'numeric', month: 'short', year: 'numeric', timeZone: tz };
    const optsTime = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz };
    try {
        const dateStr = new Intl.DateTimeFormat(undefined, optsDate).format(date);
        const timeStr = new Intl.DateTimeFormat(undefined, optsTime).format(date);
        return `${dateStr} · ${timeStr}`;
    } catch (e) {
        return date.toLocaleString();
    }
}

// Tiempo entre ahora y un instante futuro
function diffToFutureCountdown(nowMs, targetDate) {
    const diffMs = targetDate.getTime() - nowMs;
    if (diffMs <= 0) return null;
    const totalMin = Math.round(diffMs / 60000);
    return formatCountdown(totalMin);
}

const NEWS_EVENTS = [
    { id: 'fomc',    icon: 'fa-gavel',          impactKey: 'news.impact_max',  finder: findNextFOMC,   exact: true,  badgeClass: 'impact-max' },
    { id: 'cpi',     icon: 'fa-chart-line',     impactKey: 'news.impact_max',  finder: findNextCPI,    exact: false, badgeClass: 'impact-max' },
    { id: 'pce',     icon: 'fa-fire',           impactKey: 'news.impact_max',  finder: findNextPCE,    exact: false, badgeClass: 'impact-max' },
    { id: 'nfp',     icon: 'fa-briefcase',      impactKey: 'news.impact_high', finder: findNextNFP,    exact: true,  badgeClass: 'impact-high' },
    { id: 'retail',  icon: 'fa-cart-shopping',  impactKey: 'news.impact_high', finder: findNextRetail, exact: false, badgeClass: 'impact-high' },
    { id: 'ppi',     icon: 'fa-industry',       impactKey: 'news.impact_high', finder: findNextPPI,    exact: false, badgeClass: 'impact-high' },
    { id: 'ism_svc', icon: 'fa-bell-concierge', impactKey: 'news.impact_high', finder: findNextISMsvc, exact: false, badgeClass: 'impact-high' },
    { id: 'ism_mfg', icon: 'fa-gears',          impactKey: 'news.impact_high', finder: findNextISMmfg, exact: false, badgeClass: 'impact-high' },
    { id: 'jobless', icon: 'fa-user-clock',     impactKey: 'news.impact_med',  finder: findNextJobless,exact: true,  badgeClass: 'impact-med' },
    { id: 'cme',     icon: 'fa-calendar-check', impactKey: 'news.impact_high', finder: findNextCME,    exact: true,  badgeClass: 'impact-high' }
];

let __newsInitialRender = false;
// ============================================================
// Calendario económico EN VIVO (Netlify Function -> ForexFactory)
// ============================================================
let __liveCal = { events: [], fetchedAt: 0, loading: false, error: false };
const LIVE_CAL_TTL = 10 * 60 * 1000;

function liveCalUrl() {
    try {
        // En la app Android el origen es appassets.androidplatform.net:
        // hay que llamar a la función por su URL absoluta de Netlify.
        if (location.hostname.endsWith('androidplatform.net')) {
            return 'https://horario-sesion.netlify.app/.netlify/functions/calendar';
        }
    } catch (e) { /* ignore */ }
    return '/.netlify/functions/calendar';
}

async function fetchLiveCalendar(force) {
    const now = Date.now();
    if (!force && __liveCal.events.length && (now - __liveCal.fetchedAt) < LIVE_CAL_TTL) return;
    if (__liveCal.loading) return;
    __liveCal.loading = true;
    try {
        const res = await fetch(liveCalUrl(), { cache: 'no-store' });
        if (!res.ok) throw new Error('http ' + res.status);
        const data = await res.json();
        __liveCal.events = Array.isArray(data.events) ? data.events : [];
        __liveCal.fetchedAt = now;
        __liveCal.error = false;
    } catch (e) {
        __liveCal.error = true;
    } finally {
        __liveCal.loading = false;
        try { renderLiveCalendar(Date.now()); } catch (e) { /* ignore */ }
    }
}

function liveLabels() {
    const es = currentLang !== 'en';
    return es
        ? { week: 'Esta semana', guide: 'Guía de eventos clave', updating: 'Actualizando…', err: 'No se pudo cargar el calendario', empty: 'Sin eventos esta semana — el calendario se renueva cada lunes. Mira la guía de eventos clave abajo.', prev: 'prev', fc: 'est.', act: 'real', risk: 'Ventana de riesgo', done: 'publicado', notify: 'Avísame (15 min antes)', notifyOn: 'Recordatorio activado · toca para quitar' }
        : { week: 'This week', guide: 'Key events guide', updating: 'Updating…', err: 'Could not load calendar', empty: 'No events this week — the calendar refreshes every Monday. See the key events guide below.', prev: 'prev', fc: 'est.', act: 'act', risk: 'Risk window', done: 'released', notify: 'Notify me (15 min before)', notifyOn: 'Reminder on · tap to remove' };
}

let __newsCurFilter = (function () { try { return localStorage.getItem('news_cur_filter') || 'usd'; } catch (e) { return 'usd'; } })();
let __newsLiveBound = false;

function bindNewsLive() {
    if (__newsLiveBound) return;
    const wrap = document.getElementById('news-live');
    const filt = document.getElementById('news-live-filter');
    if (wrap) {
        wrap.addEventListener('click', (ev) => {
            const btn = ev.target.closest && ev.target.closest('.lv-bell');
            if (!btn) return;
            ev.stopPropagation();
            toggleEventReminder(btn.getAttribute('data-ev-key'));
        });
    }
    if (filt) {
        filt.addEventListener('click', (ev) => {
            const chip = ev.target.closest && ev.target.closest('.nlf-chip');
            if (!chip) return;
            __newsCurFilter = chip.getAttribute('data-cf') || 'usd';
            try { localStorage.setItem('news_cur_filter', __newsCurFilter); } catch (e) {}
            renderLiveCalendar(Date.now());
        });
    }
    __newsLiveBound = true;
}

function renderLiveCalendar(nowMs) {
    const wrap = document.getElementById('news-live');
    if (!wrap) return;
    bindNewsLive();
    const L = liveLabels();
    const titleEl = document.getElementById('news-live-title');
    const guideEl = document.getElementById('news-guide-title');
    const statusEl = document.getElementById('news-live-status');
    if (titleEl) titleEl.textContent = L.week;
    if (guideEl) guideEl.textContent = L.guide;

    // Chips de filtro de divisa
    const filtEl = document.getElementById('news-live-filter');
    if (filtEl) {
        const allLabel = (currentLang !== 'en') ? 'Todas' : 'All';
        filtEl.innerHTML =
            `<button class="nlf-chip ${__newsCurFilter === 'usd' ? 'is-on' : ''}" data-cf="usd">USD</button>` +
            `<button class="nlf-chip ${__newsCurFilter === 'all' ? 'is-on' : ''}" data-cf="all">${escapeHtml(allLabel)}</button>`;
    }

    if (__liveCal.loading && !__liveCal.events.length) {
        wrap.innerHTML = `<div class="news-live-msg">${escapeHtml(L.updating)}</div>`;
        return;
    }
    if (__liveCal.error && !__liveCal.events.length) {
        wrap.innerHTML = `<div class="news-live-msg">${escapeHtml(L.err)}</div>`;
        return;
    }

    const now = nowMs ?? Date.now();
    // Ventana: eventos de las últimas ~40h (ya publicados, con resultado) + todos los futuros.
    // Así la sección es útil incluso a fin de semana (muestra lo que movió el mercado).
    const items = __liveCal.events
        .map(e => ({ ...e, ms: Date.parse(e.date) }))
        .filter(e => Number.isFinite(e.ms))
        .filter(e => e.ms > now - 40 * 60 * 60 * 1000)
        .filter(e => __newsCurFilter === 'all' ? true : e.currency === 'USD')
        .sort((a, b) => a.ms - b.ms)
        .slice(0, 16);

    if (!items.length) {
        wrap.innerHTML = `<div class="news-live-msg">${escapeHtml(L.empty)}</div>`;
        return;
    }

    wrap.innerHTML = items.map(e => {
        const d = new Date(e.ms);
        const when = formatNewsDate(d);
        const isPast = e.ms <= now;
        const cd = isPast ? null : diffToFutureCountdown(now, d);
        const within15 = !isPast && (e.ms - now) <= 15 * 60 * 1000;
        const imp = e.impact === 'High' ? 'live-high' : 'live-med';
        const vals = [];
        if (e.actual) vals.push(`<span class="lv-act">${escapeHtml(L.act)}: <b>${escapeHtml(e.actual)}</b></span>`);
        if (e.forecast) vals.push(`<span class="lv-fc">${escapeHtml(L.fc)}: ${escapeHtml(e.forecast)}</span>`);
        if (e.previous) vals.push(`<span class="lv-prev">${escapeHtml(L.prev)}: ${escapeHtml(e.previous)}</span>`);
        let meta;
        if (within15) meta = ` · <span class="lv-risk">${escapeHtml(L.risk)}</span>`;
        else if (cd) meta = ` · <b>${escapeHtml(cd)}</b>`;
        else meta = ` · <span class="lv-done">${escapeHtml(L.done)}</span>`;
        const key = e.currency + '@' + e.date;
        const on = hasEventReminder(key);
        const bell = isPast ? '' :
            `<button class="lv-bell ${on ? 'is-on' : ''}" data-ev-key="${escapeHtml(key)}" aria-label="${escapeHtml(L.notify)}" title="${escapeHtml(on ? L.notifyOn : L.notify)}"><i class="fa-${on ? 'solid' : 'regular'} fa-bell"></i></button>`;
        return `
            <div class="news-live-row ${imp} ${within15 ? 'is-now' : ''} ${isPast ? 'is-past' : ''}">
                <span class="lv-dot"></span>
                <div class="lv-main">
                    <div class="lv-top">
                        <span class="lv-cur">${escapeHtml(e.currency)}</span>
                        <span class="lv-title">${escapeHtml(e.title)}</span>
                    </div>
                    <div class="lv-when">${escapeHtml(when)}${meta}</div>
                </div>
                <div class="lv-vals">${vals.join('')}</div>
                ${bell}
            </div>`;
    }).join('');

    if (statusEl) {
        let upd = '';
        if (__liveCal.fetchedAt) {
            try { upd = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(__liveCal.fetchedAt)); } catch (e) {}
        }
        statusEl.textContent = upd ? `· ${upd}` : '';
    }
}

function renderNewsSection(nowMs) {
    const grid = document.getElementById('news-grid');
    if (!grid) return;

    // Render inicial: estructura
    if (!__newsInitialRender) {
        grid.innerHTML = NEWS_EVENTS.map(ev => `
            <div class="news-card ${ev.badgeClass}" data-news-id="${ev.id}">
                <div class="news-card-header">
                    <div class="news-title">
                        <i class="fa-solid ${ev.icon}" aria-hidden="true"></i>
                        <span data-i18n="news.events.${ev.id}.name">${escapeHtml(ev.id.toUpperCase())}</span>
                    </div>
                    <span class="news-impact" data-i18n="${ev.impactKey}"></span>
                </div>
                <div class="news-long" data-i18n="news.events.${ev.id}.long"></div>
                <div class="news-when">
                    <i class="fa-regular fa-clock" aria-hidden="true"></i>
                    <span data-i18n="news.events.${ev.id}.when"></span>
                </div>
                <div class="news-next-row">
                    <span class="news-next-label" data-field="news-next-label-${ev.id}"></span>
                    <span class="news-next-date tabular-nums" data-field="news-next-date-${ev.id}"></span>
                </div>
                <div class="news-countdown" data-field="news-countdown-${ev.id}"></div>
                <div class="news-why">
                    <strong data-i18n="news.why">Impacto en el mercado</strong>
                    <span data-i18n="news.events.${ev.id}.why"></span>
                </div>
            </div>
        `).join('');

        // Disclaimer al final
        const disclaimer = document.createElement('div');
        disclaimer.className = 'news-disclaimer';
        disclaimer.setAttribute('data-i18n', 'news.disclaimer');
        grid.appendChild(disclaimer);

        translatePage(grid);
        __newsInitialRender = true;
    }

    // Update dinámico: próxima fecha + countdown + ordenar por proximidad
    // 1) Calcular fechas de cada evento
    const computed = NEWS_EVENTS.map(ev => ({ ev, next: ev.finder(nowMs) }));

    // 2) Ordenar por fecha más próxima (sin fecha = al final)
    const sorted = computed.slice().sort((a, b) => {
        if (!a.next && !b.next) return 0;
        if (!a.next) return 1;
        if (!b.next) return -1;
        return a.next.date.getTime() - b.next.date.getTime();
    });

    // 3) Aplicar order CSS a cada card según su posición ordenada (sin mover DOM)
    sorted.forEach((entry, idx) => {
        const card = grid.querySelector(`[data-news-id="${entry.ev.id}"]`);
        if (!card) return;
        card.style.order = idx;

        const labelKey = entry.ev.exact ? 'news.next' : 'news.next_approx';
        setText(card, `news-next-label-${entry.ev.id}`, t(labelKey));

        if (!entry.next) {
            setText(card, `news-next-date-${entry.ev.id}`, '—');
            setText(card, `news-countdown-${entry.ev.id}`, '');
            return;
        }
        setText(card, `news-next-date-${entry.ev.id}`, formatNewsDate(entry.next.date));
        const cd = diffToFutureCountdown(nowMs, entry.next.date);
        const cdEl = card.querySelector(`[data-field="news-countdown-${entry.ev.id}"]`);
        if (cdEl) cdEl.textContent = cd ? `· ${cd}` : '';
    });

    // El disclaimer se mantiene siempre al final con un order alto
    const disclaimerEl = grid.querySelector('.news-disclaimer');
    if (disclaimerEl) disclaimerEl.style.order = 999;

    // Agenda en vivo (API): carga si toca y refresca countdowns en cada tick
    try { fetchLiveCalendar(false); renderLiveCalendar(nowMs); } catch (e) { /* ignore */ }
}

// ============================================================
// Sistema de notificaciones (presets + alarmas custom)
// ============================================================
const DEFAULT_NOTIF_STATE = {
    enabled: false,
    presets: {
        fomc: false, nfp: false, cpi: false, cme: false,
        openNasdaq: false, openNY: false, openLondon: false,
        openTokyo: false, openSydney: false, goldenHour: false
    },
    custom: [], // [{ id, time: 'HH:MM', message, days: [0..6], enabled: true }]
    eventReminders: [] // [{ key, title, body, fireAt }] recordatorios puntuales de eventos
};

let notificationState = JSON.parse(JSON.stringify(DEFAULT_NOTIF_STATE));
let __notifTimers = [];
let __editingAlarmId = null; // null = modo "añadir"; id existente = modo "editar"
const NOTIF_STORAGE_KEY = 'notif_settings_v1';

function loadNotificationState() {
    try {
        const raw = localStorage.getItem(NOTIF_STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            notificationState = {
                enabled: !!parsed.enabled,
                presets: { ...DEFAULT_NOTIF_STATE.presets, ...(parsed.presets || {}) },
                custom: Array.isArray(parsed.custom) ? parsed.custom : [],
                eventReminders: Array.isArray(parsed.eventReminders) ? parsed.eventReminders : []
            };
        }
    } catch (e) { /* ignore */ }
}

function saveNotificationState() {
    try { localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(notificationState)); }
    catch (e) { /* ignore */ }
}

// Puente nativo (app Android): cuando existe, las notificaciones se muestran y
// programan con el sistema Android (AlarmManager + NotificationManager), de modo
// que disparan aunque la app esté cerrada. En la web normal se usa Notification API.
function __hasNativeNotify() {
    return typeof window !== 'undefined'
        && window.AndroidNotify
        && typeof window.AndroidNotify.setAlarms === 'function';
}

function notifSupported() {
    if (__hasNativeNotify()) return true;
    return typeof window !== 'undefined' && 'Notification' in window;
}

function notifPermission() {
    if (__hasNativeNotify()) {
        try { return window.AndroidNotify.getPermission(); } catch (e) { return 'default'; }
    }
    return ('Notification' in window) ? Notification.permission : 'denied';
}

let __notifPermPending = null;
if (typeof window !== 'undefined') {
    window.__onNotifPermission = function(result) {
        if (__notifPermPending) { __notifPermPending(result); __notifPermPending = null; }
    };
}

async function ensureNotificationPermission() {
    if (__hasNativeNotify()) {
        const cur = notifPermission();
        if (cur === 'granted') return 'granted';
        return new Promise((resolve) => {
            __notifPermPending = resolve;
            try { window.AndroidNotify.requestPermission(); }
            catch (e) { __notifPermPending = null; resolve('denied'); }
        });
    }
    if (!notifSupported()) return 'unsupported';
    if (Notification.permission === 'granted') return 'granted';
    if (Notification.permission === 'denied') return 'denied';
    try {
        const result = await Notification.requestPermission();
        return result;
    } catch (e) { return 'denied'; }
}

function showNotification(title, body) {
    // En la app nativa las notificaciones las dispara Android (AlarmManager),
    // no este código; aquí solo cubrimos el caso de navegador web.
    if (__hasNativeNotify()) return;
    if (!notifSupported() || Notification.permission !== 'granted') return;
    try {
        const n = new Notification(title, {
            body: body || '',
            icon: 'icons/icon-192.svg',
            badge: 'icons/icon-192.svg',
            tag: 'sesion-horarios-' + Date.now(),
            silent: false
        });

        // Click sobre la notificación → enfoca la pestaña/ventana de la app y cierra el aviso.
        // Si la pestaña está minimizada o en otra ventana, la trae al frente.
        n.onclick = () => {
            try {
                if (typeof window.focus === 'function') window.focus();
                if (typeof window.parent === 'object' && window.parent && window.parent.focus) window.parent.focus();
            } catch (e) { /* ignore */ }
            try { n.close(); } catch (e) { /* ignore */ }
        };

        // Auto-cerrar después de 8s para no llenar el centro de notificaciones
        setTimeout(() => { try { n.close(); } catch (e) {} }, 8000);
    } catch (e) { console.warn('Notification error:', e); }
}

// Próxima fecha (instante UTC) de un preset
function findNextPresetEvent(presetId, nowMs) {
    const FIVE_MIN = 5 * 60 * 1000;
    switch (presetId) {
        case 'fomc': {
            const r = findNextFOMC(nowMs);
            return r ? { fireAt: r.date.getTime() - FIVE_MIN, title: 'FOMC', body: t('notifs.preset_msg.fomc') } : null;
        }
        case 'nfp': {
            const r = findNextNFP(nowMs);
            return r ? { fireAt: r.date.getTime() - FIVE_MIN, title: 'NFP', body: t('notifs.preset_msg.nfp') } : null;
        }
        case 'cpi': {
            const r = findNextCPI(nowMs);
            return r ? { fireAt: r.date.getTime() - FIVE_MIN, title: 'CPI', body: t('notifs.preset_msg.cpi') } : null;
        }
        case 'cme': {
            const r = findNextCME(nowMs);
            return r ? { fireAt: r.date.getTime() - FIVE_MIN, title: 'CME', body: t('notifs.preset_msg.cme') } : null;
        }
        case 'goldenHour': {
            const r = findNextCryptoHighWindow(nowMs);
            if (!r || r.type !== 'opens') return null;
            const fireAt = nowMs + r.minutes * 60 * 1000;
            return { fireAt, title: 'Golden Hour', body: t('notifs.preset_msg.goldenHour') };
        }
        case 'openNasdaq': return findNextMarketOpenForPreset('nasdaq', nowMs, 'openNasdaq');
        case 'openNY':     return findNextMarketOpenForPreset('ny',     nowMs, 'openNY');
        case 'openLondon': return findNextMarketOpenForPreset('london', nowMs, 'openLondon');
        case 'openTokyo':  return findNextMarketOpenForPreset('tokyo',  nowMs, 'openTokyo');
        case 'openSydney': return findNextMarketOpenForPreset('sydney', nowMs, 'openSydney');
    }
    return null;
}

function findNextMarketOpenForPreset(mktId, nowMs, presetKey) {
    const all = stockMarkets.concat(forexMarkets);
    const mkt = all.find(m => m.id === mktId);
    if (!mkt) return null;
    const ev = findNextMarketEvent(mkt, nowMs);
    if (!ev || ev.type !== 'opens') return null;
    const fireAt = nowMs + ev.minutes * 60 * 1000;
    return { fireAt, title: mkt.name, body: t('notifs.preset_msg.' + presetKey) };
}

// Próxima ocurrencia de una alarma personalizada (en hora local del navegador)
function nextCustomAlarmTime(alarm, fromMs) {
    if (!alarm || !alarm.time) return null;
    const [hh, mm] = alarm.time.split(':').map(Number);
    if (!Number.isFinite(hh) || !Number.isFinite(mm)) return null;
    const days = Array.isArray(alarm.days) && alarm.days.length > 0 ? alarm.days : [0, 1, 2, 3, 4, 5, 6];

    const from = new Date(fromMs);
    for (let offset = 0; offset < 8; offset++) {
        const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + offset, hh, mm, 0, 0);
        if (!days.includes(d.getDay())) continue;
        if (d.getTime() > fromMs) return d.getTime();
    }
    return null;
}

function clearAllNotifTimers() {
    __notifTimers.forEach(id => clearTimeout(id));
    __notifTimers = [];
}

function scheduleOneNotif(delay, title, body, onFireExtra) {
    // Cap a ~24 días (límite de setTimeout int32)
    if (delay < 0 || delay > 2147483647) return;
    const id = setTimeout(() => {
        showNotification(title, body);
        if (onFireExtra) try { onFireExtra(); } catch (e) {}
        // Reagendar el ciclo completo para captar próximas ocurrencias
        rescheduleAllNotifications();
    }, delay);
    __notifTimers.push(id);
}

function pruneEventReminders(now) {
    if (!Array.isArray(notificationState.eventReminders)) { notificationState.eventReminders = []; return; }
    const before = notificationState.eventReminders.length;
    // Conserva hasta 1h después de la hora de aviso, luego descarta
    notificationState.eventReminders = notificationState.eventReminders.filter(r => r && r.fireAt > now - 60 * 60 * 1000);
    if (notificationState.eventReminders.length !== before) saveNotificationState();
}

function rescheduleAllNotifications() {
    clearAllNotifTimers();
    // Basta con tener permiso: los recordatorios de evento son opt-in explícito
    // y deben funcionar aunque el interruptor general esté apagado.
    const granted = notifSupported() && notifPermission() === 'granted';
    if (!granted) {
        if (__hasNativeNotify()) { try { window.AndroidNotify.setAlarms('[]'); } catch (e) {} }
        updateNotifTriggerVisual();
        return;
    }

    const now = Date.now();
    pruneEventReminders(now);

    // App nativa Android: delegamos la programación al sistema (dispara en segundo plano).
    if (__hasNativeNotify()) {
        const alarms = [];
        if (notificationState.enabled) {
            Object.keys(notificationState.presets).forEach(presetId => {
                if (!notificationState.presets[presetId]) return;
                const evt = findNextPresetEvent(presetId, now);
                if (!evt || !(evt.fireAt > now)) return;
                alarms.push({ id: 'preset_' + presetId, title: evt.title, body: evt.body || '', fireAt: evt.fireAt, repeat: false });
            });
            notificationState.custom.forEach(alarm => {
                if (!alarm.enabled) return;
                const next = nextCustomAlarmTime(alarm, now);
                if (!next) return;
                alarms.push({
                    id: 'custom_' + alarm.id, title: alarm.message || '⏰ Alarma', body: '', fireAt: next,
                    repeat: true, time: alarm.time,
                    days: (Array.isArray(alarm.days) && alarm.days.length) ? alarm.days : [0, 1, 2, 3, 4, 5, 6]
                });
            });
        }
        // Recordatorios de evento (siempre)
        (notificationState.eventReminders || []).forEach(r => {
            if (r.fireAt > now) alarms.push({ id: 'evt_' + r.key, title: r.title, body: r.body || '', fireAt: r.fireAt, repeat: false });
        });
        try { window.AndroidNotify.setAlarms(JSON.stringify(alarms)); }
        catch (e) { console.warn('setAlarms error:', e); }
        updateNotifTriggerVisual();
        return;
    }

    // Navegador web: temporizadores en memoria (requieren la pestaña abierta).
    if (notificationState.enabled) {
        Object.keys(notificationState.presets).forEach(presetId => {
            if (!notificationState.presets[presetId]) return;
            const evt = findNextPresetEvent(presetId, now);
            if (!evt) return;
            const delay = evt.fireAt - now;
            if (delay > 0) scheduleOneNotif(delay, evt.title, evt.body);
        });
        notificationState.custom.forEach(alarm => {
            if (!alarm.enabled) return;
            const next = nextCustomAlarmTime(alarm, now);
            if (!next) return;
            const delay = next - now;
            if (delay > 0) scheduleOneNotif(delay, alarm.message || '⏰ Alarma', '');
        });
    }
    (notificationState.eventReminders || []).forEach(r => {
        const delay = r.fireAt - now;
        if (delay > 0) scheduleOneNotif(delay, r.title, r.body || '');
    });

    updateNotifTriggerVisual();
}

// --- Recordatorios por evento (botón "avísame" de la agenda en vivo) ---
function hasEventReminder(key) {
    return Array.isArray(notificationState.eventReminders) && notificationState.eventReminders.some(r => r.key === key);
}

async function toggleEventReminder(key) {
    const ev = (__liveCal.events || []).find(e => (e.currency + '@' + e.date) === key);
    if (!ev) return;
    const evMs = Date.parse(ev.date);
    if (!Number.isFinite(evMs)) return;
    notificationState.eventReminders = notificationState.eventReminders || [];

    const idx = notificationState.eventReminders.findIndex(r => r.key === key);
    if (idx >= 0) {
        notificationState.eventReminders.splice(idx, 1);
        saveNotificationState();
        rescheduleAllNotifications();
        renderLiveCalendar(Date.now());
        return;
    }

    const res = await ensureNotificationPermission();
    if (res !== 'granted') { renderLiveCalendar(Date.now()); return; }

    const es = currentLang !== 'en';
    const fireAt = Math.max(evMs - 15 * 60 * 1000, Date.now() + 1000);
    notificationState.eventReminders.push({
        key,
        title: '📅 ' + ev.currency + ' · ' + ev.title,
        body: es ? 'Evento de alto impacto próximo (~15 min)' : 'High-impact event coming up (~15 min)',
        fireAt
    });
    saveNotificationState();
    rescheduleAllNotifications();
    renderLiveCalendar(Date.now());
}

function updateNotifTriggerVisual() {
    const trigger = document.getElementById('notif-trigger');
    if (!trigger) return;
    const anyActive = (notificationState.enabled && (
        Object.values(notificationState.presets).some(Boolean) ||
        notificationState.custom.some(a => a.enabled)
    )) || (Array.isArray(notificationState.eventReminders) && notificationState.eventReminders.length > 0);
    trigger.classList.toggle('is-active', !!anyActive);
}

// ============================================================
// UI del modal de notificaciones
// ============================================================
function setupNotificationsUI() {
    const trigger = document.getElementById('notif-trigger');
    const modal = document.getElementById('notif-modal');
    const closeBtn = document.getElementById('notif-modal-close');
    const masterToggle = document.getElementById('notif-master-toggle');
    const permStatus = document.getElementById('notif-permission-status');
    const addBtn = document.getElementById('notif-add-alarm');
    const addForm = document.getElementById('notif-add-form');
    const cancelAdd = document.getElementById('notif-cancel-add');
    const confirmAdd = document.getElementById('notif-confirm-add');
    const customList = document.getElementById('notif-custom-list');
    if (!trigger || !modal) return;

    const open = () => {
        modal.classList.remove('hidden');
        document.body.classList.add('notif-modal-open');
        refreshNotifModal();
    };
    const close = () => {
        modal.classList.add('hidden');
        document.body.classList.remove('notif-modal-open');
    };

    trigger.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) close();
    });

    // Master toggle
    if (masterToggle) {
        masterToggle.addEventListener('change', async () => {
            if (masterToggle.checked) {
                if (!notifSupported()) {
                    masterToggle.checked = false;
                    setPermissionStatus('unsupported');
                    return;
                }
                const res = await ensureNotificationPermission();
                setPermissionStatus(res);
                if (res !== 'granted') {
                    masterToggle.checked = false;
                    notificationState.enabled = false;
                } else {
                    notificationState.enabled = true;
                }
            } else {
                notificationState.enabled = false;
            }
            saveNotificationState();
            rescheduleAllNotifications();
        });
    }

    // Preset checkboxes
    modal.querySelectorAll('input[type="checkbox"][data-preset]').forEach(cb => {
        cb.addEventListener('change', () => {
            const id = cb.getAttribute('data-preset');
            notificationState.presets[id] = cb.checked;
            saveNotificationState();
            rescheduleAllNotifications();
        });
    });

    // Helper para abrir el form en modo "añadir" o "editar"
    const openAlarmForm = (alarm) => {
        const titleEl = document.getElementById('notif-form-title');
        const timeInput = document.getElementById('notif-new-time');
        const msgInput = document.getElementById('notif-new-message');
        const dayCbs = addForm.querySelectorAll('.notif-day input');

        if (alarm) {
            __editingAlarmId = alarm.id;
            if (titleEl) titleEl.textContent = t('notifs.form.title_edit');
            if (confirmAdd) confirmAdd.textContent = t('notifs.form.save_edit');
            timeInput.value = alarm.time || '13:00';
            msgInput.value = alarm.message || '';
            dayCbs.forEach(cb => { cb.checked = (alarm.days || []).includes(Number(cb.value)); });
        } else {
            __editingAlarmId = null;
            if (titleEl) titleEl.textContent = t('notifs.form.title_add');
            if (confirmAdd) confirmAdd.textContent = t('notifs.form.save');
            timeInput.value = '13:00';
            msgInput.value = '';
            // Por defecto L-V
            dayCbs.forEach(cb => { cb.checked = ['1','2','3','4','5'].includes(cb.value); });
        }
        addForm.classList.remove('hidden');
        setTimeout(() => msgInput && msgInput.focus(), 50);
    };

    // Botón "+ Añadir"
    if (addBtn) addBtn.addEventListener('click', () => openAlarmForm(null));

    // Botón "Cancelar" del form
    if (cancelAdd) cancelAdd.addEventListener('click', () => {
        addForm.classList.add('hidden');
        __editingAlarmId = null;
    });

    // Botón "Guardar / Actualizar" del form
    if (confirmAdd) confirmAdd.addEventListener('click', () => {
        const time = document.getElementById('notif-new-time').value;
        const message = document.getElementById('notif-new-message').value.trim() || '⏰ Alarma';
        const days = Array.from(addForm.querySelectorAll('.notif-day input:checked')).map(c => Number(c.value));
        if (!time) return;

        if (__editingAlarmId) {
            // Modo editar: actualiza alarma existente preservando id y enabled
            const existing = notificationState.custom.find(a => a.id === __editingAlarmId);
            if (existing) {
                existing.time = time;
                existing.message = message;
                existing.days = days.length ? days : [0, 1, 2, 3, 4, 5, 6];
            }
        } else {
            // Modo añadir
            const newAlarm = {
                id: 'a_' + Date.now() + '_' + Math.floor(Math.random() * 999),
                time, message,
                days: days.length ? days : [0, 1, 2, 3, 4, 5, 6],
                enabled: true
            };
            notificationState.custom.push(newAlarm);
        }

        saveNotificationState();
        rescheduleAllNotifications();
        addForm.classList.add('hidden');
        __editingAlarmId = null;
        renderCustomAlarms();
    });

    // Delegación: toggle / editar / eliminar alarmas custom
    if (customList) {
        customList.addEventListener('click', (e) => {
            const item = e.target.closest('.notif-custom-item');
            if (!item) return;
            const id = item.dataset.alarmId;
            const alarm = notificationState.custom.find(a => a.id === id);
            if (!alarm) return;
            if (e.target.closest('.notif-toggle')) {
                alarm.enabled = !alarm.enabled;
                saveNotificationState();
                rescheduleAllNotifications();
                renderCustomAlarms();
            } else if (e.target.closest('.notif-edit')) {
                openAlarmForm(alarm);
            } else if (e.target.closest('.notif-delete')) {
                notificationState.custom = notificationState.custom.filter(a => a.id !== id);
                saveNotificationState();
                rescheduleAllNotifications();
                renderCustomAlarms();
            }
        });
    }

    // Re-render al volver a la pestaña (reagenda timers que pudieron perderse)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) rescheduleAllNotifications();
    });
}

function setPermissionStatus(status) {
    const el = document.getElementById('notif-permission-status');
    if (!el) return;
    el.classList.remove('is-error', 'is-ok');
    let key = 'notifs.permission_default';
    if (status === 'granted') { key = 'notifs.permission_granted'; el.classList.add('is-ok'); }
    else if (status === 'denied') { key = 'notifs.permission_denied'; el.classList.add('is-error'); }
    else if (status === 'unsupported') { key = 'notifs.permission_unsupported'; el.classList.add('is-error'); }
    el.textContent = t(key);
}

function refreshNotifModal() {
    // Master toggle estado
    const masterToggle = document.getElementById('notif-master-toggle');
    if (masterToggle) masterToggle.checked = notificationState.enabled && notifPermission() === 'granted';

    // Permission status
    const status = !notifSupported() ? 'unsupported' : notifPermission();
    setPermissionStatus(status);

    // Presets
    document.querySelectorAll('#notif-modal input[type="checkbox"][data-preset]').forEach(cb => {
        const id = cb.getAttribute('data-preset');
        cb.checked = !!notificationState.presets[id];
    });

    // Custom alarms
    renderCustomAlarms();
}

function renderCustomAlarms() {
    const list = document.getElementById('notif-custom-list');
    if (!list) return;
    if (!notificationState.custom.length) {
        list.innerHTML = `<div class="notif-empty-list">${escapeHtml(t('notifs.empty'))}</div>`;
        return;
    }
    const dayShort = translations[currentLang]?.notifs?.day_short || translations.es.notifs.day_short;
    const editLabel = t('notifs.edit');
    const deleteLabel = t('notifs.delete');
    list.innerHTML = notificationState.custom.map(a => {
        const dayLabel = formatDaysSummary(a.days, dayShort);
        const toggleLabel = a.enabled ? t('notifs.toggle_on') : t('notifs.toggle_off');
        return `
            <div class="notif-custom-item ${a.enabled ? '' : 'is-disabled'}" data-alarm-id="${escapeHtml(a.id)}">
                <span class="notif-custom-time">${escapeHtml(a.time)}</span>
                <span class="notif-custom-message">${escapeHtml(a.message || '')}</span>
                <span class="notif-custom-days">${escapeHtml(dayLabel)}</span>
                <div class="notif-custom-actions">
                    <button type="button" class="notif-toggle" aria-label="${escapeHtml(toggleLabel)}" title="${escapeHtml(toggleLabel)}">
                        <i class="fa-solid ${a.enabled ? 'fa-toggle-on' : 'fa-toggle-off'}"></i>
                    </button>
                    <button type="button" class="notif-edit" aria-label="${escapeHtml(editLabel)}" title="${escapeHtml(editLabel)}">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button type="button" class="notif-delete" aria-label="${escapeHtml(deleteLabel)}" title="${escapeHtml(deleteLabel)}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function formatDaysSummary(days, dayShort) {
    if (!Array.isArray(days) || days.length === 0 || days.length === 7) return t('notifs.every_day');
    // Verifica si es L-V (lunes a viernes)
    const sortedSet = [...days].sort();
    if (sortedSet.length === 5 && sortedSet.join(',') === '1,2,3,4,5') return t('notifs.weekdays');
    return sortedSet.map(d => dayShort[d]).join(' ');
}

// ============================================================
// Init
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    loadUserTimezoneOverride();
    setupTimezonePicker();

    loadNotificationState();
    setupNotificationsUI();
    rescheduleAllNotifications();
    setupMarketTabs();

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
