import { createEvent, createStore } from 'effector';

export type NetworkState = {
    online: boolean;
    downlink?: number;
    type?: string;
    effectiveType?: string;
};

/* eslint @typescript-eslint/no-unsafe-assignment: off */
/* eslint @typescript-eslint/no-unsafe-member-access: off */

export const setNetworkState = createEvent<NetworkState>();
export const $networkState = createStore<Optional<NetworkState>>(null).on(
    setNetworkState,
    (_, payload) => payload,
);
export const $$isOnline = $networkState.map((state) => state?.online ?? false);
