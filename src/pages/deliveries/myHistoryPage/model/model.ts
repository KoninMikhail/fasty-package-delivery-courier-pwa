import { createGate } from 'effector-react';
import { createEvent, createStore, sample } from 'effector';
import { and, combineEvents, delay, once } from 'patronum';
import { widgetsDeliveriesHistoryModel } from '@/widgets/deliveries/history';
import { Logout } from '@/features/auth/logout';
import { RefreshToken } from '@/features/auth/refreshToken';
import { DetectNetworkConnectionState } from '@/features/device/detectNetworkConnectionState';

/**
 * Externals
 */
export const {
    model: { $$isOnline, willGoOnline, willGoOffline },
} = DetectNetworkConnectionState;

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

export const $isPageInitialized = and($isPageLoaded);

/**
 * Widgets initialization
 */
const initWidgetsOnline = createEvent();
const initWidgetsOffline = createEvent();

sample({
    clock: delay($isPageInitialized, 800),
    source: $$isOnline,
    filter: (isOnline) => !!isOnline,
    target: initWidgetsOnline,
});

sample({
    clock: delay($isPageInitialized, 800),
    source: $$isOnline,
    filter: (isOnline) => !isOnline,
    target: initWidgetsOffline,
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
    clock: combineEvents({
        events: [willGoOnline, MyDeliveriesHistoryPageGate.open],
        reset: willGoOffline,
    }),
    source: and(
        widgetsDeliveriesHistoryModel.$isInitialized,
        $isPageInitialized,
        $$isOnline,
    ),
    filter: (allowed) => allowed,
    target: widgetsDeliveriesHistoryModel.init,
});

sample({
    clock: willGoOffline,
    source: and(
        widgetsDeliveriesHistoryModel.$isInitialized,
        $isPageInitialized,
    ),
    filter: (allowed) => allowed,
    target: widgetsDeliveriesHistoryModel.setOnline.prepend(() => false),
});

/**
 * Logout when user is not authorized
 */

sample({
    clock: RefreshToken.updateTokenFail,
    target: [Logout.model.logout, widgetsDeliveriesHistoryModel.reset],
});
