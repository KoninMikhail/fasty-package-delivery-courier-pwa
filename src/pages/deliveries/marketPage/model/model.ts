import { createEvent, createStore, sample } from 'effector';
import { widgetMyDeliveriesModel } from '@/widgets/deliveries/myDeliveries';
import { and, condition, delay, interval, not, once } from "patronum";
import { widgetMarketModel } from '@/widgets/deliveries/market';
import { createGate } from 'effector-react';
import { widgetTopbarModel } from '@/widgets/viewer/welcome-topbar';
import { networkModel, sessionModel } from '@/entities/viewer';
import { widgetSearchQueryPopupModel } from '@/widgets/search/searchQueryPopup';
import { deliveryAssignCompleted } from '@/widgets/deliveries/market/model';
import { Logout } from '@/features/auth/logout';
import { RefreshToken } from '@/features/auth/refreshToken';
import { POLLING_TIMEOUT_SEC } from '../config';

/**
 * Externals
 */
const { $isAuthorized, resourcesLoaded } = sessionModel;
export const {$$isOnline} = networkModel;


/**
 * Page gate
 */

export const MarketPageGate = createGate<void>();

/**
 * Initialization
 */
const $isPageVisible = MarketPageGate.status;
const $isFirstPageLoad = createStore<boolean>(false).reset(
    Logout.model.userLoggedOut,
);

sample({
    clock: once({
        source: MarketPageGate.open,
        reset: Logout.model.userLoggedOut,
    }),
    fn: () => true,
    target: $isFirstPageLoad,
});

sample({
    clock: $isPageVisible,
    source: $isFirstPageLoad,
    filter: (isFirstLoad, isVisible) => isVisible && isFirstLoad,
    target: resourcesLoaded,
});

/**
 * Widgets initialization
 */

const $initWidgetsCompleted = and(
    widgetTopbarModel.$isInitialized,
    widgetMarketModel.$isInitialized,
    widgetMyDeliveriesModel.$isInitialized,
    widgetSearchQueryPopupModel.$isInitialized,
);


// Online
sample({
    clock: delay($isFirstPageLoad, 500),
    source: $isAuthorized,
    filter: (allowed) => !!allowed,
    target: widgetTopbarModel.init,
});

sample({
    clock: delay($isFirstPageLoad, 500),
    source: and(
        $isAuthorized,
        not(widgetMarketModel.$isInitialized),
    ),
    filter: (allowed) => !!allowed,
    target: widgetMarketModel.init,
});

sample({
    clock: delay($isFirstPageLoad, 500),
    target: widgetMyDeliveriesModel.init,
});

sample({
    clock: delay($isFirstPageLoad, 500),
    source: and($isPageVisible, not(widgetSearchQueryPopupModel.$isInitialized)),
    filter: (isAllow) => isAllow,
    target: widgetSearchQueryPopupModel.init,
});

sample({
    clock: delay($isFirstPageLoad, 500),
    source: widgetSearchQueryPopupModel.$isInitialized,
    filter: (isInitialized) => !isInitialized,
    target: widgetSearchQueryPopupModel.init,
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
 * Logout when user is not authorized and user is online
 */
sample({
    clock: RefreshToken.updateTokenFail,
    source: $$isOnline,
    filter: (isOnline) => isOnline,
    target: Logout.model.logout,
});

sample({
    clock: Logout.model.userLoggedOut,
    target: widgetMyDeliveriesModel.reset,
});
