// Import necessary dependencies and types.
import { apiClient, AuthResponse, LoginByEmailCredentials } from '@/shared/api';
import { createEffect } from 'effector';
import { AxiosError } from 'axios';
import { sharedConfigLocale } from '@/shared/config';

const { ErrorMessageKeys } = sharedConfigLocale;

// Constants for error handling.
const UNAUTHORIZED_ERROR_CODE = 401;
const SERVER_ERROR_CODE = 500;

/**
 * Create an effect to handle authentication by email.
 *
 * This effect uses the `apiClient.authByEmail` method to attempt user
 * authentication with the provided credentials. In the event of a known
 * error (e.g., unauthorized or server error), it throws a descriptive
 * error. For all other cases, it throws a generic error message.
 *
 * @param {LoginByEmailCredentials} credentials The user's login credentials.
 * @returns {Promise<AuthResponse>} A promise that resolves to the user's auth data.
 */
export const authByEmailFx = createEffect<
    LoginByEmailCredentials,
    AuthResponse,
    Error
>(async (credentials) => {
    try {
        // Attempt to authenticate the user with the provided credentials.
        return await apiClient.authByEmail(credentials);
    } catch (error: unknown) {
        // Handle errors from the API call.
        if (error instanceof AxiosError) {
            // Check if the error is due to unauthorized access.
            if (error.response?.status === UNAUTHORIZED_ERROR_CODE) {
                throw new Error(ErrorMessageKeys.ERROR_UNAUTHORIZED);
            }
            // Check if the error is due to an issue on the server.
            if (error.response?.status === SERVER_ERROR_CODE) {
                throw new Error(ErrorMessageKeys.ERROR_SERVER);
            }
        }
        // For unknown errors, throw a generic error message.
        throw new Error(ErrorMessageKeys.ERROR_UNKNOWN);
    }
});
