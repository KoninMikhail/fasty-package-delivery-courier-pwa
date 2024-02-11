import { createEvent, createStore, sample } from 'effector';
import { Session, sharedAuthEffects } from '@/shared/auth';

const { authByEMailRequestFx, revalidateTokenFx, removeSessionFx } =
    sharedAuthEffects;

export const requestProtectedContent = createEvent();
export const $session = createStore<Session | null>(null);

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
    clock: requestProtectedContent,
    target: revalidateTokenFx,
});

sample({
    clock: removeSessionFx.done,
    fn: () => null,
    target: $session,
});
