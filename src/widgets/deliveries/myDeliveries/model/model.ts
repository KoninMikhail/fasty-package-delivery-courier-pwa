import { createEvent, createStore, sample } from 'effector';
import { getMyDeliveriesFx } from '@/entities/delivery';
import { Delivery, deliverySchema } from '@/shared/api';
import { persist } from 'effector-storage/local';
import { FilterDeliveriesByTimeRange } from '@/features/delivery/filterDeliveriesByTimeRange';
import {
    END_DELIVERY_TIME,
    LOCAL_STORAGE_CACHE_KEY,
    START_DELIVERY_TIME,
    STEP_MINUTES_IN_TIME_FILTER,
} from '../config';

/**
 * Events
 */
export const initWidgetMyDeliveries = createEvent();

sample({
    clock: initWidgetMyDeliveries,
    target: getMyDeliveriesFx,
});

/**
 * Progress
 */
export const $$loading = getMyDeliveriesFx.pending;

/**
 * Errors
 */
export const $error = createStore<Nullable<Error>>(null);
export const $$hasError = $error.map((error) => error !== null);

sample({
    clock: getMyDeliveriesFx.fail,
    fn: (_, error) => error,
    target: $error,
});

/**
 * Data
 */
export const $fetchedDeliveries = createStore<Delivery[]>([]).on(
    getMyDeliveriesFx.doneData,
    (_, deliveries) => deliveries,
);

export const filteredDeliveriesByTimeModel =
    FilterDeliveriesByTimeRange.factory.createModel({
        startTime: START_DELIVERY_TIME,
        endTime: END_DELIVERY_TIME,
        stepMins: STEP_MINUTES_IN_TIME_FILTER,
        sourceStore: $fetchedDeliveries,
    });

export const $deliveriesList =
    filteredDeliveriesByTimeModel.$filteredDeliveries;

export const $$empty = $fetchedDeliveries.map(
    (deliveries) => deliveries.length === 0,
);

/**
 * Cache
 */

persist({
    store: $fetchedDeliveries,
    key: LOCAL_STORAGE_CACHE_KEY,
    contract: (raw): raw is Delivery[] => {
        const result = deliverySchema.array().safeParse(raw);
        if (result.success) {
            return true;
        }
        throw result.error;
    },
});
