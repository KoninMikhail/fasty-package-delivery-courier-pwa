import axios from 'axios';
import axiosRetry from 'axios-retry';
import {
    axiosAuthErrorInterceptor,
    axiosRewriteUrlInterceptor,
} from './middleware';

/**
 * Create an axios instance with default configuration
 */
const { PACKAGE_VERSION, VITE_APP_IDENTIFIER } = import.meta.env;
const API_BASE_URL = import.meta.env.VITE_COURIERS_API_BASE_URL;

/**
 * Axios instance
 */
export const instance = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
        'x-app-identifier': `${VITE_APP_IDENTIFIER}/${PACKAGE_VERSION}`,
    },
});

axiosRetry(instance, { retries: 3 });

/**
 * Add an interceptor to handle 401 errors
 */
instance.interceptors.response.use(undefined, axiosAuthErrorInterceptor);
/**
 * Rewrite the URL to replace `/users/me` with `/me`
 */
instance.interceptors.request.use(axiosRewriteUrlInterceptor);
