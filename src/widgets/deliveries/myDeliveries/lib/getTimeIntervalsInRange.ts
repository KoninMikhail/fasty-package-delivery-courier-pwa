mport { describe, expect, it } from 'vitest';
import {getTimeIntervalsInRange} from './getTimeIntervalsInRange';

describe('getTimeIntervalsInRange', () => {
    it('generates correct intervals inside given range', () => {
        const intervals = getTimeIntervalsInRange('09:00', '10:00', 30);
        expect(intervals).toEqual(['09:00 - 09:30', '09:30 - 10:00']);
    });

    it('handles full hour ranges correctly', () => {
        const intervals = getTimeIntervalsInRange('12:00', '13:00', 60);
        expect(intervals).toEqual(['12:00 - 13:00']);
    });

    it('returns empty array when itemLength is greater than range', () => {
        const intervals = getTimeIntervalsInRange('14:00', '14:30', 45);
        expect(intervals).toEqual([]);
    });

    it('does not exceed timeEnd', () => {
        const intervals = getTimeIntervalsInRange('10:00', '11:45', 30);
        expect(intervals.length).toBe(3);
        expect(intervals).toEqual(['10:00 - 10:30', '10:30 - 11:00', '11:00 - 11:30']);
    });
});