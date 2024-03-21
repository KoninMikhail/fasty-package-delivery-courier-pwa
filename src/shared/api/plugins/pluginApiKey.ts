import { ZodiosPlugin } from '@zodios/core';

export interface ApiKeyPluginConfig {
    getApiKey: () => string;
}

export function pluginApiKey(provider: ApiKeyPluginConfig): ZodiosPlugin {
    return {
        request: async (_, config) => {
            return {
                ...config,
                headers: {
                    ...config.headers,
                    Authorization: `Bearer ${provider.getApiKey()}`,
                },
            };
        },
    };
}
