import resolveConfig from 'tailwindcss/resolveConfig';
import { createEvent, createStore } from 'effector';
import { debug } from 'patronum';
import {
    assignScreenSizeToDeviceType,
    calculateCurrentScreenSize,
    parseUserAgent,
} from '../../lib/utils';
import tailwindConfig from '../../../../../tailwind.config';

const { screens } = resolveConfig(tailwindConfig).theme;

export interface DeviceInfo {
    userAgent: UserAgentInfo;
    screen: ScreenInfo;
}

export interface UserAgentInfo {
    browser: {
        name?: string;
        version?: string;
    };
    cpu: {
        architecture?: string;
    };
    device: {
        model?: string;
        type?: string;
        vendor?: string;
    };
    os: {
        name?: string;
        version?: string;
    };
}

export interface ScreenInfo {
    width: number;
    height: number;
    currentScreenSize: Nullable<ScreenCode>;
    assignedToDeviceType: Nullable<DeviceType>;
}

export type ScreenCode = keyof typeof screens;

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

/**
 * Events
 */
export const setDeviceScreenSize = createEvent<{
    width: DeviceInfo['screen']['width'];
    height: DeviceInfo['screen']['height'];
}>();
export const setDeviceUA = createEvent<string>();

/**
 * Device Info Store
 */

const initialDeviceInfo: DeviceInfo = {
    userAgent: {
        browser: {},
        cpu: {},
        device: {},
        os: {},
    },
    screen: {
        width: 0,
        height: 0,
        currentScreenSize: null,
        assignedToDeviceType: null,
    },
};

export const $deviceInfo = createStore<DeviceInfo>(initialDeviceInfo)
    .on(setDeviceScreenSize, (_state, payload) => {
        const { width, height } = payload;

        return {
            ..._state,
            screen: {
                ..._state.screen,
                width,
                height,
                currentScreenSize: calculateCurrentScreenSize(width),
                assignedToDeviceType: assignScreenSizeToDeviceType(
                    calculateCurrentScreenSize(width),
                ),
            },
        };
    })
    .on(setDeviceUA, (_state, payload) => ({
        ..._state,
        userAgent: parseUserAgent(payload),
    }));

export const $$deviceScreen = $deviceInfo.map((state) => state.screen);
export const $$deviceType = $$deviceScreen.map(
    (state) => state.assignedToDeviceType,
);
export const $$isMobile = $$deviceType.map((state) => state === 'mobile');
export const $$isTablet = $$deviceType.map((state) => state === 'tablet');
export const $$isDesktop = $$deviceType.map((state) => state === 'desktop');

debug($deviceInfo);
