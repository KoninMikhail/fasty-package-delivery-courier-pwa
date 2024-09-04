import { Offline, Online, Watcher } from './ui';
import { $$isOnline, $networkState } from './model';

export const DetectNetworkConnectionState = {
    model: {
        $networkState,
        $$isOnline,
    },
    Online,
    Offline,
    Watcher,
};
export * from './types';
