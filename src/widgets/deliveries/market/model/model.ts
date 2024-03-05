import { createEffect, createStore, sample } from 'effector';
import { apiClient, Delivery } from '@/shared/api';
import { AssignDeliveryToUser } from '@/features/delivery/assignDeliveryToUser';
import { FilterDeliveriesByParams } from '@/features/delivery/filterDeliveriesByParams';
import { AppInitGate } from '@/shared/lib/init';
import { once } from 'patronum';

export const fetchUpcomingDeliveriesFx = createEffect(async () => {
    return apiClient.fetchUpcomingDeliveries();
});

sample({
    clock: once(AppInitGate.open),
    target: fetchUpcomingDeliveriesFx,
});

export const $fetchedDeliveries = createStore<Delivery[]>([]);
export const $isDeliveriesLoading = fetchUpcomingDeliveriesFx.pending;

export const marketFilterModel = FilterDeliveriesByParams.factory.createModel({
    sourceStore: $fetchedDeliveries,
});

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
    clock: fetchUpcomingDeliveriesFx.doneData,
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
    clock: fetchUpcomingDeliveriesFx.fail,
    fn: (_, error) => error,
    target: $error,
});
