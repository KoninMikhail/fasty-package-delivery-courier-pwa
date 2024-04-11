export const removeNonNumericChars = (str: string): string => {
    return str.replace(/[^0-9]/g, '');
}