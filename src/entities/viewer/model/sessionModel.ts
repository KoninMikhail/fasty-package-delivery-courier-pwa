import { createStore, sample } from 'effector';
import { Session, sharedAuthEffects } from '@/shared/auth';
import { createGate } from 'effector-react';

const { authByEMailRequestFx, getSessionFx, removeSessionFx } =
    sharedAuthEffects;

export const AuthGate = createGate<Session>();

export const $session = createStore<Session | null>(null);
export const $isAuthorized = $session.map((session) => session !== null);

/**
 * Load session from first time
 */
sample({
    clock: authByEMailRequestFx.doneData,
    target: $session,
});

/**
 * Validate token and remove session if token is invalid
 */

sample({
    clock: AuthGate.open,
    target: getSessionFx,
});

sample({
    clock: getSessionFx.doneData,
    target: $session,
});

sample({
    clock: getSessionFx.fail,
    target: removeSessionFx,
});

/**
 * Remove session on logout
 */
sample({
    clock: removeSessionFx.done,
    fn: () => null,
    target: $session,
});
