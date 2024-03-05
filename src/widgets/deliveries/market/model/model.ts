import { createEffect, createStore, sample } from 'effector';
import { apiClient, Delivery } from '@/shared/api';
import { AssignDeliveryToUser } from '@/features/delivery/assignDeliveryToUser';
import { FilterDeliveriesByParams } from '@/features/delivery/filterDeliveriesByParams';

export const fetchUpcomingDeliveriesFx = createEffect(async () => {
    return apiClient.fetchUpcomingDeliveries();
});

export const $avaliableDeliveries = createStore<Delivery[]>([]);
export const $isDeliveriesLoading = fetchUpcomingDeliveriesFx.pending;

export const marketFilterModel = FilterDeliveriesByParams.factory.createModel({
    sourceStore: $avaliableDeliveries,
});

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
    target: $avaliableDeliveries,
});

/**
 * State
 */
export const $$deliveriesEmpty = $avaliableDeliveries.map(
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
