import { mergeApis, Zodios } from '@zodios/core';
import Cookies from 'js-cookie';
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

const COOKIE_NAME = import.meta.env.VITE_JWT_TOKEN_COOKIE_KEY;

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
        getApiKey: async () => {
            return Cookies.get(COOKIE_NAME) || '';
        },
    }),
);
apiClient.use(
    'authByEmail',
    pluginSetApiKey({
        setApiKey: async (token) => {
            Cookies.set(COOKIE_NAME, token, {
                expires: SESSION_EXPIRATION_DAYS,
            });
        },
    }),
);
apiClient.use('logoutMe', pluginRemoveApiKey({ cookieName: COOKIE_NAME }));

export * from './schemas';
export * from './types';
