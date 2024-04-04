import { createEvent, createStore, sample } from 'effector';
import { getMyDeliveriesFx, setDeliveryStatus } from '@/entities/delivery';
import { FilterDeliveriesByTimeRange } from '@/features/delivery/filterDeliveriesByTimeRange';
import { assignUserToDeliveryFx } from '@/entities/user';
import { Delivery } from '@/shared/api';

import { persist } from 'effector-storage/local';
import { authByEmailFx, logoutFx, sessionModel } from '@/entities/viewer';
import { debug } from 'patronum';
import {
    DELIVERY_END_TIME,
    DELIVERY_START_TIME,
    DELIVERY_TIME_STEP,
} from '../config';

/**
 * Events
 */
export const init = createEvent({
    name: 'myDeliveriesInit',
});

debug(init);
export const initCompleted = createEvent();
export const fetchData = createEvent();

/*
 * Storage handlers
 */
const updateDeliveryStatus = (
    deliveries: Delivery[],
    updatedDelivery: Delivery,
) => {
    const shouldRemove = ['done', 'canceled'].includes(updatedDelivery.states);
    if (shouldRemove) {
        return deliveries.filter(
            (delivery) => delivery.id !== updatedDelivery.id,
        );
    }
    const index = deliveries.findIndex(
        (delivery) => delivery.id === updatedDelivery.id,
    );
    if (index !== -1) {
        const updatedDeliveries = [...deliveries];
        updatedDeliveries[index] = updatedDelivery;
        return updatedDeliveries;
    }
    return [...deliveries, updatedDelivery];
};

/**
 * Storage
 */

export const $myDeliveriesStore = createStore<Delivery[]>([])
    .on(getMyDeliveriesFx.doneData, (_, deliveries) => deliveries)
    .on(setDeliveryStatus.doneData, (state, payload) =>
        updateDeliveryStatus(state, payload),
    )
    .on(assignUserToDeliveryFx.doneData, (state, payload) =>
        updateDeliveryStatus(state, payload),
    )
    .reset([authByEmailFx.done, logoutFx.done]);

/**
 * Local storage persistence
 */
persist({
    store: $myDeliveriesStore,
    key: 'myDeliveries',
    contract: (raw): raw is Delivery[] => {
        return Array.isArray(raw) && raw.every((item) => item.id);
    },
});

/**
 * State
 */

export const $$empty = $myDeliveriesStore.map(
    (deliveries) => deliveries.length === 0,
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
export const $$hasError = $error.map((error) => error.length > 0);

/**
 * Initial data fetching
 */
sample({
    clock: init,
    target: fetchData,
});

sample({
    clock: fetchData,
    source: sessionModel.$$isOnline,
    filter: (isOnline) => isOnline,
    target: getMyDeliveriesFx,
});

/**
 * Data
 */
export const filteredDeliveriesByTimeModel =
    FilterDeliveriesByTimeRange.factory.createModel({
        startTime: DELIVERY_START_TIME,
        endTime: DELIVERY_END_TIME,
        stepMins: DELIVERY_TIME_STEP,
        sourceStore: $myDeliveriesStore,
    });

export const $deliveriesList =
    filteredDeliveriesByTimeModel.$filteredDeliveries;
