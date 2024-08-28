import { SetDeliveryStatus } from '@/features/delivery/setDeliveryStatus';
import { createEvent, sample } from 'effector';
import { AssignDeliveryWithMe } from '@/features/delivery/assignDeliveryToUser';
import { setDeliveryStatusFx } from '@/entities/delivery';
import { Delivery } from '@/shared/api';
import { assignUserToDeliveryFx } from '@/entities/user';
import { debug } from 'patronum';
import { clearDelivery, setDelivery } from './stores';

/**
 * Events
 */
export const loadDelivery = createEvent<Delivery>();
export const deliveryChanged = createEvent<Delivery>();
export const reset = createEvent();

/**
 * Load delivery
 */

sample({
    clock: loadDelivery,
    target: setDelivery,
});

/**
 * Assign to delivery model
 */
export const assignToDeliveryModel = AssignDeliveryWithMe.factory.createModel({
    assignToDeliveryFx: assignUserToDeliveryFx,
});

sample({
    clock: assignToDeliveryModel.assignCompleted,
    target: [deliveryChanged, setDelivery],
});

/**
 * Set delivery state
 */
export const setStatusModel = SetDeliveryStatus.factory.createModel({
    allowedStatuses: ['canceled', 'done'],
    patchDeliveryStatusFx: setDeliveryStatusFx,
});

sample({
    clock: loadDelivery,
    fn: (delivery) => delivery.id,
    target: setStatusModel.setDeliveryId,
});

debug({
    deliveryId: setStatusModel.setDeliveryId,
});

sample({
    clock: setStatusModel.statusChangeCompleted,
    target: [deliveryChanged, setDelivery],
});

debug({
    complete: setStatusModel.statusChangeCompleted,
});

/**
 * Reset
 */

sample({
    clock: reset,
    target: [clearDelivery, setStatusModel.reset],
});
