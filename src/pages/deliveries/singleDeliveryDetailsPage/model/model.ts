import { createGate } from 'effector-react';
import { combine, createStore, sample } from 'effector';
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
    getDeliverySystemId,
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
import { debug, once } from 'patronum';
import { sharedLibTypeGuards } from '@/shared/lib';
import { FetchDeliveryById } from '@/features/delivery/fetchDeliveryById';
import {
    $pageDeliveryDetails,
    setDeliveryDetails,
} from '@/pages/deliveries/singleDeliveryDetailsPage/model/stores';
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

/**
 * Events
 */

sample({
    clock: once({
        source: DeliveryDetailsPageGateway.open,
        reset: DeliveryDetailsPageGateway.close,
    }),
    source: $deliveryId,
    filter: (deliveryId) => !isEmpty(deliveryId),
    target: FetchDeliveryById.fetch,
});

/**
 * Page
 */

export const $pageContentState = createStore<Optional<PageState>>(null)
    .on(FetchDeliveryById.fetchSuccess, () => PageState.Done)
    .reset(DeliveryDetailsPageGateway.close);

sample({
    clock: FetchDeliveryById.fetchSuccess,
    target: setDeliveryDetails,
});

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

// Derived stores to decompose the delivery object for easier consumption
export const $$deliveryId = $pageDeliveryDetails.map((delivery) =>
    getDeliverySystemId(delivery, DELIVERY_ID_LENGTH),
);
export const $$deliveryNumber = $pageDeliveryDetails.map((delivery) =>
    getDeliveryNumber(delivery, DELIVERY_ID_LENGTH),
);
export const $$deliveryContents = $pageDeliveryDetails.map((delivery) =>
    getDeliveryContents(delivery),
);
export const $$deliveryWeight = $pageDeliveryDetails.map((delivery) =>
    getDeliveryWeightPersisted(delivery),
);
export const $$deliveryType = $pageDeliveryDetails.map((delivery) =>
    getDeliveryType(delivery),
);
export const $$deliveryTypeTranslated = $pageDeliveryDetails.map((delivery) =>
    getDeliveryTypeTranslated(delivery),
);
export const $$deliveryIsExpress = $pageDeliveryDetails.map((delivery) =>
    getDeliveryExpressState(delivery),
);
export const $$deliveryIsExpressTranslated = $pageDeliveryDetails.map(
    (delivery) => getDeliveryExpressStateTranslated(delivery),
);
export const $$deliveryAddress = $pageDeliveryDetails.map((delivery) =>
    getDeliveryAddress(delivery),
);
export const $$deliveryMetro = $pageDeliveryDetails.map((delivery) =>
    getDeliveryMetro(delivery),
);

export const $$deliveryCoordinates = $pageDeliveryDetails.map((delivery) => {
    const coordinates = getDeliveryCoordinates(delivery);
    return coordinates?.latitude && coordinates?.longitude
        ? {
              lat: Number(coordinates.latitude),
              lng: Number(coordinates.longitude),
          }
        : null;
});

debug($delivery);

export const $$deliveryPickupDateTime = $pageDeliveryDetails.map((delivery) =>
    getDeliveryPickupDateTime(delivery, true, true),
);

export const $$deliveryContact = $pageDeliveryDetails.map(
    (delivery) => delivery.contact || {},
);

/**
 * Client
 */
export const $$deliveryClient = $pageDeliveryDetails.map((delivery) =>
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
export const $$deliveryManager = $pageDeliveryDetails.map((delivery) =>
    getDeliveryManager(delivery),
);
export const $$deliveryCourier = $pageDeliveryDetails.map((delivery) =>
    getDeliveryCourier(delivery),
);

export const $$isViewerDelivery = combine(
    $pageDeliveryDetails,
    sessionModel.$viewerProfileData,
    (delivery, viewer) => {
        return (
            delivery && viewer && isDeliveryAssignedToCourier(delivery, viewer)
        );
    },
);

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
