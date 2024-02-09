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

/**
 * Provides information about the device based on the User-Agent and screen dimensions.
 * It uses a context to pass down this information through the component tree.
 *
 * @param {PropsWithChildren} props - The props that contains children components.
 * @returns {ReactNode} - The Provider component wrapping its children with the device info context.
 */
export const DeviceInfoProvider = ({
    children,
}: PropsWithChildren): ReactNode => {
    /**
     * State to hold parsed User-Agent information.
     */
    const [deviceUAInfo, setDeviceUAInfo] =
        useState<DeviceInfo['userAgent']>(null);

    /**
     * State to hold computed device screen type based on screen dimensions.
     */
    const [computedDeviceScreenType, setComputedDeviceScreenType] =
        useState<DeviceInfo['screen']>(null);

    // Effect to parse the User-Agent and calculate screen dimensions once on mount.
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

    // Memoized context value to ensure stability across renders.
    const outputData = useMemo(
        () => ({
            userAgent: deviceUAInfo,
            screen: computedDeviceScreenType,
        }),
        [deviceUAInfo, computedDeviceScreenType],
    );

    // Context Provider that supplies the memoized output data to its children.
    return (
        <DeviceInfoContext.Provider value={outputData}>
            {children}
        </DeviceInfoContext.Provider>
    );
};
