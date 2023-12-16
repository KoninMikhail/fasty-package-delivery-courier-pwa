import {
    PropsWithChildren,
    ReactNode,
    useLayoutEffect,
    useMemo,
    useState,
} from 'react';
import { DeviceInfo } from './types';
import {
    assignScreenSizeToDeviceType,
    calculateCurrentScreenSize,
    parseUserAgent,
} from './utils';
import { DeviceInfoContext } from './context';

export const DeviceInfoProvider = ({
    children,
}: PropsWithChildren): ReactNode => {
    const [deviceUAInfo, setDeviceUAInfo] =
        useState<DeviceInfo['userAgent']>(null);
    const [computedDeviceScreenType, setComputedDeviceScreenType] =
        useState<DeviceInfo['screen']>(null);

    useLayoutEffect(() => {
        setDeviceUAInfo(parseUserAgent(navigator.userAgent));
        setComputedDeviceScreenType({
            width: window.innerWidth,
            height: window.innerHeight,
            currentScreenSize: calculateCurrentScreenSize(window.innerWidth),
            assignedToDeviceType: assignScreenSizeToDeviceType(
                calculateCurrentScreenSize(window.innerWidth),
            ),
        });
    }, []);

    const outputData = useMemo(
        () => ({
            userAgent: deviceUAInfo,
            screen: computedDeviceScreenType,
        }),
        [deviceUAInfo, computedDeviceScreenType],
    );

    return (
        <DeviceInfoContext.Provider value={outputData}>
            {children}
        </DeviceInfoContext.Provider>
    );
};
