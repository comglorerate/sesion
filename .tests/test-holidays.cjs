// Pruebas del sistema de feriados.
// Carga las funciones puras sin depender del DOM.

const fs = require('fs');
const path = require('path');

// Stub de TzUtils mínimo (no necesario para esta prueba pero evita undefined)
global.TzUtils = { getZonedParts: () => ({}), zonedTimeToUtc: () => new Date(), addDaysYMD: () => ({ year: 2026, month: 1, day: 1 }) };
global.window = { addEventListener: () => {} };
global.document = { addEventListener: () => {}, getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], documentElement: {} };
global.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
global.navigator = { language: 'es', languages: ['es'], serviceWorker: null };

// Cargamos app.js como CommonJS aprovechando el bloque module.exports al final
const appCode = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const m = { exports: {} };
const fn = new Function('module', 'window', 'document', 'localStorage', 'navigator', 'TzUtils', appCode);
fn(m, global.window, global.document, global.localStorage, global.navigator, global.TzUtils);
const { nthWeekdayOfMonth, easterDate, goodFridayDate, observedDate, getHolidaysForYear } = m.exports;

let passed = 0, failed = 0;
function test(name, fn) {
    try { fn(); console.log('  ✔ ' + name); passed++; }
    catch (e) { console.log('  ✘ ' + name + '\n     → ' + (e.message || e)); failed++; }
}
function eq(actual, expected, label) {
    const aJ = JSON.stringify(actual), eJ = JSON.stringify(expected);
    if (aJ !== eJ) throw new Error(`${label || ''}: esperado ${eJ}, recibido ${aJ}`);
}

console.log('— nthWeekdayOfMonth —');
test('3° lunes de enero 2024 = 15 (MLK Day)', () => eq(nthWeekdayOfMonth(2024, 1, 1, 3), 15));
test('3° lunes de enero 2025 = 20 (MLK Day)', () => eq(nthWeekdayOfMonth(2025, 1, 1, 3), 20));
test('3° lunes de enero 2026 = 19 (MLK Day)', () => eq(nthWeekdayOfMonth(2026, 1, 1, 3), 19));
test('Último lunes de mayo 2024 = 27 (Memorial Day)', () => eq(nthWeekdayOfMonth(2024, 5, 1, -1), 27));
test('Último lunes de mayo 2025 = 26 (Memorial Day)', () => eq(nthWeekdayOfMonth(2025, 5, 1, -1), 26));
test('Último lunes de mayo 2026 = 25 (Memorial Day)', () => eq(nthWeekdayOfMonth(2026, 5, 1, -1), 25));
test('1° lunes de septiembre 2024 = 2 (Labor Day)', () => eq(nthWeekdayOfMonth(2024, 9, 1, 1), 2));
test('1° lunes de septiembre 2025 = 1 (Labor Day)', () => eq(nthWeekdayOfMonth(2025, 9, 1, 1), 1));
test('4° jueves de noviembre 2024 = 28 (Thanksgiving)', () => eq(nthWeekdayOfMonth(2024, 11, 4, 4), 28));
test('4° jueves de noviembre 2025 = 27 (Thanksgiving)', () => eq(nthWeekdayOfMonth(2025, 11, 4, 4), 27));
test('4° jueves de noviembre 2026 = 26 (Thanksgiving)', () => eq(nthWeekdayOfMonth(2026, 11, 4, 4), 26));

console.log('\n— Pascua / Good Friday —');
test('Pascua 2024 = 31 marzo', () => eq(easterDate(2024), { month: 3, day: 31 }));
test('Pascua 2025 = 20 abril', () => eq(easterDate(2025), { month: 4, day: 20 }));
test('Pascua 2026 = 5 abril', () => eq(easterDate(2026), { month: 4, day: 5 }));
test('Pascua 2027 = 28 marzo', () => eq(easterDate(2027), { month: 3, day: 28 }));
test('Good Friday 2024 = 29 marzo', () => eq(goodFridayDate(2024), { month: 3, day: 29 }));
test('Good Friday 2025 = 18 abril', () => eq(goodFridayDate(2025), { month: 4, day: 18 }));
test('Good Friday 2026 = 3 abril', () => eq(goodFridayDate(2026), { month: 4, day: 3 }));

console.log('\n— Observed dates (NYSE) —');
test('Jul 4 2026 (sábado) → observado el viernes Jul 3 (modo both)', () => eq(observedDate(2026, 7, 4, 'both'), { month: 7, day: 3 }));
test('Jul 4 2027 (domingo) → observado el lunes Jul 5 (modo both)', () => eq(observedDate(2027, 7, 4, 'both'), { month: 7, day: 5 }));
test('Jul 4 2025 (viernes) → mismo día', () => eq(observedDate(2025, 7, 4, 'both'), { month: 7, day: 4 }));
test('NYE Jan 1 2022 (sábado) → NO observa (sundayOnly)', () => eq(observedDate(2022, 1, 1, 'sundayOnly'), { month: 1, day: 1 }));
test('NYE Jan 1 2023 (domingo) → observado el lunes Jan 2 (sundayOnly)', () => eq(observedDate(2023, 1, 1, 'sundayOnly'), { month: 1, day: 2 }));

console.log('\n— Calendario completo 2025 (NYSE) —');
const h2025 = getHolidaysForYear(2025);
const stocksClose2025 = h2025.filter(h => h.stocksClose).map(h => `${h.month}/${h.day}`);
test('NYSE 2025 cierra en las 11 fechas correctas', () => {
    // Esperadas (formato mes/día):
    // 1/1 (New Year), 1/20 (MLK), 2/17 (Presidents), 4/18 (Good Friday),
    // 5/26 (Memorial), 6/19 (Juneteenth), 7/4 (Indep), 9/1 (Labor),
    // 11/27 (Thanksgiving), 12/25 (Christmas)
    const expected = ['1/1', '1/20', '2/17', '4/18', '5/26', '6/19', '7/4', '9/1', '11/27', '12/25'];
    expected.forEach(d => {
        if (!stocksClose2025.includes(d)) throw new Error('Falta ' + d + ' en ' + JSON.stringify(stocksClose2025));
    });
});

console.log('\n— Black Friday 2025 (cierre temprano) —');
test('Black Friday 2025 = 28 nov (early close 13:00)', () => {
    const h = h2025.find(h => h.month === 11 && h.day === 28);
    if (!h) throw new Error('No hay entry para 11/28');
    if (!h.stocksEarlyClose) throw new Error('Sin stocksEarlyClose');
    eq({ hour: h.stocksEarlyClose.hour, minute: h.stocksEarlyClose.minute }, { hour: 13, minute: 0 });
});

console.log('\n— Christmas Eve 2025 (early close) —');
test('Dec 24 2025 → early close 13:00', () => {
    const h = h2025.find(h => h.month === 12 && h.day === 24);
    if (!h) throw new Error('No hay entry para 12/24');
    if (!h.stocksEarlyClose) throw new Error('Sin stocksEarlyClose');
    eq({ hour: h.stocksEarlyClose.hour, minute: h.stocksEarlyClose.minute }, { hour: 13, minute: 0 });
});

console.log('\n— Forex: Independence Day 2025 → liquidez limitada —');
test('Jul 4 2025 marca forexLimited', () => {
    const h = h2025.find(h => h.month === 7 && h.day === 4);
    if (!h) throw new Error('No hay entry para 7/4');
    if (!h.forexLimited) throw new Error('Esperaba forexLimited=true');
});

console.log(`\nResultados: ${passed} OK / ${failed} FALLÓ`);
process.exit(failed ? 1 : 0);
