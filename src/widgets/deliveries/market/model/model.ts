import { createEffect, createStore, sample } from 'effector';
import { apiClient, Delivery } from '@/shared/api';
import { AppGate } from '@/shared/lib/app';
import { AssignToDelivery } from '@/features/delivery/assignToDelivery';
import { $profileDataStore } from '@/entities/viewer/model/profileModel';

const fetchUpcomingDeliveriesFx = createEffect(async () => {
    return apiClient.fetchUpcomingDeliveries();
});

export const $avaliableDeliveries = createStore<Delivery[]>([]);
export const $isDeliveriesLoading = fetchUpcomingDeliveriesFx.pending;

const assignToDeliveryFx = createEffect(
    async ({ userId, deliveryId }: { userId: number; deliveryId: number }) => {
        await new Promise((res) => {
            setTimeout(res, 5000);
        });
        console.log('assignToDeliveryFx', userId, deliveryId);
    },
);

export const assignToDeliveryModel = AssignToDelivery.factory.createModel({
    deliveriesStore: $avaliableDeliveries,
    userStore: $profileDataStore,
    assignToDeliveryEffect: assignToDeliveryFx,
});

sample({
    clock: AppGate.open,
    target: fetchUpcomingDeliveriesFx,
});

sample({
    clock: fetchUpcomingDeliveriesFx.doneData,
    target: $avaliableDeliveries,
});
