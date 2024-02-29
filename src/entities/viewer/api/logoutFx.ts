import { apiClient } from '@/shared/api';
import { createEffect } from 'effector';

export const logoutFx = createEffect<void, void, Error>(async () => {
    return apiClient.logoutMe({});
});
