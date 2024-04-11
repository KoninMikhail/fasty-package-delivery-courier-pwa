import { createEffect } from 'effector';
import { apiClient, User } from '@/shared/api';

export const changeViewerAvatarFx = createEffect<string, User, Error>(
    async (upload) => {
        try {
            return await apiClient.uploadViewerAvatar({
                upload,
            });
        } catch (error: unknown) {
            if (error instanceof Error) throw new Error(error.message);
            throw error;
        }
    },
);
