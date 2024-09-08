import { Offline, Online, Watcher } from './ui';
import {
    $$isOnline,
    $networkState,
    willGoOffline,
    willGoOnline,
} from './model';

export const DetectNetworkConnectionState = {
    model: {
        $networkState,
        willGoOnline,
        willGoOffline,
        $$isOnline,
    },
    Online,
    Offline,
    Watcher,
};
export * from './types';
