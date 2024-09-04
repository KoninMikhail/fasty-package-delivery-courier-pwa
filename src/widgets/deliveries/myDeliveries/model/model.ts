import { createEvent, createStore, sample } from 'effector';
import { FilterDeliveriesByTimeRange } from '@/features/delivery/filterDeliveriesByTimeRange';
import { and, combineEvents, delay, empty, not } from 'patronum';
import { FetchDeliveriesByParameters } from '@/features/delivery/fetchDeliveriesByParams';
import { RevalidateSubwayStationsList } from '@/features/route/revalidateSubwayStationsList';
import { getMyDeliveriesFx } from '@/entities/delivery';
import { sharedLibTypeGuards } from '@/shared/lib';
import { RefreshToken } from '@/features/auth/refreshToken';
import { isEmpty } from '@/shared/lib/type-guards';
import {
    $myDeliveriesStore,
    $myDeliveriesStoreSorted,
    resetDeliveries,
    setDeliveries,
} from './stores';
import {
    DELIVERY_END_TIME,
    DELIVERY_START_TIME,
    DELIVERY_TIME_STEP,
} from '../config';

const { isUnAuthorizedError } = sharedLibTypeGuards;

/**
 * Extends
 */

/**
 * Events
 */
export const init = createEvent();
export const initOffline = createEvent();
export const setOffline = createEvent<boolean>();
export const fetchData = createEvent();
export const dataUpdated = createEvent();
export const reset = createEvent();

export const $isOffline = createStore<boolean>(false)
    .on(initOffline, () => true)
    .on(setOffline, (_, payload) => payload)
    .reset(init, reset);

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

sample({
    clock: fetchMyDeliveriesModel.deliveriesFetchFailed,
    filter: (error) => isUnAuthorizedError(error),
    target: RefreshToken.tokenRefreshRequested,
});
sample({
    clock: RefreshToken.updateTokenSuccess,
    source: fetchMyDeliveriesModel.$errors,
    filter: (errors) => !isEmpty(errors),
    target: fetchData,
});

/**
 * init
 */
export const $isInitialized = createStore<boolean>(false)
    .on(
        combineEvents({
            events: [
                RevalidateSubwayStationsList.done,
                fetchMyDeliveriesModel.deliveriesFetched,
            ],
            reset: init,
        }),
        () => true,
    )
    .on(initOffline, () => true)
    .reset(reset);

sample({
    clock: delay(init, 400),
    source: and(not($isInitialized), not($isOffline)),
    filter: (allowed) => !!allowed,
    target: fetchMyDeliveriesModel.fetch,
});

sample({
    clock: init,
    source: and(not($isInitialized), not($isOffline)),
    filter: (allowed) => !!allowed,
    target: RevalidateSubwayStationsList.check,
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
 * Refetch when online
 */

sample({
    clock: delay($isOffline, 300),
    source: $isInitialized,
    filter: (isInit, isOffline) => isInit && isOffline === false,
    fn: (isOnline) => !isOnline,
    target: fetchMyDeliveriesModel.fetch,
});

/*
 * Reset
 */
sample({
    clock: delay(reset, 300),
    source: $isInitialized,
    filter: (isInit) => isInit,
    target: [resetDeliveries, fetchMyDeliveriesModel.reset],
});
