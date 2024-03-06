import { createEffect } from 'effector';
import { apiClient, Delivery } from '@/shared/api';

export const getSearchResults = createEffect<string, Delivery[], Error>({
    handler: async (query) => {
        await apiClient.searchDeliveriesByQuery({
            queries: {
                q: query,
            },
        });
    },
    name: 'getSearchResults',
});
