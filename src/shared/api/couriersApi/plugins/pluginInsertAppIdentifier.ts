import { ZodiosPlugin } from '@zodios/core';

const { PACKAGE_VERSION, VITE_APP_IDENTIFIER } = import.meta.env;

export function pluginInsertAppIdentifierToRequest(): ZodiosPlugin {
    return {
        request: async (_, config) => {
            return {
                ...config,
                headers: {
                    ...config.headers,
                    'x-app-identifier': `${VITE_APP_IDENTIFIER}/${PACKAGE_VERSION}`,
                },
            };
        },
    };
}
