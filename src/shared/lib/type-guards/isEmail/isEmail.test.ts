// isEmail.test.ts
import { it, expect, describe } from 'vitest';
import { isEmail } from './isEmail'; // Change this to the path where your isEmail function is located

describe('isEmail', () => {
  it('should return true for a valid email', () => {
    const validEmail = 'test@example.com';
    expect(isEmail(validEmail)).toBe(true);
  });

  it('should return false for an invalid email', () => {
    const invalidEmail = 'not-an-email';
    expect(isEmail(invalidEmail)).toBe(false);
  });

  it('should return false for an empty string', () => {
    const emptyString = '';
    expect(isEmail(emptyString)).toBe(false);
  });

  it('should return false for a string without an "@" symbol', () => {
    const noAtSymbol = 'test.example.com';
    expect(isEmail(noAtSymbol)).toBe(false);
  });

  it('should return false for a string with multiple "@" symbols', () => {
    const multipleAtSymbols = 'test@@example.com';
    expect(isEmail(multipleAtSymbols)).toBe(false);
  });

  it('should return false for a string with invalid domain', () => {
    const invalidDomain = 'test@.com';
    expect(isEmail(invalidDomain)).toBe(false);
  });

  it('should return false for a string with missing top-level domain', () => {
    const missingTLD = 'test@example';
    expect(isEmail(missingTLD)).toBe(false);
  });
});