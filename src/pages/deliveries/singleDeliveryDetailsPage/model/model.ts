import { createGate } from 'effector-react';
import { combine, createEvent, createStore, sample } from 'effector';
import { SetDeliveryStatus } from '@/features/delivery/setDeliveryStatus';
import {
    assignUserToDeliveryFx,
    getDeliveryAddress,
    getDeliveryByIdFx,
    getDeliveryClient,
    getDeliveryContents,
    getDeliveryCourier,
    getDeliveryExpressState,
    getDeliveryExpressStateTranslated,
    getDeliveryId,
    getDeliveryManager,
    getDeliveryMetro,
    getDeliveryPickupDateTime,
    getDeliveryType,
    getDeliveryTypeTranslated,
    getDeliveryWeightPersisted,
    setDeliveryStatus,
} from '@/entities/delivery';
import { Route } from '@/entities/route';
import { sessionModel } from '@/entities/viewer';
import { getCachedDeliveryByIdFx } from '@/entities/delivery/model';
import { Delivery } from '@/shared/api';
import {
    isDeliveryAssignedToCourier,
    isDeliveryHasCoordinates,
} from '@/entities/delivery/lib';
import { getClientTypeLocale } from '@/entities/client/lib/utils/getClientTypeLocale';
import { getClientName, getClientType } from '@/entities/client';
import { once, pending } from 'patronum';
import { initialDelivery } from '../data';

/* eslint-disable unicorn/no-array-method-this-argument */

const DELIVERY_ID_LENGTH = 6;

/**
 * Gateway for the delivery details page
 */
export const DeliveryDetailsPageGateway = createGate<{
    deliveryId?: string;
}>();

export const setOffline = createEvent();
export const $isOffline = createStore(false);

/**
 * Main delivery store, stores a nullable Delivery object.
 * Updates when any of the effects successfully complete and provide new data.
 */
export const $delivery = createStore<Delivery>(initialDelivery)
    .on(assignUserToDeliveryFx.doneData, (_, delivery) => delivery)
    .on(getDeliveryByIdFx.doneData, (_, delivery) => delivery)
    .on(getCachedDeliveryByIdFx.doneData, (_, delivery) => delivery)
    .on(setDeliveryStatus.doneData, (_, delivery) => delivery)
    .reset(DeliveryDetailsPageGateway.close);

export const $inProcess = pending([getDeliveryByIdFx, getCachedDeliveryByIdFx]);

// Derived stores to decompose the delivery object for easier consumption
export const $$deliveryId = $delivery.map((delivery) =>
    getDeliveryId(delivery, DELIVERY_ID_LENGTH),
);
export const $$deliveryContents = $delivery.map((delivery) =>
    getDeliveryContents(delivery),
);
export const $$deliveryWeight = $delivery.map((delivery) =>
    getDeliveryWeightPersisted(delivery),
);
export const $$deliveryType = $delivery.map((delivery) =>
    getDeliveryType(delivery),
);
export const $$deliveryTypeTranslated = $delivery.map((delivery) =>
    getDeliveryTypeTranslated(delivery),
);
export const $$deliveryIsExpress = $delivery.map((delivery) =>
    getDeliveryExpressState(delivery),
);
export const $$deliveryIsExpressTranslated = $delivery.map((delivery) =>
    getDeliveryExpressStateTranslated(delivery),
);
export const $$deliveryAddress = $delivery.map((delivery) =>
    getDeliveryAddress(delivery),
);
export const $$deliveryMetro = $delivery.map((delivery) =>
    getDeliveryMetro(delivery),
);
export const $$deliveryMapFallback = $delivery.map((delivery) => {
    const { latitude } = delivery.address;
    const { longitude } = delivery.address;
    return latitude && longitude;
});

export const $$deliveryPickupDateTime = $delivery.map((delivery) =>
    getDeliveryPickupDateTime(delivery, true, true),
);

export const $$deliveryContact = $delivery.map((delivery) => delivery.contact);

/**
 * Client
 */
export const $$deliveryClient = $delivery.map((delivery) =>
    getDeliveryClient(delivery),
);
export const $$deliveryClientName = $$deliveryClient.map((client) =>
    getClientName(client),
);
export const $$deliveryClientType = $$deliveryClient.map((client) =>
    getClientType(client),
);
export const $$deliveryClientTypeLocaled = $$deliveryClient.map((client) =>
    getClientTypeLocale(client),
);
export const $$deliveryManager = $delivery.map((delivery) =>
    getDeliveryManager(delivery),
);
export const $$deliveryCourier = $delivery.map((delivery) =>
    getDeliveryCourier(delivery),
);

export const $$isViewerDelivery = combine(
    $delivery,
    sessionModel.$sessionStore,
    (delivery, viewer) => {
        return (
            delivery && viewer && isDeliveryAssignedToCourier(delivery, viewer)
        );
    },
);
export const $$isDeliveryHasCoordinated = $delivery.map((delivery) =>
    isDeliveryHasCoordinates(delivery),
);

sample({
    clock: once({
        source: DeliveryDetailsPageGateway.open,
        reset: DeliveryDetailsPageGateway.close,
    }),
    filter: (data) => !!data.deliveryId && typeof data.deliveryId === 'string',
    fn: (data) => ({ deliveryId: Number(data.deliveryId) }),
    target: getDeliveryByIdFx,
});

/**
 * State
 */

export const $error = createStore<Nullable<Error>>(null)
    .on(getDeliveryByIdFx.failData, (_, error) => error)
    .reset(DeliveryDetailsPageGateway.close);
export const $$hasError = $error.map((error) => error !== null);
export const $$notFound = $error.map(
    (error) => error?.message === 'DELIVERY_NOT_FOUND',
);

/**
 * Delivery details store
 */
export const changeDeliveryStatusModel = SetDeliveryStatus.factory.createModel({
    patchDeliveryStatusFx: setDeliveryStatus,
});

export const mapModel = Route.Map.factory.createModel({
    defaultCenter: {
        lat: 55.753_993_999_993_74,
        lng: 37.622_093_000_000_01,
    },
    defaultZoom: 13,
    zoomWhenMarkerSelected: 16,
});

/* sample({
    clock: debounce($delivery, 1000),
    filter: (delivery) => isDeliveryHasCoordinates(delivery),
    fn: (delivery) =>
        ({
            lat: delivery.address.latitude,
            lng: delivery.address.longitude,
        }) as unknown as LatLngExpression,
    target: mapModel.locationChanged,
}); */

sample({
    clock: DeliveryDetailsPageGateway.close,
    target: changeDeliveryStatusModel.reset,
});
