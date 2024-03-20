import { createEvent, createStore, sample } from 'effector';
import { assignUserToDeliveryFx, getMyDeliveriesFx } from '@/entities/delivery';
import { Delivery, deliverySchema } from '@/shared/api';
import { persist } from 'effector-storage/local';
import { FilterDeliveriesByTimeRange } from '@/features/delivery/filterDeliveriesByTimeRange';
import {
    DELIVERY_END_TIME,
    LOCAL_STORAGE_CACHE_KEY,
    DELIVERY_START_TIME,
    DELIVERY_TIME_STEP,
} from '../config';

/**
 * Offline mode
 */
export const setOnline = createEvent<boolean>();
export const $isOnline = createStore<boolean>(true);
$isOnline.on(setOnline, (_, payload) => payload);

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
export const $fetchedDeliveries = createStore<Delivery[]>([])
    .on(getMyDeliveriesFx.doneData, (_, deliveries) => deliveries)
    .on(assignUserToDeliveryFx.doneData, (deliveries, delivery) => {
        const index = deliveries.findIndex((d) => d.id === delivery.id);
        if (index === -1) {
            return [...deliveries, delivery];
        }
        const newDeliveries = [...deliveries];
        newDeliveries[index] = delivery;
        return newDeliveries;
    });
export const filteredDeliveriesByTimeModel =
    FilterDeliveriesByTimeRange.factory.createModel({
        startTime: DELIVERY_START_TIME,
        endTime: DELIVERY_END_TIME,
        stepMins: DELIVERY_TIME_STEP,
        sourceStore: $fetchedDeliveries,
    });

export const $deliveriesList =
    filteredDeliveriesByTimeModel.$filteredDeliveries;

export const $$deliveriesMarkers = $fetchedDeliveries.map((deliveries) => {
    return deliveries.map((delivery) => {
        const lat = delivery.address.latitude;
        const lng = delivery.address.longitude;
        if (lat && lng) {
            return { lat, lng };
        }
        return null;
    });
});

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
