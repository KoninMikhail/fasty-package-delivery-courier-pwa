import { createEvent, createStore, sample } from 'effector';
import {
    getMyDeliveriesFx,
    myDeliveriesModel,
    setDeliveryStatus,
} from '@/entities/delivery';
import { FilterDeliveriesByTimeRange } from '@/features/delivery/filterDeliveriesByTimeRange';
import { assignUserToDeliveryFx } from '@/entities/user';
import { createGate } from 'effector-react';
import {
    DELIVERY_END_TIME,
    DELIVERY_START_TIME,
    DELIVERY_TIME_STEP,
} from '../config';

/**
 * Events
 */
export const init = createEvent();
export const fetchData = createEvent();

/**
 * Gates
 */
export const MyDeliveriesGate = createGate<{ online: boolean }>();

/**
 * State
 */
export const $isOnline = createStore<boolean>(true).on(
    MyDeliveriesGate.open,
    (_, payload) => {
        return payload.online;
    },
);
export const $inPending = getMyDeliveriesFx.pending;
export const $error = createStore<Error[]>([]).on(
    getMyDeliveriesFx.failData,
    (state, error) => [...state, error],
);
export const $$hasError = $error.map((error) => error.length > 0);

/**
 * Events
 */
sample({
    clock: [init, fetchData],
    target: getMyDeliveriesFx,
});

/**
 * Data
 */

sample({
    clock: assignUserToDeliveryFx.doneData,
    fn: (delivery) => delivery,
    target: myDeliveriesModel.addDelivery,
});

sample({
    clock: setDeliveryStatus.doneData,
    filter: ({ states }) => states === 'done' || states === 'canceled',
    fn: (delivery) => delivery,
    target: myDeliveriesModel.removeDelivery,
});

export const filteredDeliveriesByTimeModel =
    FilterDeliveriesByTimeRange.factory.createModel({
        startTime: DELIVERY_START_TIME,
        endTime: DELIVERY_END_TIME,
        stepMins: DELIVERY_TIME_STEP,
        sourceStore: myDeliveriesModel.$myDeliveriesStore,
    });

export const $deliveriesList =
    filteredDeliveriesByTimeModel.$filteredDeliveries;

export const $$empty = myDeliveriesModel.$myDeliveriesStore.map(
    (deliveries) => deliveries.length === 0,
);
