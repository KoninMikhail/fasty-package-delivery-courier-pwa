import { createEvent, sample } from 'effector';
import { myDeliveriesModel, setDeliveryStatus } from '@/entities/delivery';
import { FilterDeliveriesByTimeRange } from '@/features/delivery/filterDeliveriesByTimeRange';
import { assignUserToDeliveryFx } from '@/entities/user';
import { createGate } from 'effector-react';
import { startPolling } from './dataPoling';
import {
    DELIVERY_END_TIME,
    DELIVERY_START_TIME,
    DELIVERY_TIME_STEP,
} from '../config';

export const MyDeliveriesGate = createGate();

/**
 * Events
 */
export const initWidgetMyDeliveries = createEvent();

sample({
    clock: initWidgetMyDeliveries,
    target: startPolling,
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
