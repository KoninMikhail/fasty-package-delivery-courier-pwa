import { createEffect, createEvent, createStore } from 'effector';
import { debug } from 'patronum';
import { getNetworkState } from './utils';
import { NetworkState } from './types';

export const updateNetworkInfo = createEvent();

export const fetchNetworkState = createEffect(() => getNetworkState());

export const $networkInfo = createStore<NetworkState>(getNetworkState())
    .on(fetchNetworkState.doneData, (_, newState) => newState)
    .on(updateNetworkInfo, () => getNetworkState());
export const $isOnline = $networkInfo.map(({ online }) => online);
export const isOffline = $isOnline.map((online) => !online);

debug($networkInfo);
