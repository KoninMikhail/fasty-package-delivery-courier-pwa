import React from 'react';

import { sharedConfigNetwork } from '@/shared/config';

const { NetworkInfoProvider } = sharedConfigNetwork;

export const withNetworkInfo = (component: () => React.ReactNode) => () => {
    return <NetworkInfoProvider>{component()}</NetworkInfoProvider>;
};
