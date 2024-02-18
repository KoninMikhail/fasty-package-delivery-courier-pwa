import { createEffect, createStore, sample } from 'effector';
import { apiClient, Delivery } from '@/shared/api';
import { AppGate } from '@/shared/lib/app';

const fetchUpcomingDeliveriesFx = createEffect(async () => {
    return apiClient.fetchUpcomingDeliveries();
});

export const $avaliableDeliveries = createStore<Delivery[]>([]);
export const $isDeliveriesLoading = fetchUpcomingDeliveriesFx.pending;

sample({
    clock: AppGate.open,
    target: fetchUpcomingDeliveriesFx,
});

sample({
    clock: fetchUpcomingDeliveriesFx.doneData,
    target: $avaliableDeliveries,
});
