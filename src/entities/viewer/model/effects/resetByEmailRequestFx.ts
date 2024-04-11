import { createEffect } from 'effector';
import { apiClient, ResetPasswordRequest } from '@/shared/api';
import { AxiosError } from 'axios';
import { sharedConfigLocale } from '@/shared/config';

const { ErrorMessageKeys } = sharedConfigLocale;

// Constants for handling errors.
const SERVER_ERROR_CODE = 500;

/**
 * Effect to handle password reset request by email.
 * It sends the `ResetPasswordRequest` payload to the server via the API client.
 *
 * This effect encapsulates the async operation of initiating a password reset,
 * handling success, and dealing with potential errors that might occur during the API call.
 *
 * In the event of a server error (HTTP 500), it throws a server-specific error.
 * For all other errors, it throws a general unknown error to simplify error handling upstream.
 *
 * @param credentials - `ResetPasswordRequest` object containing the user's email.
 * @returns A promise that resolves to `void` on success.
 *
 * @throws {Error} - An error with a message corresponding to the encountered issue.
 */
export const resetByEmailRequestFx = createEffect<
    ResetPasswordRequest,
    void,
    Error
>(async (credentials) => {
    try {
        // Attempt to send a password reset request via the API client.
        return await apiClient.forgotPassword(credentials);
    } catch (error: unknown) {
        // Custom error handling for Axios errors, specifically checking for a 500 status code.
        if (
            error instanceof AxiosError &&
            error.response?.status === SERVER_ERROR_CODE
        ) {
            throw new Error(ErrorMessageKeys.ERROR_SERVER);
        }
        // Fallback error handling for any other unknown errors.
        throw new Error(ErrorMessageKeys.ERROR_UNKNOWN);
    }
});
