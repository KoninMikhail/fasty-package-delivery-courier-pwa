import { createContext } from 'react';

import { DeviceInfo } from './types';

export const DeviceInfoContext = createContext<DeviceInfo | null>(null);
