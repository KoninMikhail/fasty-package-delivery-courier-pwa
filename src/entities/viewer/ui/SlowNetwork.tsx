import { useNetworkInfo } from '@/shared/config/network';
import { PropsWithChildren } from 'react';

export const SlowNetwork: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const networkInfo = useNetworkInfo();
    if (networkInfo.effectiveType != null) {
        const slowNetwork = ['2g', 'slow-2g'].includes(
            networkInfo.effectiveType,
        );
        if (slowNetwork) return children;
    }
    return null;
};
