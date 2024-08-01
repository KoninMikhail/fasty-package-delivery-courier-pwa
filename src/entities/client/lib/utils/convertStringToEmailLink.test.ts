import { convertStringToEmailLink } from './convertStringToEmailLink';

describe('convertStringToEmailLink', () => {
    it('converts email string to mailto link', () => {
        const result = convertStringToEmailLink('test@example.com');
        expect(result).toEqual('mailto:test@example.com');
    });

    it('handles email string with special characters', () => {
        const result = convertStringToEmailLink('test.email+tag@example.com');
        expect(result).toEqual('mailto:test.email+tag@example.com');
    });

    it('returns original string if no @ symbol present', () => {
        const result = convertStringToEmailLink('notanemail');
        expect(result).toEqual('mailto:notanemail');
    });

    it('returns mailto link with empty string if input is empty', () => {
        const result = convertStringToEmailLink('');
        expect(result).toEqual('mailto:');
    });
});