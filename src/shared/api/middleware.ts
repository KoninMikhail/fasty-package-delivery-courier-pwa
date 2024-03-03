import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { createEvent } from 'effector';

export const onRequestFail = createEvent<AxiosError>();

/**
 * Axios interceptor to handle 401 errors
 * @param error
 */
export const axiosAuthErrorInterceptor = (
    error: AxiosError,
): Promise<AxiosError> => {
    onRequestFail(error);
    return Promise.reject(error);
};

/**
 * Axios interceptor to rewrite the URL to replace `/users/me` with `/me`
 * @param config
 */
export const axiosRewriteUrlInterceptor = (
    config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
    const urlToReplace = '/users/me';
    if (config.url?.includes(urlToReplace)) {
        return { ...config, url: config.url.replace(urlToReplace, '/me') };
    }
    return config;
};
