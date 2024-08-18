import { createEvent, createStore, sample } from 'effector';
import {
    authByEmailFx,
    logoutFx,
    refreshAuthTokensFx,
    sessionModel,
} from '@/entities/viewer';
import httpStatus from 'http-status';
import { createGate } from 'effector-react';
import { AxiosError } from 'axios';
import { onRequestFail } from '@/shared/api/middleware';
import { interval } from 'patronum';
import { Token } from '@/shared/api';
import { persist } from 'effector-storage/local';
import { isBefore, subMinutes } from 'date-fns';
import {
    CHECK_NEED_TOKEN_REFRESH_INTERVAL_SEC,
    UPDATE_BEFORE_EXPIRATION_MINUTES,
} from './config';

export const InitGate = createGate();

const refreshRequested = createEvent();

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
    timeout: CHECK_NEED_TOKEN_REFRESH_INTERVAL_SEC,
    start: InitGate.open,
    stop: InitGate.close,
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
    target: refreshRequested,
});

/**
 * Refresh when 401
 */
onRequestFail.watch((error: AxiosError) => {
    const hasErrorStatus = error.response?.status;
    const isUnauthorized = hasErrorStatus === httpStatus.UNAUTHORIZED;
    if (hasErrorStatus && isUnauthorized) refreshRequested();
});

/**
 * Handle
 */

sample({
    clock: refreshRequested,
    source: {
        isOnline: sessionModel.$$isOnline,
        isAuthorized: sessionModel.$isAuthorized,
    },
    filter: ({ isOnline, isAuthorized }) => isOnline && isAuthorized,
    target: refreshAuthTokensFx,
});
