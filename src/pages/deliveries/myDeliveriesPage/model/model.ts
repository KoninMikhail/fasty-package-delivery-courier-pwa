import { createGate } from 'effector-react';
import { combine, createEvent, createStore, sample } from 'effector';
import { and, condition, delay, interval, once } from 'patronum';
import { sessionModel } from '@/entities/viewer';
import { widgetMyDeliveriesModel } from '@/widgets/deliveries/myDeliveries';
import { Logout } from '@/features/auth/logout';
import axios from 'axios';
import httpStatus from 'http-status';
import { RefreshToken } from '@/features/auth/refreshToken';
import { POLLING_TIMEOUT } from '../config';

/**
 * Externals
 */
const { $isAuthorized, $$isOnline, resourcesLoaded } = sessionModel;

/**
 * Gate for the page
 */

export const MyDeliveriesPageGate = createGate<void>();

/**
 * Initial data fetching
 */

const $isPageInitialized = createStore<boolean>(false)
    .on(
        once({
            source: MyDeliveriesPageGate.open,
            reset: Logout.model.userLoggedOut,
        }),
        () => true,
    )
    .reset(Logout.model.userLoggedOut);

sample({
    clock: $isPageInitialized,
    filter: (isInitialized) => isInitialized,
    target: resourcesLoaded,
});

/**
 * Widgets initialization
 */
const initWidgetsOnline = createEvent();
const initWidgetsOffline = createEvent();

const $initWidgetsCompleted = and(widgetMyDeliveriesModel.$isInitialized);

condition({
    source: delay($isPageInitialized, 500),
    if: and($$isOnline, $isAuthorized),
    then: initWidgetsOnline,
    else: initWidgetsOffline,
});

// Online
sample({
    clock: initWidgetsOnline,
    source: widgetMyDeliveriesModel.$isInitialized,
    filter: (isInitialized) => !isInitialized,
    target: widgetMyDeliveriesModel.init,
});

sample({
    clock: initWidgetsOnline,
    target: RefreshToken.startTokenRefreshWatcher,
});

// Offline
sample({
    clock: initWidgetsOffline,
    source: widgetMyDeliveriesModel.$isInitialized,
    filter: (isInitialized) => !isInitialized,
    target: widgetMyDeliveriesModel.initOffline,
});

/**
 * Data polling
 */
const pollingDataAllowed = createEvent();
const pollingDataForbidden = createEvent();

condition({
    source: $initWidgetsCompleted,
    if: and($$isOnline, $isAuthorized, $initWidgetsCompleted),
    then: pollingDataAllowed,
    else: pollingDataForbidden,
});

const { tick: makePageExpired } = interval({
    timeout: POLLING_TIMEOUT * 60 * 1000,
    start: pollingDataAllowed,
    stop: pollingDataForbidden,
});

const updateContent = createEvent();
const $pageExpired = createStore<boolean>(false)
    .on(makePageExpired, () => true)
    .reset(updateContent);

sample({
    clock: once({
        source: MyDeliveriesPageGate.open,
        reset: $pageExpired,
    }),
    source: $pageExpired,
    filter: (isExpired) => isExpired,
    target: updateContent,
});

/**
 * Update my deliveries page content
 */
const $lastUpdateContentTimestamp = createStore<number>(0).on(
    widgetMyDeliveriesModel.dataUpdated,
    () => Date.now(),
);

sample({
    clock: updateContent,
    source: $lastUpdateContentTimestamp,
    filter: (lastUpdateTimestamp) =>
        Date.now() - lastUpdateTimestamp > POLLING_TIMEOUT * 60 * 1000,
    target: widgetMyDeliveriesModel.fetchData,
});

/**
 * Logout when user is not authorized
 */
const $hasUnauthorizedError = combine(
    widgetMyDeliveriesModel.$errors,
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
    source: $initWidgetsCompleted,
    filter: (isInitialized) => isInitialized,
    target: widgetMyDeliveriesModel.fetchData,
});

sample({
    clock: RefreshToken.updateTokenFail,
    target: Logout.model.logout,
});
