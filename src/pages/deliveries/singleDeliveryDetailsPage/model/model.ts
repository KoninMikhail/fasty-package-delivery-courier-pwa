import { createGate } from 'effector-react';
import { combine, createEvent, createStore, sample } from 'effector';
import { SetDeliveryStatus } from '@/features/delivery/setDeliveryStatus';
import {
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
    setDeliveryStatusFx,
    isDeliveryAssignedToCourier,
    getDeliveryNumber,
} from '@/entities/delivery';
import { sessionModel } from '@/entities/viewer';
import { getCachedDeliveryByIdFx } from '@/entities/delivery/effects';
import { Delivery } from '@/shared/api';

import { assignUserToDeliveryFx } from '@/entities/user';
import { getClientTypeLocale } from '@/entities/client/lib/utils/getClientTypeLocale';
import { getClientName, getClientType } from '@/entities/client';
import { condition, debug, once } from 'patronum';
import { sharedLibTypeGuards } from '@/shared/lib';
import { $myDeliveriesStore } from './parts/deliveriesCache';
import { handleDeliveryError, handleDeliveryNotLoaded } from '../lib';
import { PageState } from '../types';
import { initialDelivery } from '../data';
import { DELIVERY_ID_LENGTH } from '../config';

/* eslint-disable unicorn/no-array-method-this-argument */
/* eslint-disable unicorn/no-thenable */

const { isEmpty } = sharedLibTypeGuards;

/**
 * Gateway for the delivery details page
 */
export const DeliveryDetailsPageGateway = createGate<{
    deliveryId?: string;
}>();

const $deliveryId = createStore<string>('').on(
    DeliveryDetailsPageGateway.open,
    (_, { deliveryId }) => deliveryId ?? '',
);
debug($deliveryId);
/**
 * Events
 */

const requestPageContent = createEvent();
const loadFromRemote = createEvent();
const loadFromCache = createEvent();

sample({
    clock: once({
        source: DeliveryDetailsPageGateway.open,
        reset: DeliveryDetailsPageGateway.close,
    }),
    source: $deliveryId,
    filter: (deliveryId) => !isEmpty(deliveryId),
    target: requestPageContent,
});

/**
 * Page
 */

export const $pageContentState = createStore<Optional<PageState>>(null)
    .on(getDeliveryByIdFx.doneData, () => PageState.Done)
    .on(getDeliveryByIdFx.failData, (_, error) => handleDeliveryError(error))
    .on(getCachedDeliveryByIdFx.doneData, () => PageState.Done)
    .on(getCachedDeliveryByIdFx.failData, (_, error) =>
        handleDeliveryNotLoaded(error),
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
    .on(setDeliveryStatusFx.doneData, (_, delivery) => delivery)
    .reset(DeliveryDetailsPageGateway.close);

debug($delivery);

// Derived stores to decompose the delivery object for easier consumption
export const $$deliveryId = $delivery.map((delivery) =>
    getDeliveryId(delivery, DELIVERY_ID_LENGTH),
);
export const $$deliveryNumber = $delivery.map((delivery) =>
    getDeliveryNumber(delivery, DELIVERY_ID_LENGTH),
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

debug($delivery);

export const $$deliveryPickupDateTime = $delivery.map((delivery) =>
    getDeliveryPickupDateTime(delivery, true, true),
);

export const $$deliveryContact = $delivery.map(
    (delivery) => delivery.contact || {},
);

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
    sessionModel.$viewerProfileData,
    (delivery, viewer) => {
        return (
            delivery && viewer && isDeliveryAssignedToCourier(delivery, viewer)
        );
    },
);

condition({
    source: requestPageContent,
    if: sessionModel.$$isOnline,
    then: loadFromRemote,
    else: loadFromCache,
});

sample({
    clock: loadFromRemote,
    source: $deliveryId,
    fn: (deliveryId) => ({
        deliveryId,
    }),
    target: getDeliveryByIdFx,
});

sample({
    clock: loadFromCache,
    source: {
        deliveryId: $deliveryId,
        cache: $myDeliveriesStore,
    },
    fn: ({ deliveryId, cache }) => ({
        deliveryId: Number.parseInt(deliveryId.toString(), 10),
        cache,
    }),
    target: getCachedDeliveryByIdFx,
});

/**
 * Delivery details store
 */
export const changeDeliveryStatusModel = SetDeliveryStatus.factory.createModel({
    patchDeliveryStatusFx: setDeliveryStatusFx,
});

sample({
    clock: DeliveryDetailsPageGateway.close,
    target: changeDeliveryStatusModel.reset,
});
