import { AxiosError } from 'axios';
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
