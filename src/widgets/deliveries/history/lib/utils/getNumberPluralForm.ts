export const getNumberPluralForm = (count: number): 'single' | 'plural' | 'multi' => {
    const mod10 = count % 10;
    const mod100 = count % 100;

    // Check for 'multi' condition first, assuming you had specific requirements for numbers
    // ending in 2, 3, 4 but not in the teen range (12-14), as previously logic might have been confused
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) {
        return 'multi';
    }

    // Then check for 'single'
    if (mod10 === 1 && mod100 !== 11) {
        return 'single';
    }

    // Return 'plural' as the default case, since the other conditions take precedence
    return 'plural';
}