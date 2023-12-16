import resolveConfig from 'tailwindcss/resolveConfig';
import { ScreenCode } from '@/shared/config/detect-device/types';
import tailwindConfig from '../../../../../tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);

export const calculateCurrentScreenSize = (
    screenWidth: number,
): ScreenCode | null => {
    // Expected screen configuration from TailwindCSS theme.
    const { screens } = fullConfig.theme;

    // Map screen sizes from configuration to an array of {name, size}.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const screenSizes = Object.entries(screens).map(([key, value]) => ({
        name: key,
        size: Number.parseInt(value as string, 10),
    }));

    // Sort the screens by size in descending order.
    screenSizes.sort((a, b) => b.size - a.size);

    // Get the width of the window.

    // Find the screen size that matches the window width.
    const matchingScreenSize = screenSizes.find(
        (screen) => screenWidth >= screen.size,
    );

    // Set the current screen to the name of the matching size or null.
    return matchingScreenSize ? (matchingScreenSize.name as ScreenCode) : null;
};
