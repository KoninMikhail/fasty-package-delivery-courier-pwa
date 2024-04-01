import { createEvent, createStore, sample } from 'effector';
import {
    getMyDeliveriesFx,
    myDeliveriesModel,
    setDeliveryStatus,
} from '@/entities/delivery';
import { FilterDeliveriesByTimeRange } from '@/features/delivery/filterDeliveriesByTimeRange';
import { throttle } from 'patronum';
import { assignUserToDeliveryFx } from '@/entities/user';
import {
    DELIVERY_END_TIME,
    DELIVERY_START_TIME,
    DELIVERY_TIME_STEP,
} from '../config';

/**
 * Offline mode
 */
export const networkIsOnline = createEvent<boolean>();
export const $isOnline = createStore<boolean>(true);
$isOnline.on(networkIsOnline, (_, payload) => payload);

/**
 * State
 */

/**
 * Events
 */
export const initWidgetMyDeliveries = createEvent();
const $initialized = createStore(false).on(
    getMyDeliveriesFx.doneData,
    () => true,
);

const myDeliveriesExpired = createEvent();

sample({
    clock: initWidgetMyDeliveries,
    target: myDeliveriesExpired,
});

sample({
    clock: throttle({
        source: myDeliveriesExpired,
        timeout: 1000,
    }),
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

sample({
    clock: assignUserToDeliveryFx.doneData,
    fn: (_, delivery) => delivery,
    target: myDeliveriesModel.addDelivery,
});

sample({
    clock: setDeliveryStatus.doneData,
    filter: ({ states }) => states === 'done' || states === 'canceled',
    fn: (_, delivery) => delivery,
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

export const $$deliveriesMarkers = myDeliveriesModel.$myDeliveriesStore.map(
    (deliveries) => {
        return deliveries.map((delivery) => {
            const lat = delivery?.address?.latitude;
            const lng = delivery?.address?.longitude;
            if (lat && lng) {
                return { lat, lng };
            }
            return null;
        });
    },
);

export const $$empty = myDeliveriesModel.$myDeliveriesStore.map(
    (deliveries) => deliveries.length === 0,
);
