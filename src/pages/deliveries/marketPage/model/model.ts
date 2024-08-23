import { combine, createEvent, createStore, sample } from 'effector';
import { widgetMyDeliveriesModel } from '@/widgets/deliveries/myDeliveries';
import { and, condition, delay, interval, once } from 'patronum';
import { widgetMarketModel } from '@/widgets/deliveries/market';
import { createGate } from 'effector-react';
import { widgetTopbarModel } from '@/widgets/viewer/welcome-topbar';
import { sessionModel } from '@/entities/viewer';
import { widgetSearchQueryPopupModel } from '@/widgets/search/searchQueryPopup';
import { deliveryAssignCompleted } from '@/widgets/deliveries/market/model';
import { Logout } from '@/features/auth/logout';
import httpStatus from 'http-status';
import axios from 'axios';
import { RefreshToken } from '@/features/auth/refreshToken';
import { POLLING_TIMEOUT_SEC } from '../config';

export const MarketPageGate = createGate<void>();
/**
 * Events
 */

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

/**
 * Current page mode
 */
const { $isAuthorized, $$isOnline } = sessionModel;

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
    target: [widgetMarketModel.setOnline],
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

const $hasUnauthorizedErrors = combine(
    widgetMarketModel.$errors,
    widgetMyDeliveriesModel.$errors,
    (marketErrors, myDeliveriesErrors) => {
        return [...marketErrors, ...myDeliveriesErrors].some((error) => {
            if (axios.isAxiosError(error) && !!error.response) {
                return error?.response.status === httpStatus.UNAUTHORIZED;
            }
            return false;
        });
    },
);

sample({
    clock: $hasUnauthorizedErrors,
    filter: (hasUnauthorizedError) => !!hasUnauthorizedError,
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
