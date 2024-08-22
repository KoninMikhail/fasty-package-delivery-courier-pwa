import { createEffect } from 'effector';
import { apiClient, Delivery } from '@/shared/api';

export const searchDeliveriesByQueryFx = createEffect<string, Delivery[]>(
    async (query) => {
        return apiClient.searchDeliveriesByQuery({
            queries: {
                query,
            },
        });
    },
);
