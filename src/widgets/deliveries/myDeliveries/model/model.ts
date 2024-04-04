import { createEvent, createStore, sample } from 'effector';
import { getMyDeliveriesFx } from '@/entities/delivery';
import { FilterDeliveriesByTimeRange } from '@/features/delivery/filterDeliveriesByTimeRange';
import { sessionModel } from '@/entities/viewer';
import { sharedLibHelpers } from '@/shared/lib';
import { $deliveriesStore } from './deliveriesStore';

import {
    DELIVERY_END_TIME,
    DELIVERY_START_TIME,
    DELIVERY_TIME_STEP,
} from '../config';

const { isEmpty } = sharedLibHelpers;

/**
 * Events
 */
export const init = createEvent();
const initCompleted = createEvent();
export const fetchData = createEvent();

/**
 * init
 */

const widgetInitialized = createStore<boolean>(false).on(
    initCompleted,
    () => true,
);

/**
 * State
 */
export const $$empty = $deliveriesStore.map((deliveries) =>
    isEmpty(deliveries),
);
export const $inPending = getMyDeliveriesFx.pending;
export const $error = createStore<Error[]>([])
    .on(getMyDeliveriesFx.failData, (state, error) => {
        const errorAlreadyExists = state.some(
            (existingError) => existingError.message === error.message,
        );
        return errorAlreadyExists ? state : [...state, error];
    })
    .reset([init, fetchData]);
export const $$hasError = $error.map((error) => !isEmpty(error));

/**
 * Initial data fetching
 */
sample({
    clock: init,
    source: widgetInitialized,
    filter: (initialized) => !initialized,
    target: [fetchData, initCompleted],
});

sample({
    clock: fetchData,
    source: {
        isOnline: sessionModel.$$isOnline,
        isAuthorized: sessionModel.$isAuthorized,
    },
    filter: ({ isOnline, isAuthorized }) => isOnline && isAuthorized,
    target: getMyDeliveriesFx,
});

/**
 * Filters
 */
export const filteredDeliveriesByTimeModel =
    FilterDeliveriesByTimeRange.factory.createModel({
        startTime: DELIVERY_START_TIME,
        endTime: DELIVERY_END_TIME,
        stepMins: DELIVERY_TIME_STEP,
        sourceStore: $deliveriesStore,
    });

export const $deliveriesList =
    filteredDeliveriesByTimeModel.$filteredDeliveries;
