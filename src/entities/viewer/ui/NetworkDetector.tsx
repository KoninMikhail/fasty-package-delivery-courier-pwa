import { useCallback, useEffect, useLayoutEffect } from 'react';
import { useUnit } from 'effector-react';
import { getNetworkState } from '../lib/utils/network/getNetworkState';
import { setNetworkState } from '../model/network';

export const NetworkDetector: FunctionComponent = () => {
    const setNetworkInfo = useUnit(setNetworkState);

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
