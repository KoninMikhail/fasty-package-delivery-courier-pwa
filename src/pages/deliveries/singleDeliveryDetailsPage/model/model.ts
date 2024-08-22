import { createGate } from 'effector-react';
import { combine, createEvent, createStore, sample } from 'effector';
import { SetDeliveryStatus } from '@/features/delivery/setDeliveryStatus';
import {
    getDeliveryByIdFx,
    getDeliveryCoordinates,
    getDeliveryWeightPersisted,
    setDeliveryStatusFx,
    isDeliveryAssignedToCourier,
    getDeliveryNumber,
} from '@/entities/delivery';
import { sessionModel } from '@/entities/viewer';
import { getCachedDeliveryByIdFx } from '@/entities/delivery/effects';
import { Delivery } from '@/shared/api';

import { assignUserToDeliveryFx } from '@/entities/user';
import { and, condition, delay } from 'patronum';
import { sharedLibTypeGuards } from '@/shared/lib';
import { FetchDeliveryById } from '@/features/delivery/fetchDeliveryById';
import {
    $pageDeliveryDetails,
    $pageDeliveryDetailsCache,
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

/**
 * Network state
 */

const { $$isOnline, $isAuthorized } = sessionModel;

/**
 * Data fetching
 */

const loadFromCache = createEvent<Delivery['id']>();

const $deliveryId = createStore<string>('').on(
    DeliveryDetailsPageGateway.open,
    (_, { deliveryId }) => deliveryId ?? '',
);
const $deliveryFetched = createStore<boolean>(false)
    .on(FetchDeliveryById.fetchSuccess, () => true)
    .on(setDeliveryDetails, () => true)
    .reset($deliveryId);

const $availableInCache = combine(
    $pageDeliveryDetailsCache,
    $deliveryId,
    (cache, id) => {
        return cache.some((x) => x.id === id);
    },
);

condition({
    source: delay($deliveryId, 600),
    if: and($availableInCache, $$isOnline, $isAuthorized),
    then: loadFromCache,
    else: FetchDeliveryById.fetch,
});

sample({
    clock: loadFromCache,
    source: $pageDeliveryDetailsCache,
    fn: (cache, id) => cache.find((x) => x.id === id) as Delivery,
    target: setDeliveryDetails,
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

export const $$deliveryNumber = $pageDeliveryDetails.map((delivery) =>
    getDeliveryNumber(delivery, DELIVERY_ID_LENGTH),
);

export const $$deliveryWeight = $pageDeliveryDetails.map((delivery) =>
    getDeliveryWeightPersisted(delivery),
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
