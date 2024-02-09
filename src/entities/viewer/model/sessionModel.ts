import { createStore, sample } from 'effector';
import { Session, sharedAuthEffects } from '@/shared/auth';
import { debug } from 'patronum';

const { authByEMailRequestFx, validateTokenFx } = sharedAuthEffects;

export const $sessionViewer = createStore<Session | null>(null);
export const $$isAuthViewer = $sessionViewer.map(
    (session) => session && session?.token !== null,
);

sample({
    clock: [authByEMailRequestFx.doneData, validateTokenFx.doneData],
    target: $sessionViewer,
});

debug($sessionViewer);
debug($$isAuthViewer);
