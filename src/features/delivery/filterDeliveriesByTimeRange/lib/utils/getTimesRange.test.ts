import { getTimesRange } from "./getTimesRange";

describe('getTimesRange', () => {
    it('returns the correct time ranges for a given start time, end time, and step size', () => {
        const startTime = "9:00";
        const endTime = "10:00";
        const stepMins = 30;

        const expectedResult = ["9:00-9:30", "9:30-10:00"];
        const result = getTimesRange(startTime, endTime, stepMins);

        expect(result).toEqual(expectedResult);
    });

    it('handles an intermediate step size correctly', () => {
        const result = getTimesRange("10:00", "11:00", 20); // 20 minutes step
        expect(result).toEqual(["10:00-10:20", "10:20-10:40", "10:40-11:00"]);
    });

    it('returns an empty array when start time is after end time', () => {
        const result = getTimesRange("11:00", "10:00", 30);
        expect(result).toEqual([]);
    });

    it('returns correct range for step size larger than the time range', () => {
        const result = getTimesRange("9:00", "10:00", 120);
        expect(result).toEqual([]);
    });

    it('handles times crossing into the next day', () => {
        const result = getTimesRange("23:30", "00:30", 30); // Assuming crossing into the next day isn't supported.
        expect(result).toEqual([]);
    });

    it('returns an error or empty array for incorrectly formatted times', () => {
        const result = getTimesRange("10:00 AM", "11:00 AM", 15);
        // Assuming function should handle this gracefully
        expect(result).toEqual([]);
    });
});