import { createEvent, createStore, sample } from 'effector';
import { FilterDeliveriesByTimeRange } from '@/features/delivery/filterDeliveriesByTimeRange';
import { sharedLibTypeGuards } from '@/shared/lib';
import { debug, empty } from 'patronum';
import { FetchDeliveriesByParameters } from '@/features/delivery/fetchDeliveriesByParams';
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

const { isEmpty } = sharedLibTypeGuards;

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
const initCompleted = createEvent();

export const $isInitialized = createStore<boolean>(false)
    .on(initCompleted, () => true)
    .reset(reset);

// Online
sample({
    clock: init,
    source: $isInitialized,
    filter: (initialized) => !initialized,
    target: fetchMyDeliveriesModel.fetch,
});

sample({
    clock: fetchMyDeliveriesModel.deliveriesFetched,
    target: initCompleted,
});

// Offline
sample({
    clock: initOffline,
    target: initCompleted,
});

/**
 * State
 */
export const $$empty = empty($myDeliveriesStore);
export const $$inPending = fetchMyDeliveriesModel.$pending;

/**
 * Errors
 */
export const { $errors } = fetchMyDeliveriesModel;
export const $$hasError = $errors.map((errors) => !isEmpty(errors));

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

debug(filteredDeliveriesByTimeModel.$filteredDeliveries);

/**
 * Reset
 */

sample({
    clock: reset,
    target: [resetDeliveries, fetchMyDeliveriesModel.reset],
});
