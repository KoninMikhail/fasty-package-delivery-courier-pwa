import { DeviceType, ScreenCode } from '../types';

/**
 * Default screen codes for mobile devices.
 * This is set to an empty array with type assertion for workarounds where mobile codes aren't needed.
 * @type {ScreenCode[]}
 */
const MOBILE_SCREEN_CODES: ScreenCode[] = ['' as ScreenCode]; // it for work if you doesn't need mobile codes

/**
 * Defined screen codes for tablet devices.
 * @type {ScreenCode[]}
 */
const TABLET_SCREEN_CODES: ScreenCode[] = ['sm', 'md', 'lg'];

/**
 * Defined screen codes for desktop devices.
 * @type {ScreenCode[]}
 */
const DESKTOP_SCREEN_CODES: ScreenCode[] = ['xl', '2xl'];

// Add all the screen codes to a set to check for duplicates.
const allScreenCodes = new Set<ScreenCode>([
    ...MOBILE_SCREEN_CODES,
    ...TABLET_SCREEN_CODES,
    ...DESKTOP_SCREEN_CODES,
]);

// Check if the screen codes are unique across device types.
if (
    allScreenCodes.size !==
    MOBILE_SCREEN_CODES.length +
        TABLET_SCREEN_CODES.length +
        DESKTOP_SCREEN_CODES.length
) {
    throw new Error('Screen codes for tablet and desktop have an intersection');
}

// Creating validated sets for each device type.
const mobileScreenCodesValidated = new Set<ScreenCode>(MOBILE_SCREEN_CODES);
const tabletScreenCodesValidated = new Set<ScreenCode>(TABLET_SCREEN_CODES);
const desktopScreenCodesValidated = new Set<ScreenCode>(DESKTOP_SCREEN_CODES);

/**
 * Assign a device type ('mobile', 'tablet', 'desktop') based on the given screen code.
 *
 * @param {ScreenCode | null} screen - The screen code to categorize.
 * @returns {DeviceType} - The type of device that corresponds to the screen code.
 */
export const assignScreenSizeToDeviceType = (
    screen: ScreenCode | null,
): DeviceType => {
    if (screen && tabletScreenCodesValidated.has(screen)) return 'tablet';
    if (screen && desktopScreenCodesValidated.has(screen)) return 'desktop';
    if (screen && mobileScreenCodesValidated.has(screen)) return 'mobile';
    return 'mobile';
};
