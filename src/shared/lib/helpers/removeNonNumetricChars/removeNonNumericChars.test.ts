import { describe, it, expect } from 'vitest';
import { removeNonNumericChars } from './removeNonNumericChars';

describe('removeNonNumericChars function', () => {
    it('should remove all non-numeric chars from a string', () => {
        const testString = 'abc123xyz';
        const expected = '123';
        const result = removeNonNumericChars(testString);
        expect(result).toBe(expected);
    });

    it('should return an empty string if input is only non-numeric chars', () => {
        const testString = 'abcXYZ';
        const expected = '';
        const result = removeNonNumericChars(testString);
        expect(result).toBe(expected);
    });

    it('should return the same input if input is only numbers', () => {
        const testString = '12345';
        const expected = '12345';
        const result = removeNonNumericChars(testString);
        expect(result).toBe(expected);
    });

    it('should work with special characters and spaces', () => {
        const testString = '1!2@3# $%^4&*()_+5=';
        const expected = '12345';
        const result = removeNonNumericChars(testString);
        expect(result).toBe(expected);
    });

    it('should return an empty string if input is empty', () => {
        const testString = '';
        const expected = '';
        const result = removeNonNumericChars(testString);
        expect(result).toBe(expected);
    });

    it('should handle numeric strings that include decimal points correctly', () => {
        const testString = '12.34.56.78';
        const expected = '12345678';
        const result = removeNonNumericChars(testString);
        expect(result).toBe(expected);
    });
});