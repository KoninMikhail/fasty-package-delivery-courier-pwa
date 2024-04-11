import { createEffect } from 'effector';
import { apiClient, User } from '@/shared/api';

/**
 * Effect for fetching the profile of the currently authenticated user.
 *
 * This effect encapsulates the asynchronous operation of requesting the authenticated
 * user's profile information from the backend API. It leverages the `getMe` method
 * of the `apiClient`, which is designed to fetch user details based on the current
 * authentication context (e.g., session token or cookies).
 *
 * The effect does not require any input parameters, as the API determines the currently
 * authenticated user based on the session or authentication token. However, it returns
 * the user's profile information in the form of a `User` object upon successful completion
 * of the API call.
 *
 * This is a crucial part of the application's user management system, providing an easy
 * way to access the logged-in user's details for display or further processing within the
 * application.
 */
export const getViewerProfileFx = createEffect<void, User>(async () => {
    try {
        return await apiClient.getMe();
    } catch (error: unknown) {
        if (error instanceof Error) throw new Error(error.message);
        throw error;
    }
});
