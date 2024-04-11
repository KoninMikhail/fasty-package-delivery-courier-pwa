import { describe, it, expect } from 'vitest';
import padCharacters from './padCharacters'; // Adjust the import based on your file organization

describe('padCharacters', () => {
    it('pads a string on the left with default character (0)', () => {
        const result = padCharacters("123", 5);
        expect(result).toBe("00123");
    });

    it('pads a string on the right with a custom character (X)', () => {
        const result = padCharacters("abc", 6, { padChar: "X", direction: "right" });
        expect(result).toBe("abcXXX");
    });

    it('pads a string on the left with a custom character (-)', () => {
        const result = padCharacters("hello", 10, { padChar: "-", direction: "left" });
        expect(result).toBe("-----hello");
    });

    it('returns the original string when its length is equal to the specified length', () => {
        const result = padCharacters("12345", 5);
        expect(result).toBe("12345");
    });

    it('returns the original string when its length exceeds the specified length', () => {
        const result = padCharacters("123456", 5);
        expect(result).toBe("123456");
    });

    it('handles empty string inputs correctly', () => {
        const result = padCharacters("", 3);
        expect(result).toBe("000");
    });

    it('throws error when given a negative length', () => {
        const callPadCharactersWithNegativeLength = () => padCharacters("123", -1);
        expect(callPadCharactersWithNegativeLength).toThrow("Invalid length");
    });
});