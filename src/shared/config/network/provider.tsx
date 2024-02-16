import {
    createContext,
    useState,
    useEffect,
    FunctionComponent,
    PropsWithChildren,
} from 'react';
import { NetworkState } from './types';
import { getNetworkState } from './utils';

export const NetworkContext = createContext<NetworkState | undefined>(
    undefined,
);

export const NetworkInfoProvider: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const [networkInfo, setNetworkInfo] =
        useState<NetworkState>(getNetworkState());

    const updateNetworkInfo = (): void => setNetworkInfo(getNetworkState());

    useEffect(() => {
        window.addEventListener('online', updateNetworkInfo);
        window.addEventListener('offline', updateNetworkInfo);
        return () => {
            window.removeEventListener('online', updateNetworkInfo);
            window.removeEventListener('offline', updateNetworkInfo);
        };
    }, []);

    return (
        <NetworkContext.Provider value={networkInfo}>
            {children}
        </NetworkContext.Provider>
    );
};
