import { createEffect } from 'effector';
import { apiClient, User } from '@/shared/api';

export const changeViewerAvatarFx = createEffect<File, User, Error>(
    async (upload) => {
        const formData = new FormData();

        formData.append('image', upload);

        try {
            return await apiClient.uploadViewerAvatar(formData);
        } catch (error: unknown) {
            if (error instanceof Error) throw new Error(error.message);
            throw error;
        }
    },
);
