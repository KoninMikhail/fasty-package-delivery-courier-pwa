import { DetectNetworkConnectionState } from '@/features/device/detectNetworkConnectionState';
import { DetectDeviceType } from '@/features/device/detecDeviceType';

export const AppDeviceStateManager: FunctionComponent = () => {
    return (
        <>
            <DetectNetworkConnectionState.Watcher />
            <DetectDeviceType.Watcher />
            <DetectDeviceType.GuardAppVersion />
        </>
    );
};
