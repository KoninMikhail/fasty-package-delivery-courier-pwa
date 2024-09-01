import { createEvent, createStore, sample } from 'effector';
import { FilterDeliveriesByTimeRange } from '@/features/delivery/filterDeliveriesByTimeRange';
import { combineEvents, condition, empty } from "patronum";
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
} from '../config'
import { networkModel } from '@/entities/viewer';

const { isUnAuthorizedError } = sharedLibTypeGuards;

/**
 * Extends
 */

export const { $$isOnline} = networkModel;

/**
 * Events
 */
export const init = createEvent();
export const fetchData = createEvent();
export const dataUpdated = createEvent();
export const reset = createEvent();




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

const initOnline = createEvent();
const initOffline = createEvent();

export const $isInitialized = createStore<boolean>(false)
    .on(
        combineEvents({
                events: [
                    RevalidateSubwayStationsList.done,
                    fetchMyDeliveriesModel.deliveriesFetched,
                ],
            reset: init,
    }), () => true)
    .on(initOffline, () => true)
    .reset(reset);

condition({
    source: init,
    if: $$isOnline,
    then: initOnline,
    else: initOffline,
})

sample({
    clock: init,
    source: $isInitialized,
    filter: (initialized) => !initialized,
    target: [RevalidateSubwayStationsList.check, fetchMyDeliveriesModel.fetch],
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

/*
 * Reset
 */
sample({
    clock: reset,
    target: [resetDeliveries, fetchMyDeliveriesModel.reset],
});
