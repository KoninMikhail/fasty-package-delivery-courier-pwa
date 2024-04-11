import { mergeApis, Zodios } from '@zodios/core';
import Cookies from 'js-cookie';
import { sharedConfigConstants } from '@/shared/config';
import { SESSION_EXPIRATION_DAYS } from './config';
import { pluginApiKey, pluginSetApiKey, pluginRemoveApiKey } from './plugins';
import {
    logoutApi,
    authApi,
    deliveriesApi,
    usersApi,
    subwayApi,
    forgotPasswordApi,
} from './parts';
import { instance } from './instance';

const { APP_JWT_COOKIE_KEY } = sharedConfigConstants;

export const apis = mergeApis({
    '/login': authApi,
    '/deliveries': deliveriesApi,
    '/users': usersApi,
    '/subways': subwayApi,
    '/logout': logoutApi,
    '/forgotPassword': forgotPasswordApi,
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
            return Cookies.get(APP_JWT_COOKIE_KEY) || '';
        },
    }),
);
apiClient.use(
    'authByEmail',
    pluginSetApiKey({
        setApiKey: (token) => {
            Cookies.set(APP_JWT_COOKIE_KEY, token, {
                expires: SESSION_EXPIRATION_DAYS,
            });
        },
    }),
);
apiClient.use(
    'logoutMe',
    pluginRemoveApiKey({ cookieName: APP_JWT_COOKIE_KEY }),
);

export * from './schemas';
export * from './types';
