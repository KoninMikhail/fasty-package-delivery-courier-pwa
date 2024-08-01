import { SetDeliveryStatus } from '@/features/delivery/setDeliveryStatus';
import { createStore, sample } from 'effector';
import { AssignDeliveryToUser } from '@/features/delivery/assignDeliveryToUser';
import { getDeliveryByIdFx, setDeliveryStatusFx } from '@/entities/delivery';
import { Delivery } from '@/shared/api';
import { assignUserToDeliveryFx } from '@/entities/user';

/**
 * Data
 */
export const $delivery = createStore<Nullable<Delivery>>(null)
    .on(assignUserToDeliveryFx.doneData, (_, delivery) => delivery)
    .on(getDeliveryByIdFx.doneData, (_, delivery) => delivery)
    .on(setDeliveryStatusFx.doneData, (_, delivery) => delivery);
export const $$deliveryStatus = $delivery.map(
    (delivery) => delivery && delivery?.state,
);
export const $$deliveryComment = $delivery.map(
    (delivery) => delivery && delivery?.comment,
);
export const $$deliveryCreateDate = $delivery.map(
    (delivery) => delivery && delivery?.createdAt,
);
export const $$deliveryUpdateDate = $delivery.map(
    (delivery) => delivery && delivery?.updatedAt,
);

/**
 * Feature models
 */
export const assignToDeliveryModel = AssignDeliveryToUser.factory.createModel({
    assignToDeliveryFx: assignUserToDeliveryFx,
});

export const setStatusModel = SetDeliveryStatus.factory.createModel({
    allowedStatuses: ['canceled', 'done'],
    patchDeliveryStatusFx: setDeliveryStatusFx,
});

/**
 * Handlers
 */

sample({
    clock: getDeliveryByIdFx.doneData,
    filter: ({ id }) => !!id,
    fn: ({ id }) => id,
    target: setStatusModel.setDeliveryId,
});
