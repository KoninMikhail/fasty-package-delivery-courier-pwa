// Import necessary dependencies and types.
import { apiClient, AuthResponse, LoginByEmailCredentials } from '@/shared/api';
import { createEffect } from 'effector';
import { AxiosError } from 'axios';
import { sharedConfigLocale, sharedConfigConstants } from '@/shared/config';
import httpStatus from 'http-status';
import Cookies from 'js-cookie';
import { z } from 'zod';

const { ErrorMessageKeys } = sharedConfigLocale;
const { APP_JWT_ACCESS_TOKEN_KEY, APP_JWT_REFRESH_TOKEN_KEY } =
    sharedConfigConstants;

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
        const { user, tokens } = await apiClient.authByEmail(credentials);

        Cookies.set(APP_JWT_ACCESS_TOKEN_KEY, tokens.access.token, {
            expires: tokens.access.expires,
        });
        Cookies.set(APP_JWT_REFRESH_TOKEN_KEY, tokens.refresh.token, {
            expires: tokens.refresh.expires,
        });
        return { user, tokens };
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            // Iterate over the errors and log them
            for (const error_ of error.errors) {
                console.error(
                    `Error at path ${error_.path.join('.')}: ${error_.message}`,
                );
            }
        }

        // Handle errors from the API call.
        if (error instanceof AxiosError) {
            // Check if the error is due to unauthorized access.
            if (error.response?.status === httpStatus.UNAUTHORIZED) {
                throw new Error(ErrorMessageKeys.ERROR_UNAUTHORIZED);
            }
            // Check if the error is due to an issue on the server.
            if (error.response?.status === httpStatus.INTERNAL_SERVER_ERROR) {
                throw new Error(ErrorMessageKeys.ERROR_SERVER);
            }
        }
        // For unknown errors, throw a generic error message.
        throw new Error(ErrorMessageKeys.ERROR_UNKNOWN);
    }
});
