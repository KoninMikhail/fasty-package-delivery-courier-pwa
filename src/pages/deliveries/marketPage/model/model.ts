import { createEvent, createStore, sample } from 'effector';
import { widgetMyDeliveriesModel } from '@/widgets/deliveries/myDeliveries';
import { and, condition, debug, delay, interval, once } from 'patronum';
import { widgetMarketModel } from '@/widgets/deliveries/market';
import { createGate } from 'effector-react';
import { widgetTopbarModel } from '@/widgets/viewer/welcome-topbar';
import { sessionModel } from '@/entities/viewer';
import { widgetSearchQueryPopupModel } from '@/widgets/search/searchQueryPopup';
import { deliveryAssignCompleted } from '@/widgets/deliveries/market/model';
import { Logout } from '@/features/auth/logout';
import { RefreshToken } from '@/features/auth/refreshToken';
import { $$hasAuthErrors } from '@/shared/errors';
import { POLLING_TIMEOUT_SEC } from '../config';

/**
 * Externals
 */
const { $isAuthorized, $$isOnline, resourcesLoaded } = sessionModel;

/**
 * Page gate
 */

export const MarketPageGate = createGate<void>();

debug({
    state: MarketPageGate.status,
});

/**
 * Initialization
 */

const $isPageInitialized = createStore<boolean>(false)
    .on(
        once({
            source: MarketPageGate.open,
            reset: Logout.model.userLoggedOut,
        }),
        () => true,
    )
    .reset(Logout.model.userLoggedOut);

sample({
    clock: MarketPageGate.open,
    target: resourcesLoaded,
});

/**
 * Widgets initialization
 */
const initWidgetsOnline = createEvent();
const initWidgetsOffline = createEvent();

const $initWidgetsCompleted = and(
    widgetTopbarModel.$isInitialized,
    widgetMarketModel.$isInitialized,
    widgetMyDeliveriesModel.$isInitialized,
    widgetSearchQueryPopupModel.$isInitialized,
);

condition({
    source: delay($isPageInitialized, 500),
    if: and($$isOnline, $isAuthorized),
    then: initWidgetsOnline,
    else: initWidgetsOffline,
});

// Online
sample({
    clock: initWidgetsOnline,
    target: widgetTopbarModel.init,
});

sample({
    clock: initWidgetsOnline,
    source: widgetMarketModel.$isInitialized,
    filter: (isInitialized) => !isInitialized,
    target: widgetMarketModel.init,
});

sample({
    clock: initWidgetsOnline,
    target: widgetMyDeliveriesModel.init,
});

sample({
    clock: initWidgetsOnline,
    source: widgetSearchQueryPopupModel.$isInitialized,
    filter: (isInitialized) => !isInitialized,
    target: widgetSearchQueryPopupModel.init,
});

sample({
    clock: initWidgetsOnline,
    target: RefreshToken.startTokenRefreshWatcher,
});

// Offline
sample({
    clock: initWidgetsOffline,
    target: widgetTopbarModel.initOffline,
});

sample({
    clock: initWidgetsOffline,
    source: widgetMarketModel.$isInitialized,
    filter: (isInitialized) => !isInitialized,
    target: widgetMarketModel.initOffline,
});

sample({
    clock: initWidgetsOffline,
    target: widgetMyDeliveriesModel.init,
});

sample({
    clock: initWidgetsOffline,
    source: widgetSearchQueryPopupModel.$isInitialized,
    filter: (isInitialized) => !isInitialized,
    target: widgetSearchQueryPopupModel.init,
});

/**
 * ============================
 * Change network status
 * ============================
 */

sample({
    clock: $$isOnline,
    target: [widgetMarketModel.init, widgetMyDeliveriesModel.init],
});

/**
 * ============================
 * Update my deliveries when delivery is assigned
 * ============================
 */

sample({
    clock: deliveryAssignCompleted,
    target: widgetMyDeliveriesModel.fetchData,
});

/**
 * ============================
 * Periodic data polling for market
 * ============================
 */
const newContentRequested = createEvent();
const dataPollingAllowed = createEvent();
const dataPollingForbidden = createEvent();

const { tick: marketContentObsolete } = interval({
    timeout: POLLING_TIMEOUT_SEC * 1000,
    start: dataPollingAllowed,
    stop: dataPollingForbidden,
});

condition({
    source: $initWidgetsCompleted,
    if: and($$isOnline, $isAuthorized),
    then: dataPollingAllowed,
    else: dataPollingForbidden,
});

const $isContentObsolete = createStore<boolean>(false)
    .on(marketContentObsolete, () => true)
    .reset(newContentRequested);

sample({
    clock: once({
        source: MarketPageGate.open,
        reset: $isContentObsolete,
    }),
    source: {
        isExpired: $isContentObsolete,
        isOnline: $$isOnline,
    },
    filter: ({ isExpired, isOnline }) => isExpired && isOnline,
    target: newContentRequested,
});

sample({
    clock: newContentRequested,
    target: widgetMarketModel.fetchData,
});

/**
 * Logout when user is not authorized
 */

sample({
    clock: $$hasAuthErrors,
    source: MarketPageGate.status,
    filter: (isPageOpened, hasUnauthorizedError) =>
        isPageOpened && hasUnauthorizedError,
    target: RefreshToken.forceRefreshRequested,
});

sample({
    clock: RefreshToken.updateTokenSuccess,
    target: [widgetMyDeliveriesModel.fetchData, widgetMarketModel.fetchData],
});

sample({
    clock: RefreshToken.updateTokenFail,
    target: Logout.model.logout,
});

sample({
    clock: Logout.model.userLoggedOut,
    target: widgetMyDeliveriesModel.reset,
});
