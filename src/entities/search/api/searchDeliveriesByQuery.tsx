import { createEffect } from 'effector';
import { apiClient } from '@/shared/api';

export const searchDeliveriesByQueryFx = createEffect({
    handler: async (query: string) => {
        try {
            return await apiClient.searchDeliveriesByQuery({
                queries: {
                    query,
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    },
});
