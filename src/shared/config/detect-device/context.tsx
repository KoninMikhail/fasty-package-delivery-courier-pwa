import { createContext } from 'react';

import { DeviceInfo } from './types';

export const DeviceInfoContext = createContext<Nullable<DeviceInfo>>(null);
