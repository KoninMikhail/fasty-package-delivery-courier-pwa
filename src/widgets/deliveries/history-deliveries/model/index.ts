import { createEffect, createStore } from 'effector';
import { apiClient } from '@/shared/api';

export const getDeliveriesHistoryFx = createEffect(async () =>
    apiClient.getDeliveriesHistory(),
);
export const $deliveriesHistoryList = createStore([]).on(
    getDeliveriesHistoryFx.doneData,
    (_, data) => data,
);
