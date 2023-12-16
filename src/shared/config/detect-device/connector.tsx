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
