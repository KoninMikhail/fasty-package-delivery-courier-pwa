import { createEvent, createStore, sample } from 'effector';
import { getMyDeliveriesFx, setDeliveryStatus } from '@/entities/delivery';
import { FilterDeliveriesByTimeRange } from '@/features/delivery/filterDeliveriesByTimeRange';
import { assignUserToDeliveryFx } from '@/entities/user';
import { createGate } from 'effector-react';
import { Delivery } from '@/shared/api';

import { persist } from 'effector-storage/local';
import { Done, Fail } from 'effector-storage';
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
    name: 'init',
});
export const initCompleted = createEvent({
    name: 'initCompleted',
});
export const fetchData = createEvent({
    name: 'fetchData',
});

debug(init);
debug(initCompleted);

/**
 * Gates
 */
export const MyDeliveriesGate = createGate<{ online: boolean }>();

/*
 * Storage
 */

export const $myDeliveriesStore = createStore<Delivery[]>([])
    .on(getMyDeliveriesFx.doneData, (_, deliveries) => deliveries)
    .on(setDeliveryStatus.doneData, (state, payload) => {
        // Refactored to reduce repetition and improve clarity
        const shouldRemove = ['done', 'canceled'].includes(payload.states);
        const updatedStateWithoutPayload = state.filter(
            (item) => item.id !== payload.id,
        );
        if (shouldRemove) {
            return updatedStateWithoutPayload;
        }
        // If not removing, either update or add the delivery, avoiding adding if in 'created' state without existence check
        return [...updatedStateWithoutPayload, payload];
    })
    .on(assignUserToDeliveryFx.doneData, (state, payload) => {
        return state.some((item) => item.id === payload.id)
            ? state.map((item) => (item.id === payload.id ? payload : item))
            : [...state, payload];
    });

/**
 * Persist
 */

const startPersist = createEvent();
const persistedCompleted = createEvent<Done<Delivery[]>>();
const persistedFailed = createEvent<Fail<Error>>();

const $persisted = createStore<boolean>(false)
    .on(persistedCompleted, () => true)
    .on(persistedFailed, () => true);

persist({
    store: $myDeliveriesStore,
    key: 'myDeliveries',
    pickup: startPersist,
    contract: (raw): raw is Delivery[] => {
        return Array.isArray(raw) && raw.every((item) => item.id);
    },
    done: persistedCompleted,
    fail: persistedFailed,
});

/**
 * State
 */
const $initialized = createStore<boolean>(false).on(initCompleted, () => true);

export const $isOnline = createStore<boolean>(true).on(
    MyDeliveriesGate.open,
    (_, payload) => {
        return payload.online;
    },
);
export const $inPending = getMyDeliveriesFx.pending;
export const $error = createStore<Error[]>([])
    .on(getMyDeliveriesFx.failData, (state, error) => [...state, error])
    .reset([init, fetchData]);
export const $$hasError = $error.map((error) => error.length > 0);
export const $$empty = $myDeliveriesStore.map(
    (deliveries) => deliveries.length === 0,
);

/**
 * Initial data fetching
 */
sample({
    clock: init,
    target: startPersist,
});

sample({
    clock: $persisted,
    filter: (persisted) => persisted,
    target: initCompleted,
});

debug($initialized);
debug($persisted);
debug(getMyDeliveriesFx);

sample({
    clock: $initialized,
    source: $isOnline,
    filter: (initialized, online) => initialized && online,
    target: getMyDeliveriesFx,
});

sample({
    clock: fetchData,
    source: $isOnline,
    fn: (persisted) => persisted,
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
