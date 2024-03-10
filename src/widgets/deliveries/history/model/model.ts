import { Delivery } from '@/shared/api';
import { createStore, sample } from 'effector';
import { getDeliveriesHistoryFx } from '@/widgets/deliveries/history/api';
import { debug } from 'patronum';

export const $history = createStore<Delivery[]>([]);

sample({
    clock: getDeliveriesHistoryFx.doneData,
    target: $history,
});

debug($history);
