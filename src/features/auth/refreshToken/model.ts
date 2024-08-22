import { createEvent, createStore, sample } from 'effector';
import {
    authByEmailFx,
    logoutFx,
    refreshAuthTokensFx,
} from '@/entities/viewer';
import { Token } from '@/shared/api';
import { persist } from 'effector-storage/local';
import { isBefore, subMinutes } from 'date-fns';
import { interval, once } from 'patronum';
import {
    CHECK_NEED_TOKEN_REFRESH_INTERVAL_MIN,
    UPDATE_BEFORE_EXPIRATION_MINUTES,
} from './config';

export const startTokenRefreshWatcher = createEvent();
export const forceRefreshRequested = createEvent();
export const updateTokenSuccess = createEvent();
export const updateTokenFail = createEvent();

/**
 * ACCESS TOKEN EXPIRE DATE
 */
const $accessTokenExpiredDate = createStore<Optional<Token['expires']>>(null)
    .on(
        authByEmailFx.doneData,
        (_, payload) => payload?.tokens?.access?.expires ?? null,
    )
    .reset(logoutFx);

persist({
    store: $accessTokenExpiredDate,
    key: 'access-token-expiration',
});

/**
 * Periodic token refresh
 */
const { tick } = interval({
    timeout: 1000 * 60 * CHECK_NEED_TOKEN_REFRESH_INTERVAL_MIN,
    start: once({ source: startTokenRefreshWatcher, reset: updateTokenFail }),
    stop: updateTokenFail,
});

const $$accessRequiredUpdate = $accessTokenExpiredDate.map((date) => {
    if (!date) return null;
    return isBefore(
        subMinutes(date, UPDATE_BEFORE_EXPIRATION_MINUTES),
        new Date(),
    );
});

sample({
    clock: tick,
    source: $$accessRequiredUpdate,
    filter: (isRequired) => !!isRequired,
    target: forceRefreshRequested,
});

/**
 * Handle
 */

sample({
    clock: forceRefreshRequested,
    target: refreshAuthTokensFx,
});

sample({
    clock: refreshAuthTokensFx.done,
    target: updateTokenSuccess,
});

sample({
    clock: refreshAuthTokensFx.fail,
    target: updateTokenFail,
});
