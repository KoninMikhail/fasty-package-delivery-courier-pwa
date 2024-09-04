import { DetectNetworkConnectionState } from '@/features/device/detectNetworkConnectionState';
import { DetectDeviceType } from '@/features/device/detecDeviceType';

export const AppDeviceStateDetector: FunctionComponent = () => {
    return (
        <>
            <DetectNetworkConnectionState.Watcher />
            <DetectDeviceType.Watcher />
        </>
    );
};
