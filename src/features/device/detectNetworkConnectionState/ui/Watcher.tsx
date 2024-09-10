import { useUnit } from 'effector-react';
import { useCallback, useEffect, useLayoutEffect } from 'react';
import { updateNetworkState } from '../model';
import { getNetworkState } from '../lib';

export const Watcher: FunctionComponent = () => {
    const setNetworkInfo = useUnit(updateNetworkState);

    const updateNetworkInfo = useCallback(() => {
        setNetworkInfo(getNetworkState());
    }, [setNetworkInfo]);

    useLayoutEffect(() => {
        updateNetworkInfo();
    }, [updateNetworkInfo]);

    useEffect(() => {
        window.addEventListener('online', updateNetworkInfo);
        window.addEventListener('offline', updateNetworkInfo);
        return () => {
            window.removeEventListener('online', updateNetworkInfo);
            window.removeEventListener('offline', updateNetworkInfo);
        };
    }, [updateNetworkInfo]);
};
