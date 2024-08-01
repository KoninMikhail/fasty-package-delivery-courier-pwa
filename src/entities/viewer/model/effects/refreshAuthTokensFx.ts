import { createEffect } from 'effector';
import { apiClient } from '@/shared/api';
import Cookies from 'js-cookie';
import { sharedConfigConstants } from '@/shared/config';

const { APP_JWT_REFRESH_TOKEN_KEY, APP_JWT_ACCESS_TOKEN_KEY } =
    sharedConfigConstants;

export const refreshAuthTokensFx = createEffect<void, void>(async () => {
    try {
        const refreshToken = Cookies.get(APP_JWT_REFRESH_TOKEN_KEY);

        if (!refreshToken) {
            throw new Error('No refresh token found');
        }

        const { refresh, access } = await apiClient.refreshToken({
            refreshToken,
        });

        Cookies.set(APP_JWT_REFRESH_TOKEN_KEY, refresh.token, {
            expires: refresh.expires,
            secure: true, // Ensure secure flag
            sameSite: 'strict', // Ensure sameSite policy
        });

        Cookies.set(APP_JWT_ACCESS_TOKEN_KEY, access.token, {
            expires: access.expires,
            secure: true, // Ensure secure flag
            sameSite: 'strict', // Ensure sameSite policy
        });
    } catch (error) {
        console.error('Failed to refresh tokens:', error);
        // Optional: Add more error handling logic
    }
});
