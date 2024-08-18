import { createEffect } from 'effector';
import { apiClient } from '@/shared/api';
import Cookies from 'js-cookie';
import { sharedConfigConstants } from '@/shared/config';

const { APP_JWT_REFRESH_TOKEN_KEY, APP_JWT_ACCESS_TOKEN_KEY } =
    sharedConfigConstants;

/**
 * Effect for handling user logout.
 *
 * This effect encapsulates the asynchronous operation of logging out the user
 * from the application. It makes a call to the backend API through the `logoutMe` method
 * of the `apiClient`, which is expected to terminate the user's session or remove authentication tokens.
 *
 * Although the effect does not take any parameters (input is void) or return any meaningful
 * data (output is marked as unknown), it is crucial for managing authentication states within
 * the application. By standardizing logout operations within this effect, we can easily monitor,
 * manage, or react to logout operations across different parts of the application.
 *
 * @returns A promise that resolves when the logout operation has completed. The actual output
 *          from `apiClient.logoutMe` is not exposed, indicating that the callers should not depend
 *          on the result of this effect for further operations.
 *
 * @throws {Error} If the logout operation fails, the effect will throw an Error. The specifics
 *                 of the error are encapsulated within the effect handler and are determined
 *                 by the behavior of `apiClient.logoutMe` and any error handling logic implemented
 *                 within it.
 */
export const logoutFx = createEffect<void, unknown, Error>({
    name: 'logoutFx', // Giving a name to the effect for debuggability and reference.
    handler: async () => {
        const refreshToken = Cookies.get(APP_JWT_REFRESH_TOKEN_KEY);

        if (refreshToken) {
            // Perform the logout operation using the API client. Details of the operation,
            // including error handling, are managed within the apiClient.logoutMe method.
            await apiClient.logout({
                refreshToken,
            });
            Cookies.remove(APP_JWT_ACCESS_TOKEN_KEY);
            Cookies.remove(APP_JWT_REFRESH_TOKEN_KEY);
        }
    },
});
