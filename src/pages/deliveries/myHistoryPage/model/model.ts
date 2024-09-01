import { createGate } from 'effector-react';
import { createEvent, createStore, sample } from 'effector';
import { and, condition, delay, once } from 'patronum';
import { widgetsDeliveriesHistoryModel } from '@/widgets/deliveries/history';
import { Logout } from '@/features/auth/logout';
import { networkModel, sessionModel } from '@/entities/viewer';
import { RefreshToken } from '@/features/auth/refreshToken';

/**
 * Externals
 */
const { $isAuthorized, resourcesLoaded, resetResourcesLoaded } =
    sessionModel;
const { $$isOnline } = networkModel;

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

sample({
    clock: RefreshToken.updateTokenFail,
    target: [Logout.model.logout, widgetsDeliveriesHistoryModel.reset],
});
