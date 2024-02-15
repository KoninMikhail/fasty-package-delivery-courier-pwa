import axios from 'axios';
import Cookies from 'js-cookie';
import { removeSessionFx } from '@/shared/auth/effects';

/**
 * Create an axios instance with default configuration
 */
const { PACKAGE_VERSION, VITE_APP_IDENTIFIER } = import.meta.env;
const API_BASE_URL = import.meta.env.VITE_COURIERS_API_BASE_URL;
const COOKIE_NAME = import.meta.env.VITE_JWT_TOKEN_COOKIE_KEY;

/**
 * Axios instance
 */
export const instance = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
        'x-app-identifier': `${VITE_APP_IDENTIFIER}/${PACKAGE_VERSION}`,
    },
});

/**
 * Interceptor for Auth token
 */

instance.interceptors.request.use((config) => {
    const session = Cookies.get(COOKIE_NAME);
    const token = session ? JSON.parse(session)?.token : '';
    const headers = {
        Authorization: `Bearer ${token}`,
        ...config.headers,
    };
    return { ...config, headers };
});

/**
 * Interceptor for request errors
 */
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            void removeSessionFx();
        }
        return Promise.reject(error);
    },
);

instance.interceptors.request.use((config) => {
    const urlToReplace = '/users/me';
    if (config.url?.includes(urlToReplace)) {
        return { ...config, url: config.url.replace(urlToReplace, '/me') };
    }
    return config;
});
