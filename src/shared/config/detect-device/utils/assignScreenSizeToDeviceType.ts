import { DeviceType, ScreenCode } from '../types';

const MOBILE_SCREEN_CODES: ScreenCode[] = ['' as ScreenCode]; // it for work if you doesn't need mobile codes
const TABLET_SCREEN_CODES: ScreenCode[] = ['sm', 'md', 'lg'];
const DESKTOP_SCREEN_CODES: ScreenCode[] = ['xl', '2xl'];

const allScreenCodes = new Set<ScreenCode>([
    ...MOBILE_SCREEN_CODES,
    ...TABLET_SCREEN_CODES,
    ...DESKTOP_SCREEN_CODES,
]);
if (
    allScreenCodes.size !==
    MOBILE_SCREEN_CODES.length +
        TABLET_SCREEN_CODES.length +
        DESKTOP_SCREEN_CODES.length
) {
    throw new Error('Screen codes for tablet and desktop have an intersection');
}

const mobileScreenCodesValidated = new Set<ScreenCode>(MOBILE_SCREEN_CODES);
const tabletScreenCodesValidated = new Set<ScreenCode>(TABLET_SCREEN_CODES);
const desktopScreenCodesValidated = new Set<ScreenCode>(DESKTOP_SCREEN_CODES);

export const assignScreenSizeToDeviceType = (
    screen: ScreenCode | null,
): DeviceType => {
    if (screen && tabletScreenCodesValidated.has(screen)) return 'tablet';
    if (screen && desktopScreenCodesValidated.has(screen)) return 'desktop';
    if (screen && mobileScreenCodesValidated.has(screen)) return 'mobile';
    return 'mobile';
};
