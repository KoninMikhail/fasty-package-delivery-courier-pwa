import { useCallback, useEffect, useLayoutEffect } from 'react';
import { useUnit } from 'effector-react';
import { getNetworkState } from '../lib/utils/network/getNetworkState';
import { setNetworkState } from '../model/parts/networkState';

/**
 * NetworkStateDetector is a functional component that detects and updates the network connection status.
 * It listens to the browser's 'online' and 'offline' events to maintain the current network state.
 * This component utilizes the `useUnit` hook from Effector to set the network state within a global state manager.
 * It uses `useEffect` and `useLayoutEffect` hooks to register and cleanup event listeners that handle changes in the network state.
 * The initial network state is updated using `useLayoutEffect` to ensure the network info is set before the first render.
 */
export const NetworkStateDetector: FunctionComponent = () => {
    // Defines a function to update the application's state with the current network information.
    const setNetworkInfo = useUnit(setNetworkState);

    // Creates a memoized callback that updates the network information state using `setNetworkInfo`.
    const updateNetworkInfo = useCallback(() => {
        // Calls `setNetworkInfo` with the current network status obtained from `getNetworkState()`.
        setNetworkInfo(getNetworkState());
    }, [setNetworkInfo]);

    // Synchronously updates the network info state before the first render.
    useLayoutEffect(() => {
        // Immediately updates the network information upon component mount.
        updateNetworkInfo();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Registers and cleans up event listeners for 'online' and 'offline' events.
    useEffect(() => {
        // Adds event listeners for 'online' and 'offline' events to update the network information.
        window.addEventListener('online', updateNetworkInfo);
        window.addEventListener('offline', updateNetworkInfo);
        // Returns a cleanup function that removes the event listeners when the component unmounts.
        return () => {
            window.removeEventListener('online', updateNetworkInfo);
            window.removeEventListener('offline', updateNetworkInfo);
        };
    }, [updateNetworkInfo]);
};
