import { createGate } from 'effector-react';
import { createStore, sample } from 'effector';
import { getDeliveryFromMyDeliverisLocalStorageCache } from '@/entities/delivery';
import { and, delay, not } from 'patronum';
import { sharedLibTypeGuards } from '@/shared/lib';
import { FetchDeliveryById } from '@/features/delivery/fetchDeliveryById';
import {
    $pageDeliveryDetails,
    resetDeliveryDetails,
    setDeliveryDetails,
} from '@/pages/deliveries/singleDeliveryDetailsPage/model/stores';
import axios from 'axios';
import httpStatus from 'http-status';
import { Delivery } from '@/shared/api';
import { Logout } from '@/features/auth/logout';
import { RefreshToken } from '@/features/auth/refreshToken';
import { widgetDeliveryStatusModel } from '@/widgets/deliveries/deliveryStatus';
import { DetectNetworkConnectionState } from '@/features/device/detectNetworkConnectionState';
import { isUnAuthorizedError } from '@/shared/lib/type-guards';
import { widgetMyDeliveriesModel } from '@/widgets/deliveries/myDeliveries';
import { PageGateState, PageState } from '../types';

/* eslint-disable unicorn/no-array-method-this-argument */
/* eslint-disable unicorn/no-thenable */

const { isEmpty } = sharedLibTypeGuards;
const {
    model: { $$isOnline },
} = DetectNetworkConnectionState;

/**
 * Gateway for the delivery details page
 */
export const DeliveryDetailsPageGate = createGate<PageGateState>();

const $deliveryId = createStore<Optional<string>>(null)
    .on(DeliveryDetailsPageGate.open, (_, { deliveryId }) => deliveryId)
    .reset(DeliveryDetailsPageGate.close);

const $$hasDeliveryId = $deliveryId.map((deliveryId) => !isEmpty(deliveryId));
const $$isPageVisible = DeliveryDetailsPageGate.status;
const $$readyForFetch = and($$isPageVisible, $$hasDeliveryId);
const $$pageOnline = $$isOnline.map((isOnline) => !!isOnline);

/**
 * Page State
 */
export const $pageContentState = createStore<PageState>(PageState.INIT)
    .on(FetchDeliveryById.fetchSuccess, () => PageState.Done)
    .on(getDeliveryFromMyDeliverisLocalStorageCache.done, () => PageState.Done)
    .on(
        getDeliveryFromMyDeliverisLocalStorageCache.fail,
        () => PageState.NotFoundOffline,
    )
    .on(FetchDeliveryById.fetchFail, (_, payload) => {
        const isNotFound =
            axios.isAxiosError(payload) &&
            payload.response?.status === httpStatus.NOT_FOUND;
        return isNotFound ? PageState.NotFound : PageState.Error;
    })
    .reset(DeliveryDetailsPageGate.close);

/**
 * Data fetching
 */
sample({
    clock: delay(and($$pageOnline, $$readyForFetch), 500),
    source: $deliveryId,
    filter: (_, allow) => allow,
    fn: (id) => id as Delivery['id'],
    target: FetchDeliveryById.fetch,
});

sample({
    clock: delay(and(not($$pageOnline), $$readyForFetch), 500),
    source: $deliveryId,
    filter: (_, allow) => allow,
    fn: (id) => id as Delivery['id'],
    target: getDeliveryFromMyDeliverisLocalStorageCache,
});

sample({
    clock: [
        getDeliveryFromMyDeliverisLocalStorageCache.doneData,
        FetchDeliveryById.fetchSuccess,
    ],
    target: setDeliveryDetails,
});

sample({
    clock: FetchDeliveryById.fetchFail,
    filter: (error) => isUnAuthorizedError(error),
    target: RefreshToken.tokenRefreshRequested,
});

/**
 * Delivery state store
 */
sample({
    clock: $pageDeliveryDetails,
    filter: (delivery) => !!delivery,
    fn: (delivery) => delivery as Delivery,
    target: widgetDeliveryStatusModel.loadDelivery,
});

sample({
    clock: widgetDeliveryStatusModel.deliveryChanged,
    target: setDeliveryDetails,
});

sample({
    clock: DeliveryDetailsPageGate.close,
    target: widgetDeliveryStatusModel.reset,
});

/**
 * Remove completed delivery from the store when the page is closed
 */
sample({
    clock: DeliveryDetailsPageGate.close,
    source: $pageDeliveryDetails,
    filter: (delivery) =>
        !!delivery &&
        (delivery.state === 'done' || delivery.state === 'canceled'),
    fn: (delivery) => (delivery as Delivery).id,
    target: widgetMyDeliveriesModel.removeDelivery,
});

/**
 * Logout when user is not authorized
 */

sample({
    clock: RefreshToken.updateTokenSuccess,
    source: $deliveryId,
    filter: (deliveryId) => !!deliveryId,
    fn: (deliveryId) => deliveryId as Delivery['id'],
    target: FetchDeliveryById.fetch,
});

sample({
    clock: RefreshToken.updateTokenFail,
    target: [Logout.model.logout, resetDeliveryDetails],
});
