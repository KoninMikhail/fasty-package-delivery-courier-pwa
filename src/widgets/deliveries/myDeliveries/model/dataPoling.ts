import { createStore, createEvent, sample } from 'effector';
import { interval } from 'patronum';
import { getMyDeliveriesFx } from '@/entities/delivery';
import { sharedConfigNetwork } from '@/shared/config';
import { DATA_POLLING_TIMEOUT } from '../config';

const { $isOnline } = sharedConfigNetwork;

export const startPolling = createEvent();
export const stopPolling = createEvent();

const { tick } = interval({
    timeout: DATA_POLLING_TIMEOUT,
    start: startPolling,
    stop: stopPolling,
});

const $isDataExpired = createStore(true)
    .on(tick, () => true)
    .on(getMyDeliveriesFx.done, () => false)
    .on($isOnline, (state, online) => (online ? state : true));

sample({
    clock: startPolling,
    target: getMyDeliveriesFx,
});

sample({
    clock: [$isDataExpired, $isOnline],
    source: {
        isExpired: $isDataExpired,
        online: $isOnline,
    },
    filter: ({ isExpired, online }) => isExpired && online,
    target: getMyDeliveriesFx,
});

export const $inPending = getMyDeliveriesFx.pending;
