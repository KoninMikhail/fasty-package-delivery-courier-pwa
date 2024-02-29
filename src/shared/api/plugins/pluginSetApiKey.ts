import { ZodiosPlugin } from '@zodios/core';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '@/shared/api/types/AuthTypes';

interface PluginSetApiKeyConfig {
    setApiKey: (token: string) => Promise<void>;
}

export function pluginSetApiKey(provider: PluginSetApiKeyConfig): ZodiosPlugin {
    return {
        response: async (_, request, response: AxiosResponse<AuthResponse>) => {
            const { data } = response;
            const { token } = data;
            if (token) {
                await provider.setApiKey(token);
            }
            return response;
        },
    };
}
