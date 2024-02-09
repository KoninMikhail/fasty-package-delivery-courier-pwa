import { it, expect, describe } from 'vitest';
import { isPassword } from './isPassword'; // Make sure to update the import path

describe('isPassword', () => {
  it('should return true for a valid password with the required complexity', () => {
    const validPassword = 'Valid@123';
    expect(isPassword(validPassword)).toBe(true);
  });

  it('should return false for passwords shorter than 8 characters', () => {
    const shortPassword = 'A1@';
    expect(isPassword(shortPassword)).toBe(false);
  });

  it('should return false for passwords longer than 100 characters', () => {
    const longPassword = 'A'.repeat(50) + '1'.repeat(50) + '!';
    expect(isPassword(longPassword)).toBe(false);
  });

  it('should return false for passwords without a letter', () => {
    const noLetter = '12345678@';
    expect(isPassword(noLetter)).toBe(false);
  });

  it('should return false for passwords without a number', () => {
    const noNumber = 'Valid@@!!';
    expect(isPassword(noNumber)).toBe(false);
  });

  it('should return false for passwords without a special character', () => {
    const noSpecialChar = 'ValidPassword123';
    expect(isPassword(noSpecialChar)).toBe(false);
  });

  it('should return false for an empty password', () => {
    const emptyPassword = '';
    expect(isPassword(emptyPassword)).toBe(false);
  });

  it('should return false for a password with only special characters', () => {
    const onlySpecialChar = '!@#$%^&*';
    expect(isPassword(onlySpecialChar)).toBe(false);
  });

  it('should return false for a password with only letters', () => {
    const onlyLetters = 'PasswordOnly';
    expect(isPassword(onlyLetters)).toBe(false);
  });

  it('should return false for a password with only numbers', () => {
    const onlyNumbers = '12345678';
    expect(isPassword(onlyNumbers)).toBe(false);
  });
});