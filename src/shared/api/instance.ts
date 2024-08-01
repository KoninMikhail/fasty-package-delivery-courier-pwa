import axios from 'axios';
import axiosRetry from 'axios-retry';
import { sharedConfigConstants } from '@/shared/config';
import { axiosAuthErrorInterceptor } from './middleware';

/**
 * Create an axios instance with default configuration
 */
const { PACKAGE_VERSION } = import.meta.env;
const { APP_IDENTIFIER } = sharedConfigConstants;
export const API_BASE_URL = import.meta.env.VITE_COURIERS_API_BASE_URL;
export const API_VERSION = import.meta.env.VITE_COURIERS_API_VERSION;

/**
 * Axios instance
 */
export const instance = axios.create({
    baseURL: `${API_BASE_URL}/${API_VERSION}`,
    headers: {
        'x-app-identifier': `${APP_IDENTIFIER}/${PACKAGE_VERSION}`,
    },
});

axiosRetry(instance, { retries: 3 });

/**
 * Add an interceptor to handle 401 errors
 */
instance.interceptors.response.use(undefined, axiosAuthErrorInterceptor);
