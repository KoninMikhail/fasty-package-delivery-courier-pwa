import { createGate } from 'effector-react';
import { combine, createStore, sample } from 'effector';
import { SetDeliveryStatus } from '@/features/delivery/setDeliveryStatus';
import { assignUserToDeliveryFx, getDeliveryByIdFx } from '@/entities/delivery';
import { Route } from '@/entities/route';
import { sessionModel } from '@/entities/viewer';
import { getCachedDeliveryByIdFx } from '@/entities/delivery/model';
import { Delivery } from '@/shared/api';
import { setDeliveryStatus } from '@/entities/delivery/model/effects/setDeliveryStatus';

/* eslint-disable unicorn/no-array-method-this-argument */

/**
 * Gateway for the delivery details page
 */
export const DeliveryDetailsPageGateway = createGate<{
    deliveryId?: string;
}>();

/**
 * Main delivery store, stores a nullable Delivery object.
 * Updates when any of the effects successfully complete and provide new data.
 */
export const $delivery = createStore<Nullable<Delivery>>(null)
    .on(assignUserToDeliveryFx.doneData, (_, delivery) => delivery)
    .on(getDeliveryByIdFx.doneData, (_, delivery) => delivery)
    .on(getCachedDeliveryByIdFx.doneData, (_, delivery) => delivery)
    .on(setDeliveryStatus.doneData, (_, delivery) => delivery);

// Derived stores to decompose the delivery object for easier consumption
export const $$deliveryId = $delivery.map(
    (delivery) => delivery && delivery?.id,
);
export const $$deliveryStatus = $delivery.map(
    (delivery) => delivery && delivery?.states,
);
export const $$deliveryComment = $delivery.map(
    (delivery) => delivery && delivery?.comment,
);
export const $$deliveryCreateDate = $delivery.map(
    (delivery) => delivery && delivery?.created_at,
);
export const $$deliveryUpdateDate = $delivery.map(
    (delivery) => delivery && delivery?.updated_at,
);
export const $$deliveryManager = $delivery.map(
    (delivery) => delivery && delivery?.manager,
);
export const $$deliveryCourier = $delivery.map(
    (delivery) => delivery && delivery?.courier,
);

export const $$isViewerDelivery = combine(
    $delivery,
    sessionModel.$sessionStore,
    (delivery, viewer) => {
        return delivery && viewer && delivery?.courier?.id === viewer?.id;
    },
);

sample({
    clock: DeliveryDetailsPageGateway.open,
    filter: (data) => !!data.deliveryId && typeof data.deliveryId === 'string',
    fn: (data) => ({ deliveryId: Number(data.deliveryId) }),
    target: getDeliveryByIdFx,
});

/**
 * State
 */

export const $error = createStore<Nullable<Error>>(null).on(
    getDeliveryByIdFx.failData,
    (_, error) => error,
);
export const $$hasError = $error.map((error) => error !== null);
export const $$notFound = $error.map(
    (error) => error?.message === 'DELIVERY_NOT_FOUND',
);

// debug(getDeliveryByIdFx.fail, getDeliveryByIdFx.finally);

/**
 * Delivery details store
 */
export const changeDeliveryStatusModel = SetDeliveryStatus.factory.createModel({
    patchDeliveryStatusFx: setDeliveryStatus,
});

export const mapModel = Route.Map.factory.createModel({
    center: [51.505, -0.09],
    zoom: 13,
    markers: [
        {
            lat: 51.505,
            lng: -0.09,
        },
    ],
});

sample({
    clock: DeliveryDetailsPageGateway.close,
    target: changeDeliveryStatusModel.reset,
});
