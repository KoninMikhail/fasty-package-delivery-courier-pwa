import { useUnit } from 'effector-react';
import { useLayoutEffect } from 'react';
import { setDeviceScreenSize, setDeviceUA } from '../model';

export const Watcher: FunctionComponent = () => {
    const { setSize, setUA } = useUnit({
        setSize: setDeviceScreenSize,
        setUA: setDeviceUA,
    });

    useLayoutEffect(() => {
        setUA(navigator.userAgent);
        setSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, [setSize, setUA]);

    return null;
};
