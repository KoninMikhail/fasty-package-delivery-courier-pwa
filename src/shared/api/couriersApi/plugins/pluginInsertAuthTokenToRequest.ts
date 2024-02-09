import { ZodiosPlugin } from '@zodios/core';

export interface InsertAuthTokenToRequestConfig {
    getToken: () => Promise<string>;
}

export function pluginInsertAuthTokenToRequest(
    provider: InsertAuthTokenToRequestConfig,
): ZodiosPlugin {
    return {
        request: async (_, config) => {
            return {
                ...config,
                headers: {
                    ...config.headers,
                    Authorization: `Bearer ${await provider.getToken()}`,
                },
            };
        },
    };
}
