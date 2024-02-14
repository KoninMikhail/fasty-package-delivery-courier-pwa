import { createEffect, createStore } from 'effector';
import { apiClient } from '@/shared/api';

export const getInProgressDeliveriesFx = createEffect(async () =>
    apiClient.fetchActiveDeliveries(),
);

export const $inProgressDeliveries = createStore([]).on(
    getInProgressDeliveriesFx.doneData,
    (_, data) => data,
);
