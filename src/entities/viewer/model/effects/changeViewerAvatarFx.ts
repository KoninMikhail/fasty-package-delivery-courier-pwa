import { createEffect } from 'effector';
import { apiClient, User } from '@/shared/api';

export const changeViewerAvatarFx = createEffect<string, User, Error>(
    async (upload) => {
        try {
            return await apiClient.uploadViewerAvatar({
                upload,
            });
        } catch (error: unknown) {
            console.log('error', error);
            throw error;
        }
    },
);
