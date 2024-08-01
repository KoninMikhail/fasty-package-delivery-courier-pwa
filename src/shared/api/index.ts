import { mergeApis, Zodios } from '@zodios/core';
import Cookies from 'js-cookie';
import { sharedConfigConstants } from '@/shared/config';
import { authApi, deliveriesApi, usersApi, subwayApi } from './parts';
import { instance } from './instance';
import { pluginApiKey } from './plugins/pluginApiKey';

const { APP_JWT_ACCESS_TOKEN_KEY } = sharedConfigConstants;

export const apis = mergeApis({
    '/auth': authApi,
    '/deliveries': deliveriesApi,
    '/users': usersApi,
    '/subways': subwayApi,
});

export const apiClient = new Zodios(apis, {
    axiosInstance: instance,
});

/**
 * Plugins
 */
apiClient.use(
    pluginApiKey({
        getApiKey: () => {
            return Cookies.get(APP_JWT_ACCESS_TOKEN_KEY) || '';
        },
    }),
);

export * from './schemas';
export * from './types';
