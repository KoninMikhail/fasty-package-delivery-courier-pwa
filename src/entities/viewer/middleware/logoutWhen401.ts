import { instance } from '@/shared/api/instance';
import { logoutFx } from '../api';

/**
 * Interceptor for request errors
 */
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            logoutFx({});
        }
        return Promise.reject(error);
    },
);
