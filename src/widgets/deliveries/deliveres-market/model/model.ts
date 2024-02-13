import { createEffect, createStore, sample } from 'effector';
import { couriersApi, Delivery } from '@/shared/api';
import { createGate } from 'effector-react';

export const MarketGate = createGate();

const fetchUpcomingDeliveriesFx = createEffect(async () => {
    return couriersApi.fetchUpcomingDeliveries();
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
