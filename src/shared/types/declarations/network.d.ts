declare interface Navigator extends NavigatorNetworkInformation {}
declare interface WorkerNavigator extends NavigatorNetworkInformation {}

declare interface NavigatorNetworkInformation {
    readonly connection?: NetworkInformation;
    readonly mozConnection?: NetworkInformation
    readonly webkitConnection?: NetworkInformation;
    readonly onLine?: Online;
}

type Online = boolean;

type ConnectionType =
    | 'bluetooth'
    | 'cellular'
    | 'ethernet'
    | 'mixed'
    | 'none'
    | 'other'
    | 'unknown'
    | 'wifi'
    | 'wimax';


type EffectiveConnectionType = '2g' | '3g' | '4g' | 'slow-2g';

type Megabit = number;
type Millisecond = number;

interface NetworkInformation extends EventTarget {
    readonly type?: ConnectionType;
    readonly effectiveType?: EffectiveConnectionType;
    readonly downlinkMax?: Megabit;
    readonly downlink?: Megabit;
    readonly rtt?: Millisecond;
    readonly saveData?: boolean;
    onchange?: EventListener;
}