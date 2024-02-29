import axios from 'axios';

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
        'Content-Type': 'application/json',
        'x-app-identifier': `${VITE_APP_IDENTIFIER}/${PACKAGE_VERSION}`,
    },
});

/**
 * Rewrite the URL to replace `/users/me` with `/me`
 */
instance.interceptors.request.use((config) => {
    const urlToReplace = '/users/me';
    if (config.url?.includes(urlToReplace)) {
        return { ...config, url: config.url.replace(urlToReplace, '/me') };
    }
    return config;
});
