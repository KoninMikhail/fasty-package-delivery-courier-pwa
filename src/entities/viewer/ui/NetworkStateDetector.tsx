import { useCallback, useEffect, useLayoutEffect } from 'react';
import { useUnit } from 'effector-react';
import { getNetworkState } from '../lib/utils';
import { setNetworkState } from '../model/parts/networkState';

export const NetworkStateDetector: FunctionComponent = () => {
    const setNetworkInfo = useUnit(setNetworkState);

    const updateNetworkInfo = useCallback(() => {
        setNetworkInfo(getNetworkState());
    }, [setNetworkInfo]);

    useLayoutEffect(() => {
        updateNetworkInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        window.addEventListener('online', updateNetworkInfo);
        window.addEventListener('offline', updateNetworkInfo);
        return () => {
            window.removeEventListener('online', updateNetworkInfo);
            window.removeEventListener('offline', updateNetworkInfo);
        };
    }, [updateNetworkInfo]);
};
