/*
 * Storage handlers
 */
import { Delivery } from '@/shared/api';
import { createStore } from 'effector';
import { getMyDeliveriesFx, setDeliveryStatus } from '@/entities/delivery';
import { assignUserToDeliveryFx } from '@/entities/user';
import { authByEmailFx, logoutFx } from '@/entities/viewer';

const updateDeliveryStatus = (
    deliveries: Delivery[],
    updatedDelivery: Delivery,
): Delivery[] => {
    const shouldRemove = ['done', 'canceled'].includes(updatedDelivery.states);
    if (shouldRemove) {
        return deliveries.filter(
            (delivery) => delivery.id !== updatedDelivery.id,
        );
    }
    const index = deliveries.findIndex(
        (delivery) => delivery.id === updatedDelivery.id,
    );
    if (index !== -1) {
        const updatedDeliveries = [...deliveries];
        updatedDeliveries[index] = updatedDelivery;
        return updatedDeliveries;
    }
    return [...deliveries, updatedDelivery];
};

/**
 * Storage
 */
export const $deliveriesStore = createStore<Delivery[]>([])
    .on(getMyDeliveriesFx.doneData, (_, deliveries) => deliveries)
    .on(setDeliveryStatus.doneData, (state, payload) =>
        updateDeliveryStatus(state, payload),
    )
    .on(assignUserToDeliveryFx.doneData, (state, payload) =>
        updateDeliveryStatus(state, payload),
    )
    .reset([authByEmailFx.done, logoutFx.done, logoutFx.fail]);
