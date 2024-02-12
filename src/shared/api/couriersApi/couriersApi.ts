import { Zodios } from '@zodios/core';
import { pluginInsertAppIdentifierToRequest } from '@/shared/api/couriersApi/plugins/pluginInsertAppIdentifier';
import { getSessionFx } from '@/shared/auth/effects';
import { pluginInsertAuthTokenToRequest } from './plugins';
import * as endpoints from './endpoints';

const API_BASE_URL = import.meta.env.VITE_COURIERS_API_BASE_URL;

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
            return (await getSessionFx().then((data) => data.token)) || '';
        },
    }),
);
couriersApi.use(pluginInsertAppIdentifierToRequest());
