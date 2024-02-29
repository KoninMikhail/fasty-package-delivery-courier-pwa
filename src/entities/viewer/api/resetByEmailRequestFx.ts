import { createEffect } from 'effector';
import { apiClient, ResetPasswordRequest } from '@/shared/api';
import { debug } from 'patronum';

export const resetByEmailRequestFx = createEffect<
    ResetPasswordRequest,
    void,
    Error
>(async (credentials) => {
    return apiClient.forgotPassword(credentials);
});

debug(resetByEmailRequestFx);
