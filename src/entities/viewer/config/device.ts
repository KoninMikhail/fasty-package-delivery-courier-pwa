import { ScreenCode } from '../types/device';

/**
 * Default screen codes for mobile devices.
 * This is set to an empty array with type assertion for workarounds where mobile codes aren't needed.
 * @type {ScreenCode[]}
 */
export const MOBILE_SCREEN_CODES: ScreenCode[] = ['' as ScreenCode]; // it for work if you doesn't need mobile codes

/**
 * Defined screen codes for tablet devices.
 * @type {ScreenCode[]}
 */
export const TABLET_SCREEN_CODES: ScreenCode[] = ['sm', 'md', 'lg'];

/**
 * Defined screen codes for desktop devices.
 * @type {ScreenCode[]}
 */
export const DESKTOP_SCREEN_CODES: ScreenCode[] = [
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
];
