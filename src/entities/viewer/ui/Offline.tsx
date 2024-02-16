import { PropsWithChildren } from 'react';
import { useNetworkInfo } from '@/shared/config/network';

export const Offline: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const networkInfo = useNetworkInfo();
    if (networkInfo.online) return null;
    return children;
};
