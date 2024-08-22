import { createGate } from 'effector-react';
import { combine, createEvent, createStore, sample } from 'effector';
import { and, condition, delay, once } from 'patronum';
import { widgetsDeliveriesHistoryModel } from '@/widgets/deliveries/history';
import { Logout } from '@/features/auth/logout';
import { sessionModel } from '@/entities/viewer';
import { RefreshToken } from '@/features/auth/refreshToken';
import axios from 'axios';
import httpStatus from 'http-status';

export const MyDeliveriesHistoryPageGate = createGate<void>();

const $isPageInitialized = createStore<boolean>(false)
    .on(
        once({
            source: MyDeliveriesHistoryPageGate.open,
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

const $initWidgetsCompleted = and(widgetsDeliveriesHistoryModel.$isInitialized);

condition({
    source: delay($isPageInitialized, 500),
    if: and($$isOnline, $isAuthorized),
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
    source: widgetsDeliveriesHistoryModel.$isInitialized,
    filter: (isInitialized) => isInitialized,
    target: widgetsDeliveriesHistoryModel.setOnline,
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
    source: $initWidgetsCompleted,
    filter: (isInitialized) => isInitialized,
    target: widgetsDeliveriesHistoryModel.fetchData,
});

sample({
    clock: RefreshToken.updateTokenFail,
    target: Logout.model.logout,
});
