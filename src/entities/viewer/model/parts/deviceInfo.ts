import { createEvent, createStore } from 'effector';
import { calculateCurrentScreenSize } from '../../lib/utils/device-detect/calculateCurrentScreenSize';
import { assignScreenSizeToDeviceType } from '../../lib/utils/device-detect/assignScreenSizeToDeviceType';
import { parseUserAgent } from '../../lib/utils/device-detect/parseUserAgent';
import { DeviceInfo } from '../../types/device';

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
