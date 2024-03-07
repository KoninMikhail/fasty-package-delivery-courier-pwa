import { SetDeliveryStatus } from '@/features/delivery/setDeliveryStatus';
import { setDeliveryStatus } from '@/entities/delivery';
import { createStore } from 'effector';
import { AssignDeliveryToUser } from '@/features/delivery/assignDeliveryToUser';
import { assignUserToDeliveryFx } from '@/entities/delivery/api/assignUserToDelivery';
import type { Delivery } from '@/shared/api';
import { getDeliveryById } from '@/entities/delivery/api/getDeliveryById';

const $id = createStore<number>(4);

export const $delivery = createStore<Nullable<Delivery>>(null)
    .on(assignUserToDeliveryFx.doneData, (_, delivery) => delivery)
    .on(getDeliveryById.doneData, (_, delivery) => delivery);
export const $$deliveryStatus = $delivery.map((delivery) => delivery?.states);
export const $$deliveryComment = $delivery.map((delivery) => delivery?.comment);
export const $$deliveryCreateDate = $delivery.map(
    (delivery) => delivery?.created_at,
);
export const $$deliveryUpdateDate = $delivery.map(
    (delivery) => delivery?.updated_at,
);

export const assignToDeliveryModel = AssignDeliveryToUser.factory.createModel({
    assignToDeliveryEffect: assignUserToDeliveryFx,
});

export const setStatusModel = SetDeliveryStatus.factory.createModel({
    deliveryStore: $id,
    allowedStatuses: ['canceled', 'done'],
    patchDeliveryStatusFx: setDeliveryStatus,
});
