import { createEvent, sample } from 'effector';
import { refreshAuthTokensFx } from '@/entities/viewer';
import { pending } from 'patronum';

export const tokenRefreshRequested = createEvent();
export const updateTokenSuccess = createEvent();
export const updateTokenFail = createEvent();

const $isTokenRefreshing = pending([refreshAuthTokensFx]);

/**
 * Handle
 */

sample({
    clock: tokenRefreshRequested,
    filter: $isTokenRefreshing.map((isRefreshing) => !isRefreshing),
    target: refreshAuthTokensFx,
});

sample({
    clock: refreshAuthTokensFx.doneData,
    target: updateTokenSuccess,
});

sample({
    clock: refreshAuthTokensFx.failData,
    target: updateTokenFail,
});
