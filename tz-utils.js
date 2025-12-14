(function (global) {
    'use strict';

    const WEEKDAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

    const _dtfCache = new Map();
    function _getPartsFormatter(timeZone) {
        const key = String(timeZone);
        let fmt = _dtfCache.get(key);
        if (!fmt) {
            fmt = new Intl.DateTimeFormat('en-US', {
                timeZone,
                weekday: 'short',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hourCycle: 'h23'
            });
            _dtfCache.set(key, fmt);
        }
        return fmt;
    }

    function getZonedParts(date, timeZone) {
        const d = (date instanceof Date) ? date : new Date(date);
        const fmt = _getPartsFormatter(timeZone);
        const parts = fmt.formatToParts(d);

        const out = { year: 0, month: 0, day: 0, hour: 0, minute: 0, second: 0, weekday: 'Sun', weekdayIndex: 0 };
        for (const p of parts) {
            if (p.type === 'year') out.year = Number(p.value);
            else if (p.type === 'month') out.month = Number(p.value);
            else if (p.type === 'day') out.day = Number(p.value);
            else if (p.type === 'hour') out.hour = Number(p.value);
            else if (p.type === 'minute') out.minute = Number(p.value);
            else if (p.type === 'second') out.second = Number(p.value);
            else if (p.type === 'weekday') out.weekday = p.value;
        }
        out.weekdayIndex = WEEKDAY_INDEX[out.weekday] ?? 0;
        return out;
    }

    function addDaysYMD(ymd, days) {
        const base = new Date(Date.UTC(ymd.year, ymd.month - 1, ymd.day, 0, 0, 0));
        base.setUTCDate(base.getUTCDate() + days);
        return { year: base.getUTCFullYear(), month: base.getUTCMonth() + 1, day: base.getUTCDate() };
    }

    function _partsToUtcMs(p) {
        return Date.UTC(p.year, p.month - 1, p.day, p.hour || 0, p.minute || 0, p.second || 0);
    }

    // Convierte una fecha/hora *local* en `timeZone` a un instante UTC (Date).
    // - Robusto ante DST: usa una corrección iterativa basada en Intl.
    // - En horas ambiguas (otoño), converge a un instante consistente.
    // - En horas inexistentes (primavera), converge al primer instante válido posterior.
    function zonedTimeToUtc(localParts, timeZone) {
        const intended = {
            year: Number(localParts.year),
            month: Number(localParts.month),
            day: Number(localParts.day),
            hour: Number(localParts.hour ?? 0),
            minute: Number(localParts.minute ?? 0),
            second: Number(localParts.second ?? 0)
        };

        let utcMs = Date.UTC(intended.year, intended.month - 1, intended.day, intended.hour, intended.minute, intended.second);

        for (let i = 0; i < 4; i++) {
            const actual = getZonedParts(new Date(utcMs), timeZone);
            const diffMs = _partsToUtcMs(actual) - _partsToUtcMs(intended);
            if (diffMs === 0) break;
            utcMs -= diffMs;
        }

        return new Date(utcMs);
    }

    const api = { getZonedParts, zonedTimeToUtc, addDaysYMD };

    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    global.TzUtils = api;
})(typeof window !== 'undefined' ? window : globalThis);
