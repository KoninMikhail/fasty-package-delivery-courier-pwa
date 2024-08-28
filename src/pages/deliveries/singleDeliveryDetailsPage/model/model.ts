import { createGate } from 'effector-react';
import { createEvent, createStore, sample } from 'effector';
import { SetDeliveryStatus } from '@/features/delivery/setDeliveryStatus';
import {
    setDeliveryStatusFx,
    getDeliveryFromMyDeliverisLocalStorageCache,
} from '@/entities/delivery';
import { sessionModel } from '@/entities/viewer';
import { and, condition, delay, once } from 'patronum';
import { sharedLibTypeGuards } from '@/shared/lib';
import { FetchDeliveryById } from '@/features/delivery/fetchDeliveryById';
import { setDeliveryDetails } from '@/pages/deliveries/singleDeliveryDetailsPage/model/stores';
import axios from 'axios';
import httpStatus from 'http-status';
import { Delivery } from '@/shared/api';
import { Logout } from '@/features/auth/logout';
import { widgetMyDeliveriesModel } from '@/widgets/deliveries/myDeliveries';
import { RefreshToken } from '@/features/auth/refreshToken';
import { PageState } from '../types';

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
 * Page initialization
 */
const pageMountedEvent = once({
    source: DeliveryDetailsPageGateway.open,
    reset: Logout.model.userLoggedOut,
});

sample({
    clock: pageMountedEvent,
    target: sessionModel.resourcesLoaded,
});

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
    .reset(DeliveryDetailsPageGateway.close);

/**
 * Network state
 */

export const $isOnline = sessionModel.$$isOnline;
export const { $isAuthorized } = sessionModel;

/**
 * Data fetching
 */

const readyForFetch = createEvent<Delivery['id']>();

const $deliveryId = createStore<string>('')
    .on(
        DeliveryDetailsPageGateway.open,
        (_, { deliveryId }) => deliveryId ?? '',
    )
    .reset(DeliveryDetailsPageGateway.close);
const $isDeliveryIdEmpty = $deliveryId.map((deliveryId) => isEmpty(deliveryId));

sample({
    clock: $isDeliveryIdEmpty,
    source: $deliveryId,
    filter: (_, itNotHaveDeliveryId) => !itNotHaveDeliveryId,
    fn: (deliveryId) => deliveryId,
    target: readyForFetch,
});

condition({
    source: delay(readyForFetch, 600),
    if: and($isOnline, $isAuthorized),
    then: FetchDeliveryById.fetch,
    else: getDeliveryFromMyDeliverisLocalStorageCache,
});

sample({
    clock: getDeliveryFromMyDeliverisLocalStorageCache.doneData,
    target: setDeliveryDetails,
});

sample({
    clock: FetchDeliveryById.fetchSuccess,
    target: setDeliveryDetails,
});

/**
 * Page
 */

sample({
    clock: FetchDeliveryById.fetchSuccess,
    target: setDeliveryDetails,
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

sample({
    clock: Logout.model.userLoggedOut,
    target: widgetMyDeliveriesModel.reset,
});

/**
 * Logout when unauthorized
 */

/**
 * Logout when user is not authorized
 */

const $hasUnauthorizedErrors = FetchDeliveryById.$errors.map((errors) => {
    return errors.some((error) => {
        if (axios.isAxiosError(error) && !!error.response) {
            return error?.response.status === httpStatus.UNAUTHORIZED;
        }
        return false;
    });
});

sample({
    clock: $hasUnauthorizedErrors,
    filter: (hasUnauthorizedError) => !!hasUnauthorizedError,
    target: RefreshToken.forceRefreshRequested,
});

sample({
    clock: RefreshToken.updateTokenSuccess,
    source: $deliveryId,
    target: readyForFetch,
});

sample({
    clock: RefreshToken.updateTokenFail,
    target: Logout.model.logout,
});
