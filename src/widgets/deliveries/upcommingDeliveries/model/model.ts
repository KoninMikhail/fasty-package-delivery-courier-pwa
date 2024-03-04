import { combine, createEvent, createStore, sample } from 'effector';
import { getMyDeliveriesFx } from '@/entities/delivery';
import { Delivery, deliverySchema } from '@/shared/api';
import { persist } from 'effector-storage/local';
import { Finally } from 'effector-storage';
import {
    DELIVERY_ITEMS_STORE_LOCAL_STORAGE_KEY,
    OUTPUT_ITEMS_LIMIT_LOCAL_STORAGE_KEY,
} from '../config';

/**
 * Init
 */
const initializeCompleted = createEvent<Finally<unknown, Error>>();

export const $init = createStore<boolean>(false).on(
    initializeCompleted,
    (_, payload) => {
        return payload.status === 'done';
    },
);

/**
 * Fetch data
 */

// fetch data on interval

// Fetch my deliveries
const fetchDeliveries = createEvent();

/**
 * Settings
 */

// Limit
const initialLimit = 5;
export const outputLimit = createStore<number>(initialLimit);

persist({
    store: outputLimit,
    key: OUTPUT_ITEMS_LIMIT_LOCAL_STORAGE_KEY,
});

/**
 * Data
 */

// main store
export const $deliveriesStore = createStore<Delivery[]>([]).on(
    getMyDeliveriesFx.doneData,
    (_, deliveries) => deliveries,
);

// limited store
export const $$upcomingDeliveriesLimited = combine(
    $deliveriesStore,
    outputLimit,
    (deliveries, limitIndex) => {
        const startIndex = 0;
        return deliveries.slice(startIndex, limitIndex);
    },
);

// fetch data on init
persist({
    store: $deliveriesStore,
    key: DELIVERY_ITEMS_STORE_LOCAL_STORAGE_KEY,
    contract: (raw): raw is Delivery[] => {
        const result = deliverySchema.array().safeParse(raw);
        if (result.success) return true;
        throw result.error;
    },
    finally: initializeCompleted,
});

/**
 * State
 */
export const $loading = getMyDeliveriesFx.pending;
export const $isFirstLoad = combine(
    $loading,
    $deliveriesStore,
    (loading, deliveries) => deliveries.length === 0 && loading,
);
export const $$empty = $deliveriesStore.map(
    (deliveries) => deliveries.length === 0,
);

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
