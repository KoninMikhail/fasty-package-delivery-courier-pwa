import { convertPhoneToTelLink } from './convertPhoneToTelLink';

describe('convertPhoneToTelLink', () => {
    it('converts formatted phone number to tel link', () => {
        const result = convertPhoneToTelLink('(123) 456-7890');
        expect(result).toEqual('tel:+1234567890');
    });

    it('handles phone number with country code', () => {
        const result = convertPhoneToTelLink('+1 (123) 456-7890');
        expect(result).toEqual('tel:+11234567890');
    });

    it('handles phone number with extension', () => {
        const result = convertPhoneToTelLink('(123) 456-7890 ext. 1234');
        expect(result).toEqual('tel:+12345678901234');
    });

    it('returns original string if no digits present', () => {
        const result = convertPhoneToTelLink('No digits here');
        expect(result).toEqual('tel:+');
    });
});