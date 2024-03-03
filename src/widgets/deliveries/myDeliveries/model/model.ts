import { createEffect, createEvent, createStore, sample } from 'effector';
import { apiClient } from '@/shared/api';

export const getInProgressDeliveriesFx = createEffect(async () => {
    console.log('called');
    return apiClient.getActiveDeliveries();
});

/**
 * Init
 */

export const initWidgetMyDeliveries = createEvent();
export const $init = createStore<boolean>(false)
    .on(getInProgressDeliveriesFx.done, () => true)
    .on(getInProgressDeliveriesFx.fail, () => true);

sample({
    clock: initWidgetMyDeliveries,
    source: $init,
    filter: (init) => !init,
    target: getInProgressDeliveriesFx,
});

/**
 * Data
 */
export const $inProgressDeliveries = createStore([]);
export const $$empty = $inProgressDeliveries.map(
    (deliveries) => deliveries.length === 0,
);

/**
 * Progress
 */
export const $$loading = getInProgressDeliveriesFx.pending;

/**
 * Errors
 */
export const $error = createStore<Nullable<Error>>(null);
export const $$hasError = $error.map((error) => error !== null);

sample({
    clock: getInProgressDeliveriesFx.fail,
    fn: (_, error) => error,
    target: $error,
});
