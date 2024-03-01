import { createEffect } from 'effector';
import { apiClient, User } from '@/shared/api';

export const getViewerProfileDataFx = createEffect<void, User>({
    name: 'getViewerProfileDataFx',
    handler: async () => apiClient.getMe(),
});
