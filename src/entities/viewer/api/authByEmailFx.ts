import { apiClient, AuthResponse, LoginByEmailCredentials } from '@/shared/api';
import { createEffect } from 'effector';

export const authByEmailFx = createEffect<
    LoginByEmailCredentials,
    AuthResponse,
    Error
>(async (credentials) => {
    return apiClient.authByEmail(credentials);
});
