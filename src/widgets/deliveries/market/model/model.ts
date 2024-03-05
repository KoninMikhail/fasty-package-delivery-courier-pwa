import { createEffect, createEvent, createStore, sample } from 'effector';
import { apiClient, Delivery } from '@/shared/api';
import { AssignDeliveryToUser } from '@/features/delivery/assignDeliveryToUser';
import { FilterDeliveriesByParams } from '@/features/delivery/filterDeliveriesByParams';
import { AppInitGate } from '@/shared/lib/init';

export const fetchDeliveriesFx = createEffect(
    async (dates: { dateStart?: string; dateEnd?: string }) => {
        if (dates.dateStart && dates.dateEnd) {
            return apiClient.fetchUpcomingDeliveries({
                queries: {
                    from: dates.dateStart,
                    to: dates.dateEnd,
                },
            });
        }
        return apiClient.fetchUpcomingDeliveries();
    },
);

sample({
    clock: AppInitGate.open,
    target: fetchDeliveriesFx,
});

/**
 * Events
 */

export const deliveriesDatesRangeChanged = createEvent<{
    dateStart: string;
    dateEnd: string;
}>();

/**
 * State
 */
export const $isDeliveriesLoading = fetchDeliveriesFx.pending;

/**
 * Data
 */
export const $fetchedDeliveries = createStore<Delivery[]>([]);
export const marketFilterModel = FilterDeliveriesByParams.factory.createModel({
    sourceStore: $fetchedDeliveries,
});

/**
 * Params
 */

const $deliveriesDatesRange = createStore<{
    dateStart: string;
    dateEnd: string;
}>({ dateStart: '', dateEnd: '' }).on(
    deliveriesDatesRangeChanged,
    (state, dates) => ({
        ...state,
        ...dates,
    }),
);

sample({
    clock: $deliveriesDatesRange,
    filter: (data) => data.dateStart !== '' && data.dateEnd !== '',
    target: fetchDeliveriesFx,
});

/**
 * Exports
 */
export const $outputStore = marketFilterModel.$filteredStore;

/**
 * filters for deliveries
 */

const assignToDeliveryFx = createEffect(
    async ({ userId, deliveryId }: { userId: number; deliveryId: number }) => {
        console.log('assignToDeliveryFx', userId, deliveryId);
        return apiClient.assignDeliveryToCourier(
            { courier_id: userId },
            {
                params: {
                    deliveryId,
                },
            },
        );
    },
);

export const assignDeliveryToUserModel =
    AssignDeliveryToUser.factory.createModel({
        assignToDeliveryEffect: assignToDeliveryFx,
    });

sample({
    clock: fetchDeliveriesFx.doneData,
    target: $fetchedDeliveries,
});

/**
 * State
 */
export const $$deliveriesEmpty = $fetchedDeliveries.map(
    (deliveries) => deliveries.length === 0,
);

/**
 * Errors
 */
export const $error = createStore<Nullable<Error>>(null);
export const $$hasError = $error.map((error) => error !== null);

sample({
    clock: fetchDeliveriesFx.fail,
    fn: (_, error) => error,
    target: $error,
});
