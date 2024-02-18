import { createEffect, createStore, sample } from 'effector';
import { apiClient, Delivery } from '@/shared/api';
import { createGate } from 'effector-react';

export const MarketGate = createGate();

const fetchUpcomingDeliveriesFx = createEffect(async () => {
    return apiClient.fetchUpcomingDeliveries();
});

export const $avaliableDeliveries = createStore<Delivery[]>([]);
export const $isDeliveriesLoading = fetchUpcomingDeliveriesFx.pending;

sample({
    clock: MarketGate.open,
    target: fetchUpcomingDeliveriesFx,
});

sample({
    clock: fetchUpcomingDeliveriesFx.doneData,
    target: $avaliableDeliveries,
});
