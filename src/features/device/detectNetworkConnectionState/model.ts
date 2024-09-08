import { createEvent, createStore, sample } from 'effector';
import { NetworkState } from './types';

/* eslint @typescript-eslint/no-unsafe-assignment: off */
/* eslint @typescript-eslint/no-unsafe-member-access: off */

export const updateNetworkState = createEvent<NetworkState>();
export const willGoOffline = createEvent();
export const willGoOnline = createEvent();

sample({
    clock: updateNetworkState,
    filter: (state) => state.online,
    fn: (state) => state.online,
    target: willGoOnline,
});

sample({
    clock: updateNetworkState,
    filter: (state) => !state.online,
    fn: (state) => !state.online,
    target: willGoOffline,
});

export const $networkState = createStore<Optional<NetworkState>>(null).on(
    updateNetworkState,
    (_, payload) => payload,
);
export const $$isOnline = $networkState.map((state) => state?.online);
