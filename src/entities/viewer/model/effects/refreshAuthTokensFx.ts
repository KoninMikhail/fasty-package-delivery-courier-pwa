import { createEffect } from 'effector';
import { apiClient, AuthTokens, AuthTokensSchema } from '@/shared/api';
import Cookies from 'js-cookie';
import { sharedConfigConstants } from '@/shared/config';

const { APP_JWT_REFRESH_TOKEN_KEY, APP_JWT_ACCESS_TOKEN_KEY } =
    sharedConfigConstants;

export const refreshAuthTokensFx = createEffect<void, AuthTokens>(async () => {
    try {
        const refreshToken = Cookies.get(APP_JWT_REFRESH_TOKEN_KEY);

        if (!refreshToken) {
            throw new Error('Refresh token is not found');
        }

        const response = await apiClient.refreshToken({
            refreshToken,
        });
        const { refresh, access } = AuthTokensSchema.parse(response);

        Cookies.set(APP_JWT_REFRESH_TOKEN_KEY, refresh.token, {
            expires: refresh.expires,
        });
        Cookies.set(APP_JWT_ACCESS_TOKEN_KEY, access.token, {
            expires: access.expires,
        });
        return response;
    } catch {
        throw new Error('Failed to refresh tokens');
    }
});
