import { useLayoutEffect } from 'react';
import { useUnit } from 'effector-react';
import { setDeviceScreenSize, setDeviceUA } from '../model/parts/deviceInfo';

export const DeviceDetector: FunctionComponent = () => {
    const [setSize, setUA] = useUnit([setDeviceScreenSize, setDeviceUA]);

    useLayoutEffect(() => {
        setUA(navigator.userAgent);
        setSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, [setSize, setUA]);

    return null;
};
