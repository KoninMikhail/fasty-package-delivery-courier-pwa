import resolveConfig from "tailwindcss/resolveConfig";
import { ScreenCode } from "../../../types/device";
import tailwindConfig from "../../../../../../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);

/**
 * Calculates the current screen size category based on a given screen width.
 * This function uses the Tailwind CSS theme configuration to determine which screen size category
 * the given width falls into.
 *
 * @param {number} screenWidth - The width of the screen in pixels.
 * @returns {(ScreenCode | null)} - The screen size category from the configured themes
 * that matches the given screen width. If no matching category is found, returns null.
 */
export const calculateCurrentScreenSize = (
  screenWidth: number,
): ScreenCode | null => {
  // Expected screen configuration from TailwindCSS theme.
  const { screens } = fullConfig.theme;

  // SimpleMapContainer screen sizes from configuration to an array of {name, size}.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const screenSizes = Object.entries(screens).map(([key, value]) => ({
    name: key,
    size: Number.parseInt(value as string, 10),
  }));

  // Sort the screens by size in descending order.
  screenSizes.sort((a, b) => b.size - a.size);

  // Find the screen size that matches the window width.
  const matchingScreenSize = screenSizes.find(
    (screen) => screenWidth >= screen.size,
  );

  // Set the current screen to the name of the matching size or null.
  return matchingScreenSize ? (matchingScreenSize.name as ScreenCode) : null;
};
