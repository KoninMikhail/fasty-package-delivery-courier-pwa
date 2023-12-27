import { useContext } from 'react';
import { DeviceInfo } from './types';
import { DeviceInfoContext } from './context';

export const useDeviceInfo = (): DeviceInfo | null => {
    const context = useContext(DeviceInfoContext);
    if (context === undefined) {
        throw new Error(
            'useDeviceInfo must be used within a DeviceInfoProvider',
        );
    }
    return context;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useDeviceScreen = () => {
    const context = useContext(DeviceInfoContext);
    if (context === undefined) {
        throw new Error(
            'useDeviceScreenInfo must be used within a DeviceInfoProvider',
        );
    }
    return {
        screen: context?.screen?.assignedToDeviceType,
        isDesktop: context?.screen?.assignedToDeviceType === 'desktop',
        isTablet: context?.screen?.assignedToDeviceType === 'tablet',
        isMobile: context?.screen?.assignedToDeviceType === 'mobile',
    };
};
