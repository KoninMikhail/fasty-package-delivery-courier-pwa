import { createEffect, createStore, sample } from 'effector';
import { apiClient, Delivery } from '@/shared/api';
import { AssignDeliveryToUser } from '@/features/delivery/assignDeliveryToUser';

export const fetchUpcomingDeliveriesFx = createEffect(async () => {
    return apiClient.fetchUpcomingDeliveries();
});

export const $avaliableDeliveries = createStore<Delivery[]>([]);
export const $isDeliveriesLoading = fetchUpcomingDeliveriesFx.pending;

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
