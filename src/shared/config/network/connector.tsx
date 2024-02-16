import { useContext } from 'react';
import { NetworkState } from './types';
import { NetworkContext } from './provider';

export const useNetworkInfo = (): NetworkState => {
    const context = useContext(NetworkContext);
    if (context === undefined) {
        throw new Error(
            'useNetworkInfo must be used within a NetworkInfoProvider',
        );
    }
    return context;
};
