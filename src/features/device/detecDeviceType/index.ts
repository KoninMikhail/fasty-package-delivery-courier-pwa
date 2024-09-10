import './init';
import {
    $$deviceScreen,
    $$deviceType,
    $$isDesktop,
    $$isMobile,
    $$isTablet,
    $deviceInfo,
} from './model';

import { Watcher, GuardAppVersion } from './ui';

export const DetectDeviceType = {
    $$deviceScreen,
    $$deviceType,
    $$isDesktop,
    $$isMobile,
    $$isTablet,
    $deviceInfo,
    Watcher,
    GuardAppVersion,
};
export * from './ui/Watcher';
