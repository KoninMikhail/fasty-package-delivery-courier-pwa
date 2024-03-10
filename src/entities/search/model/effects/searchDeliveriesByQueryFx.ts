import { createEffect } from 'effector';
import { apiClient, Delivery } from '@/shared/api';

export const searchDeliveriesByQueryFx = createEffect<
    string,
    Delivery[],
    Error
>({
    handler: async (query: string) => {
        return apiClient.searchDeliveriesByQuery({
            queries: {
                query,
            },
        });
    },
});
