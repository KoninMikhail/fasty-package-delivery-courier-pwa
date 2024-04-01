import {
    createContext,
    useEffect,
    FunctionComponent,
    PropsWithChildren,
} from 'react';
import { useUnit } from 'effector-react';
import { NetworkState } from './types';
import { $networkInfo, fetchNetworkState } from './model';

export const NetworkContext = createContext<NetworkState | undefined>(
    undefined,
);

export const NetworkInfoProvider: FunctionComponent<PropsWithChildren> = ({
    children,
}) => {
    const networkInfo = useUnit($networkInfo);

    useEffect(() => {
        const handleNetworkChange = (): void => {
            void fetchNetworkState();
        };

        window.addEventListener('online', handleNetworkChange);
        window.addEventListener('offline', handleNetworkChange);

        void fetchNetworkState();

        return () => {
            window.removeEventListener('online', handleNetworkChange);
            window.removeEventListener('offline', handleNetworkChange);
        };
    }, []);

    return (
        <NetworkContext.Provider value={networkInfo}>
            {children}
        </NetworkContext.Provider>
    );
};
