import { apiClient } from '@/shared/api';
import { createEffect } from 'effector';

export const logoutFx = createEffect<void, unknown, Error>({
    name: 'logoutFx',
    handler: async () => apiClient.logoutMe({}),
});
