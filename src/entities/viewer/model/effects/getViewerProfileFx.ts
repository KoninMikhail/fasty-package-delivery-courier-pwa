import { createEffect } from 'effector';
import { apiClient, User } from '@/shared/api';

export const getViewerProfileFx = createEffect<void, User>({
    name: 'getViewerProfileFx',
    handler: async () => apiClient.getMe(),
});
