import resolveConfig from 'tailwindcss/resolveConfig';
import { useEffect, useState } from 'react';
import tailwindConfig from '../../../../tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);

interface ScreenSize {
    name: string;
    size: number;
}

/**
 * Custom hook that listens to window resize events and returns the current screen size
 * name based on TailwindCSS's screen configuration.
 * @returns {string | null} The name of the current screen size or null if it cannot be determined.
 */
export const useCurrentScreen = (): string | null => {
    // State to store the current screen name as defined in TailwindCSS configuration.
    const [currentScreen, setCurrentScreen] = useState<string | null>(null);

    useEffect(() => {
        // This function checks the window width and updates the current screen state.
        const handleResize = (): void => {
            // Expected screen configuration from TailwindCSS theme.
            const { screens } = fullConfig.theme;

            // SimpleMapContainer screen sizes from configuration to an array of {name, size}.
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            const screenSizes: ScreenSize[] = Object.entries(screens).map(
                ([key, value]) => ({
                    name: key,
                    size: Number.parseInt(value as string, 10),
                }),
            );

            // Sort the screens by size in descending order.
            screenSizes.sort((a, b) => b.size - a.size);

            // Get the width of the window.
            const windowWidth = window.innerWidth;

            // Find the screen size that matches the window width.
            const matchingScreenSize = screenSizes.find(
                (screen) => windowWidth >= screen.size,
            );

            // Set the current screen to the name of the matching size or null.
            setCurrentScreen(
                matchingScreenSize ? matchingScreenSize.name : null,
            );
        };

        // Add the resize event listener when the component mounts.
        window.addEventListener('resize', handleResize);

        // Invoke handleResize to set the initial state.
        handleResize();

        // Remove the event listener when the component unmounts.
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Return the current screen name.
    return currentScreen;
};
