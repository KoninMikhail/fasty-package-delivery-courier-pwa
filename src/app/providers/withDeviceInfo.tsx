import type React from 'react';
import { sharedConfigDetectDevice } from '@/shared/config';

const { DeviceInfoProvider } = sharedConfigDetectDevice;

export const withDeviceInfo = (component: () => React.ReactNode) => () => (
    <DeviceInfoProvider>{component()}</DeviceInfoProvider>
);
