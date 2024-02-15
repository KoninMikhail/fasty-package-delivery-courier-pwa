import { createEffect, createStore } from 'effector';
import { apiClient } from '@/shared/api';

export const getInProgressDeliveriesFx = createEffect(async () =>
    apiClient.getActiveDeliveries(),
);

export const $inProgressDeliveries = createStore([]).on(
    getInProgressDeliveriesFx.doneData,
    (_, data) => data,
);
