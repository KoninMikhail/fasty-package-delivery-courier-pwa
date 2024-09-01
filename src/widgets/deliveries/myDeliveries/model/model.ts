import { createEvent, createStore, sample } from 'effector';
import { FilterDeliveriesByTimeRange } from '@/features/delivery/filterDeliveriesByTimeRange';
import { combineEvents, empty } from 'patronum';
import { FetchDeliveriesByParameters } from '@/features/delivery/fetchDeliveriesByParams';
import { RevalidateSubwayStationsList } from '@/features/route/revalidateSubwayStationsList';
import {
    $myDeliveriesStore,
    $myDeliveriesStoreSorted,
    resetDeliveries,
    setDeliveries,
} from './stores';
import { getMyDeliveriesFx } from './effects';
import {
    DELIVERY_END_TIME,
    DELIVERY_START_TIME,
    DELIVERY_TIME_STEP,
} from '../config';

/**
 * Events
 */
export const init = createEvent();
export const initOffline = createEvent();
export const setOnline = createEvent<boolean>();
export const fetchData = createEvent();
export const dataUpdated = createEvent();
export const reset = createEvent();

/**
 * Network
 */
export const $isOnline = createStore<boolean>(true)
    .on(initOffline, () => false)
    .on(setOnline, (_, payload) => payload)
    .reset(init)
    .reset(reset);

/**
 * Data fetching
 */

const fetchMyDeliveriesModel = FetchDeliveriesByParameters.factory.createModel({
    provider: getMyDeliveriesFx,
    pagination: createStore({ limit: 100 }),
});

sample({
    clock: fetchData,
    target: fetchMyDeliveriesModel.fetch,
});

sample({
    clock: fetchMyDeliveriesModel.deliveriesFetched,
    target: setDeliveries,
});

sample({
    clock: fetchMyDeliveriesModel.deliveriesFetched,
    target: dataUpdated,
});

/**
 * init
 */
const initComplete = combineEvents({
    events: [
        RevalidateSubwayStationsList.done,
        fetchMyDeliveriesModel.deliveriesFetched,
    ],
    reset: init,
});

export const $isInitialized = createStore<boolean>(false)
    .on(initComplete, () => true)
    .on(initOffline, () => true)
    .reset(reset);

// Online
sample({
    clock: init,
    source: $isInitialized,
    filter: (initialized) => !initialized,
    target: RevalidateSubwayStationsList.check,
});

sample({
    clock: init,
    source: $isInitialized,
    filter: (initialized) => !initialized,
    target: fetchMyDeliveriesModel.fetch,
});

/**
 * State
 */
export const $$empty = empty($myDeliveriesStore);
export const $$inPending = fetchMyDeliveriesModel.$pending;

/**
 * Filters
 */
export const filteredDeliveriesByTimeModel =
    FilterDeliveriesByTimeRange.factory.createModel({
        startTime: DELIVERY_START_TIME,
        endTime: DELIVERY_END_TIME,
        stepMins: DELIVERY_TIME_STEP,
        sourceStore: $myDeliveriesStoreSorted,
    });

/**
 * Reset
 */

sample({
    clock: reset,
    target: [resetDeliveries, fetchMyDeliveriesModel.reset],
});
