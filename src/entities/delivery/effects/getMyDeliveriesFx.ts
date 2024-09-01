import { createEffect } from 'effector';
import { apiClient, MyDelivery } from '@/shared/api';

export const getMyDeliveriesFx = createEffect<{ limit: number }, MyDelivery[]>(
    async ({ limit }) => {
        return apiClient.getMyDeliveries({
            queries: {
                limit,
            },
        });
    },
);
