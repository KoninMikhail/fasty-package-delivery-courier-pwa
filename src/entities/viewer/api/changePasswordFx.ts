import { createEffect } from 'effector';
import { apiClient } from '@/shared/api';

export const changePasswordFx = createEffect(async (data: string) => {
    apiClient.changeUserPassword({ user, password });
});
