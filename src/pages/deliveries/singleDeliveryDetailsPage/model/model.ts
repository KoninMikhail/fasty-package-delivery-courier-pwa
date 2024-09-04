import { createGate } from 'effector-react';
import { createEvent, createStore, sample } from 'effector';
import { getDeliveryFromMyDeliverisLocalStorageCache } from '@/entities/delivery';
import { networkModel, sessionModel } from '@/entities/viewer';
import { and, condition, delay, once } from 'patronum';
import { sharedLibTypeGuards } from '@/shared/lib';
import { FetchDeliveryById } from '@/features/delivery/fetchDeliveryById';
import {
    $pageDeliveryDetails,
    setDeliveryDetails,
} from '@/pages/deliveries/singleDeliveryDetailsPage/model/stores';
import axios from 'axios';
import httpStatus from 'http-status';
import { Delivery } from '@/shared/api';
import { Logout } from '@/features/auth/logout';
import { widgetMyDeliveriesModel } from '@/widgets/deliveries/myDeliveries';
import { RefreshToken } from '@/features/auth/refreshToken';
import { widgetDeliveryStatusModel } from '@/widgets/deliveries/deliveryStatus';
import { PageState } from '../types';

/* eslint-disable unicorn/no-array-method-this-argument */
/* eslint-disable unicorn/no-thenable */

const { isEmpty } = sharedLibTypeGuards;

/**
 * Gateway for the delivery details page
 */
export const DeliveryDetailsPageGate = createGate<{
    deliveryId?: string;
}>();

/**
 * Page initialization
 */
const pageMountedEvent = once({
    source: DeliveryDetailsPageGate.open,
    reset: Logout.model.userLoggedOut,
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
    .reset(DeliveryDetailsPageGate.close);

/**
 * Network state
 */

export const { $$isOnline } = networkModel;
export const { $isAuthorized } = sessionModel;

/**
 * Data fetching
 */

const readyForFetch = createEvent<Delivery['id']>();

const $deliveryId = createStore<string>('')
    .on(DeliveryDetailsPageGate.open, (_, { deliveryId }) => deliveryId ?? '')
    .reset(DeliveryDetailsPageGate.close);
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
    if: and($$isOnline, $isAuthorized),
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

sample({
    clock: Logout.model.userLoggedOut,
    target: widgetMyDeliveriesModel.reset,
});

/**
 * Logout when user is not authorized
 */

/* sample({
    clock: $$hasAuthErrors,
    source: DeliveryDetailsPageGate.status,
    filter: (isPageOpened, hasUnauthorizedError) =>
        isPageOpened && hasUnauthorizedError,
    target: RefreshToken.forceRefreshRequested,
}); */

sample({
    clock: RefreshToken.updateTokenSuccess,
    source: $deliveryId,
    target: readyForFetch,
});

sample({
    clock: RefreshToken.updateTokenFail,
    target: Logout.model.logout,
});
