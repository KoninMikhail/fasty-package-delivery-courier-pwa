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
 *
 * @returns A promise that resolves to a `User` object containing the authenticated user's
 *          profile information. This information typically includes identifiers, names,
 *          email addresses, and potentially other user-specific details as defined by the
 *          `User` type/interface.
 *
 * @throws {Error} If the fetch operation fails (e.g., due to network issues or if the API
 *                 endpoint returns an error), the effect will automatically convert this to
 *                 an Effector error event. It ensures that consumers of the effect can react
 *                 appropriately to failures, such as displaying error messages or triggering
 *                 fallback logic.
 */
export const getViewerProfileFx = createEffect<void, User>({
    name: 'getViewerProfileFx', // Names the effect for debugging and reference purposes.
    handler: async () => apiClient.getMe(), // Handler that performs the API call.
});
