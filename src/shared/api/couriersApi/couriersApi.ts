import { Zodios } from '@zodios/core';
import Cookies from 'js-cookie';
import { pluginInsertAppIdentifierToRequest } from '@/shared/api/couriersApi/plugins/pluginInsertAppIdentifier';
import { pluginInsertAuthTokenToRequest } from './plugins';
import * as endpoints from './endpoints';

const API_BASE_URL = import.meta.env.VITE_COURIERS_API_BASE_URL;
const JWT_TOKEN_COOKIE_KEY = import.meta.env.VITE_JWT_TOKEN_COOKIE_KEY;

/**
 * Couriers Api instance
 */
export const couriersApi = new Zodios(API_BASE_URL, [
    ...endpoints.deliveriesApi,
    ...endpoints.usersApi,
]);

/**
 * Plugins
 */

couriersApi.use(
    pluginInsertAuthTokenToRequest({
        getToken: async () => {
            return Cookies.get(JWT_TOKEN_COOKIE_KEY) || '';
        },
    }),
);

couriersApi.use(
    pluginInsertAppIdentifierToRequest({
        getIdentifier: async () => {
            return `${import.meta.env.VITE_APP_IDENTIFIER}/${import.meta.env.PACKAGE_VERSION}`;
        },
    }),
);
