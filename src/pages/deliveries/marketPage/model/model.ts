import { createEvent, createStore, sample } from 'effector';
import { widgetMyDeliveriesModel } from '@/widgets/deliveries/myDeliveries';
import { and, condition, debug, delay, interval, not, once } from 'patronum';
import { widgetMarketModel } from '@/widgets/deliveries/market';
import { createGate } from 'effector-react';
import { widgetTopbarModel } from '@/widgets/viewer/welcome-topbar';
import { widgetSearchQueryPopupModel } from '@/widgets/search/searchQueryPopup';

import { Logout } from '@/features/auth/logout';
import { RefreshToken } from '@/features/auth/refreshToken';
import { DetectNetworkConnectionState } from '@/features/device/detectNetworkConnectionState';
import { POLLING_TIMEOUT_SEC, TIMEOUT_BEFORE_INIT_WIDGETS } from '../config';

/**
 * Externals
 */
const {
    model: { $$isOnline },
} = DetectNetworkConnectionState;

/**
 * Page gate
 */

export const MarketPageGate = createGate<void>();

/**
 * Page initialization
 */
const $isPageVisible = MarketPageGate.status;
const $isFirstPageLoad = createStore<boolean>(false)
    .on(MarketPageGate.open, () => true)
    .reset(Logout.model.userLoggedOut);

debug({
    pageVisible: $isPageVisible,
    isFirstPageLoad: $isFirstPageLoad,
});

/**
 * ==========================================
 * Widgets initialization
 * ==========================================
 */

const $allWidgetsInitCompleted = and(
    widgetTopbarModel.$isInitialized,
    widgetMarketModel.$isInitialized,
    widgetMyDeliveriesModel.$isInitialized,
    widgetSearchQueryPopupModel.$isInitialized,
);

// Topbar
sample({
    clock: delay(MarketPageGate.open, 500),
    source: $isFirstPageLoad,
    filter: (allowed) => allowed,
    target: widgetTopbarModel.init,
});

// Market
sample({
    clock: delay(MarketPageGate.open, TIMEOUT_BEFORE_INIT_WIDGETS),
    source: and($$isOnline, not(widgetMarketModel.$isInitialized)),
    filter: (allowed) => !!allowed,
    target: widgetMarketModel.init,
});

sample({
    clock: delay(MarketPageGate.open, TIMEOUT_BEFORE_INIT_WIDGETS),
    source: and(
        $isFirstPageLoad,
        not($$isOnline),
        not(widgetMarketModel.$isInitialized),
    ),
    filter: (allowed) => !!allowed,
    target: widgetMarketModel.initOffline,
});

// My deliveries
sample({
    clock: delay(MarketPageGate.open, TIMEOUT_BEFORE_INIT_WIDGETS),
    source: and(
        $isFirstPageLoad,
        not(widgetMyDeliveriesModel.$isInitialized),
        $$isOnline,
    ),
    filter: (allowed) => allowed,
    target: widgetMyDeliveriesModel.init,
});

sample({
    clock: delay(MarketPageGate.open, TIMEOUT_BEFORE_INIT_WIDGETS),
    source: and(
        $isFirstPageLoad,
        not(widgetMyDeliveriesModel.$isInitialized),
        not($$isOnline),
    ),
    filter: (allowed) => allowed,
    target: widgetMyDeliveriesModel.initOffline,
});

// Search query popup
sample({
    clock: delay(MarketPageGate.open, TIMEOUT_BEFORE_INIT_WIDGETS),
    source: and(
        $isFirstPageLoad,
        $isPageVisible,
        not(widgetSearchQueryPopupModel.$isInitialized),
    ),
    filter: (isAllow) => isAllow,
    target: widgetSearchQueryPopupModel.init,
});

/**
 * ============================
 * Change network state
 * ============================
 */

sample({
    clock: $$isOnline,
    filter: (isOnline) => isOnline === false || isOnline === true,
    fn: (isOnline) => !isOnline,
    target: [widgetMyDeliveriesModel.setOffline, widgetMarketModel.setOffline],
});

/**
 * ============================
 * Re-fetch my deliveries when delivery is assigned
 * ============================
 */

sample({
    clock: widgetMarketModel.deliveryAssignCompleted,
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
    source: $allWidgetsInitCompleted,
    if: $$isOnline,
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
    filter: ({ isExpired, isOnline }) => !!isExpired && !!isOnline,
    target: newContentRequested,
});

sample({
    clock: newContentRequested,
    target: widgetMarketModel.fetchData,
});

/**
 * Logout when user is not authorized and user is online
 */
sample({
    clock: RefreshToken.updateTokenFail,
    source: $$isOnline,
    filter: (isOnline) => !!isOnline,
    target: Logout.model.logout,
});

sample({
    clock: Logout.model.userLoggedOut,
    target: [widgetMyDeliveriesModel.reset, widgetMarketModel.reset],
});
