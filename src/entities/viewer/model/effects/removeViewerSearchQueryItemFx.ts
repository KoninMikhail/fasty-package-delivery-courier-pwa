import { createEffect } from 'effector';
import { apiClient } from '@/shared/api';

export const removeViewerSearchQueryItemFx = createEffect<string, unknown>(
    async (query) => {
        return apiClient.removeUserSearchQueryItem(undefined, {
            params: {
                query,
            },
        });
    },
);
