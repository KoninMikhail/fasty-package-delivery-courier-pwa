import { createGate } from 'effector-react';
import { combine, createEvent, createStore, sample } from 'effector';
import { and, condition, delay, once } from 'patronum';
import { widgetsDeliveriesHistoryModel } from '@/widgets/deliveries/history';
import { Logout } from '@/features/auth/logout';
import { sessionModel } from '@/entities/viewer';
import { RefreshToken } from '@/features/auth/refreshToken';
import axios from 'axios';
import httpStatus from 'http-status';

/**
 * Externals
 */
const { $isAuthorized, $$isOnline, resourcesLoaded, resetResourcesLoaded } =
    sessionModel;

/**
 * Gate for the page
 */
export const MyDeliveriesHistoryPageGate = createGate<void>();

/**
 * Page initialization
 */
const pageMountedEvent = once({
    source: MyDeliveriesHistoryPageGate.open,
    reset: Logout.model.userLoggedOut,
});

const $isPageLoaded = createStore<boolean>(false)
    .on(pageMountedEvent, () => true)
    .reset(Logout.model.userLoggedOut);

sample({
    clock: pageMountedEvent,
    target: resourcesLoaded,
});

export const $isPageInitialized = and($isPageLoaded, $isAuthorized);

/**
 * Widgets initialization
 */
const initWidgetsOnline = createEvent();
const initWidgetsOffline = createEvent();

condition({
    source: delay($isPageInitialized, 800),
    if: $$isOnline,
    then: initWidgetsOnline,
    else: initWidgetsOffline,
});

// Online
sample({
    clock: initWidgetsOnline,
    source: widgetsDeliveriesHistoryModel.$isInitialized,
    filter: (isInitialized) => !isInitialized,
    target: widgetsDeliveriesHistoryModel.init,
});

// Offline
sample({
    clock: initWidgetsOffline,
    source: widgetsDeliveriesHistoryModel.$isInitialized,
    filter: (isInitialized) => !isInitialized,
    target: widgetsDeliveriesHistoryModel.initOffline,
});

/**
 * ============================
 * Change network status
 * ============================
 */

sample({
    clock: $$isOnline,
    source: $isPageInitialized,
    filter: (isPageInit, online) => online && isPageInit,
    target: widgetsDeliveriesHistoryModel.init,
});

sample({
    clock: $$isOnline,
    source: {
        widgetInit: widgetsDeliveriesHistoryModel.$isInitialized,
        pageInit: $isPageInitialized,
    },
    filter: ({ widgetInit, pageInit }, online) =>
        widgetInit && pageInit && !online,
    target: widgetsDeliveriesHistoryModel.setOnline.prepend(() => false),
});

/**
 * Logout when user is not authorized
 */
const $hasUnauthorizedError = combine(
    widgetsDeliveriesHistoryModel.$errors,
    (myDeliveriesErrors) => {
        return [...myDeliveriesErrors].some((error) => {
            if (axios.isAxiosError(error) && !!error.response) {
                return error?.response.status === httpStatus.UNAUTHORIZED;
            }
            return false;
        });
    },
);

sample({
    clock: $hasUnauthorizedError,
    filter: (hasUnauthorizedError) => !!hasUnauthorizedError,
    target: RefreshToken.forceRefreshRequested,
});

sample({
    clock: RefreshToken.updateTokenSuccess,
    target: widgetsDeliveriesHistoryModel.init,
});

sample({
    clock: RefreshToken.updateTokenFail,
    target: [Logout.model.logout, widgetsDeliveriesHistoryModel.reset],
});
