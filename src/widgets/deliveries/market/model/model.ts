import { createEffect, createStore, sample } from 'effector';
import { apiClient, Delivery } from '@/shared/api';

const fetchUpcomingDeliveriesFx = createEffect(async () => {
    return apiClient.fetchUpcomingDeliveries();
});

export const $avaliableDeliveries = createStore<Delivery[]>([]);
export const $isDeliveriesLoading = fetchUpcomingDeliveriesFx.pending;

/**
 * filters for deliveries
 */

const assignToDeliveryFx = createEffect(
    async ({ userId, deliveryId }: { userId: number; deliveryId: number }) => {
        await new Promise((res) => {
            setTimeout(res, 5000);
        });
        console.log('assignToDeliveryFx', userId, deliveryId);
    },
);

sample({
    clock: fetchUpcomingDeliveriesFx.doneData,
    target: $avaliableDeliveries,
});
