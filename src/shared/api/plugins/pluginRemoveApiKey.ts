import { ZodiosPlugin } from '@zodios/core';
import Cookies from 'js-cookie';

export interface PluginRemoveApiKeyConfig {
    cookieName: string;
}

/**
 * Creates a Zodios plugin to delete a specified cookie.
 * Plugin activation can be controlled to ensure that the cookie
 * is deleted only under certain conditions if needed.
 *
 * @param config Configuration for the plugin, including the cookie name.
 * @returns ZodiosPlugin that handles cookie deletion.
 */
export function pluginRemoveApiKey(
    config: PluginRemoveApiKeyConfig,
): ZodiosPlugin {
    // Defining the plugin with a specific name for clarity and debugging
    return {
        // Plugin hooks into the request phase, but could be adapted to response if needed
        request: async (_, requestOptions) => {
            // Conditionally or unconditionally delete the cookie
            // Example below deletes the cookie unconditionally, but you could
            // add conditions based on `requestOptions` or other criteria
            Cookies.remove(config.cookieName);

            // No modification to the request, so it returns the unaltered requestOptions
            return requestOptions;
        },
    };
}
