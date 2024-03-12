/**
 * Converts a formatted phone number into a tel: link format.
 * @param phoneNumber The phone number in a formatted string.
 * @returns A string in the tel: link format.
 */
export const convertPhoneToTelLink = (phoneNumber: string): string => {
    // Remove all characters except digits
    const digitsOnly = phoneNumber.replaceAll(/\D/g, '');
    return `tel:+${digitsOnly}`;
};
