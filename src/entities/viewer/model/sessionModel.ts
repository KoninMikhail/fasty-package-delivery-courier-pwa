import { createEvent, createStore, sample } from 'effector';
import { User } from '@/shared/api';
import { empty, not, once, pending } from 'patronum';
import { createGate } from 'effector-react';
import { authByEmailFx, getViewerProfileFx, logoutFx } from '../api';

/**
 * Gates
 */

export const SessionInitGate = createGate();

/**
 * Events
 */
export const initSession = createEvent();
export const initSessionComplete = createEvent();
export const failAuthOnApiRequest = createEvent();

/**
 * Data stores
 */
export const $sessionStore = createStore<Nullable<User>>(null);
$sessionStore
    .on(getViewerProfileFx.done, (_, { result }) => result)
    .on(getViewerProfileFx.fail, () => null);
$sessionStore.reset([
    failAuthOnApiRequest,
    logoutFx.done,
    logoutFx.fail,
    authByEmailFx.fail,
]);

/**
 * State
 */
export const $isInitialized = createStore<boolean>(false).on(
    initSessionComplete,
    () => true,
);
export const $isSessionAuthorized = not(empty($sessionStore));
export const $isSessionPending = pending([getViewerProfileFx]);

/**
 * Handlers
 */

sample({
    clock: SessionInitGate.open,
    target: initSession,
});

sample({
    clock: once(initSession),
    source: $isInitialized,
    filter: (isInitialized) => !isInitialized,
    target: getViewerProfileFx,
});

sample({
    clock: getViewerProfileFx.done,
    target: initSessionComplete,
});

sample({
    clock: authByEmailFx.doneData,
    target: getViewerProfileFx,
});
