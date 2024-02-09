import { removeSessionFx } from '@/shared/auth/effects';
import axios, { AxiosError } from 'axios';

// Global Axios interceptor to handle 401 error responses
axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            void removeSessionFx();
        }
        return Promise.reject(error);
    },
);
