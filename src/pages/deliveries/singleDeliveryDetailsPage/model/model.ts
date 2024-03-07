import { createGate } from 'effector-react';
import { sample } from 'effector';
import { SetDeliveryStatus } from '@/features/delivery/setDeliveryStatus';
import { setDeliveryStatus } from '@/entities/delivery';
import { getDeliveryById } from '@/entities/delivery/api/getDeliveryById';

/**
 * Gateway for the delivery details page
 */
export const DeliveryDetailsPageGateway = createGate<{
    deliveryId?: string;
}>();

sample({
    clock: DeliveryDetailsPageGateway.open,
    filter: (data) => !!data.deliveryId,
    fn: (data) => ({ deliveryId: Number(data.deliveryId) }),
    target: getDeliveryById,
});

/**
 * Page
 */

export const $deliveryId = DeliveryDetailsPageGateway.state.map(
    (data) => data.deliveryId,
);

/**
 * Delivery details store
 */
export const changeDeliveryStatusModel = SetDeliveryStatus.factory.createModel({
    patchDeliveryStatusFx: setDeliveryStatus,
});

sample({
    clock: DeliveryDetailsPageGateway.open,
    fn: (data) => Number(data.deliveryId),
    target: changeDeliveryStatusModel.idChanged,
});
