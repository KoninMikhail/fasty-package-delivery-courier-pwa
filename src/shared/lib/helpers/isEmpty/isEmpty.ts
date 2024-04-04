export const isEmpty = (value: unknown): boolean => {
    if (value == null) {
        return true;
    }
    if (typeof value === 'string' || Array.isArray(value)) {
        return value.length === 0;
    } else if (typeof value === 'object') {
        return Object.keys(value as object).length === 0;
    }
    return false;
};
