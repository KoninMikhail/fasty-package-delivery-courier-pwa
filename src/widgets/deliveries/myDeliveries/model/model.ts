import { createEvent, createStore, sample } from 'effector';
import { getMyDeliveriesFx } from '@/entities/delivery';
import { Delivery, deliverySchema } from '@/shared/api';
import { persist } from 'effector-storage/local';

/**
 * Init
 */

export const initWidgetMyDeliveries = createEvent();
export const $init = createStore<boolean>(false)
    .on(getMyDeliveriesFx.done, () => true)
    .on(getMyDeliveriesFx.fail, () => true);

sample({
    clock: initWidgetMyDeliveries,
    source: $init,
    filter: (init) => !init,
    target: getMyDeliveriesFx,
});

/**
 * Data
 */
export const $myDeliveries = createStore<Delivery[]>([]).on(
    getMyDeliveriesFx.doneData,
    (_, deliveries) => deliveries,
);

export const $$empty = $myDeliveries.map(
    (deliveries) => deliveries.length === 0,
);

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
 * Cache
 */

persist({
    store: $myDeliveries,
    key: 'myDeliveries',
    contract: (raw): raw is Delivery[] => {
        const result = deliverySchema.array().safeParse(raw);
        if (result.success) {
            return true;
        }
        throw result.error;
    },
});
