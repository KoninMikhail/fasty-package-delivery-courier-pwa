import { createGate } from 'effector-react';
import { combine, createStore, sample } from 'effector';
import { SetDeliveryStatus } from '@/features/delivery/setDeliveryStatus';
import {
    assignUserToDeliveryFx,
    getDeliveryAddress,
    getDeliveryByIdFx,
    getDeliveryClient,
    getDeliveryContents,
    getDeliveryCoordinates,
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
import { sessionModel } from '@/entities/viewer';
import { getCachedDeliveryByIdFx } from '@/entities/delivery/model';
import { Delivery } from '@/shared/api';
import { isDeliveryAssignedToCourier } from '@/entities/delivery/lib';
import { getClientTypeLocale } from '@/entities/client/lib/utils/getClientTypeLocale';
import { getClientName, getClientType } from '@/entities/client';
import { handleDeliveryError } from '../lib/utils/handleDeliveryError';
import { PageState } from '../types';
import { initialDelivery } from '../data';
import { DELIVERY_ID_LENGTH } from '../config';
import 'leaflet/dist/leaflet.css';

/* eslint-disable unicorn/no-array-method-this-argument */

/**
 * Gateway for the delivery details page
 */
export const DeliveryDetailsPageGateway = createGate<{
    deliveryId?: string;
    online?: boolean;
}>();

const $deliveryId = createStore<string>('').on(
    DeliveryDetailsPageGateway.open,
    (_, { deliveryId }) => {
        return deliveryId ?? '';
    },
);

const $isOnline = createStore<boolean>(true).on(
    DeliveryDetailsPageGateway.open,
    (_, { online }) => online ?? true,
);
export const $pageContentState = createStore<Nullable<PageState>>(null)
    .on(getDeliveryByIdFx.doneData, () => PageState.Done)
    .on(getDeliveryByIdFx.failData, (_, error) => handleDeliveryError(error))
    .on(getCachedDeliveryByIdFx.doneData, () => PageState.Done)
    .on(getCachedDeliveryByIdFx.failData, (_, error) =>
        handleDeliveryError(error),
    )
    .reset(DeliveryDetailsPageGateway.close);

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

export const $$deliveryCoordinates = $delivery.map((delivery) => {
    const coordinates = getDeliveryCoordinates(delivery);
    return coordinates?.latitude && coordinates?.longitude
        ? {
              lat: Number(coordinates.latitude),
              lng: Number(coordinates.longitude),
          }
        : null;
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
/*

sample({
    clock: $deliveryId,
    source: $isOnline,
    filter: (isOnline, id) => id && isOnline,
    fn: (_, id) => {
        return { deliveryId: Number(id) };
    },
    target: getDeliveryByIdFx,
});
*/

/*
sample({
    clock: $deliveryId,
    source: {
        isOnline: $isOnline,
        cache: $myDeliveriesStore,
    },
    filter: ({ isOnline }, id) => !!id && !isOnline,
    fn: ({ cache }, deliveryId) => {
        return { deliveryId, cache };
    },
    target: getCachedDeliveryByIdFx,
});
*/

/**
 * State
 *
/**
 * Delivery details store
 */
export const changeDeliveryStatusModel = SetDeliveryStatus.factory.createModel({
    patchDeliveryStatusFx: setDeliveryStatus,
});

sample({
    clock: DeliveryDetailsPageGateway.close,
    target: changeDeliveryStatusModel.reset,
});
