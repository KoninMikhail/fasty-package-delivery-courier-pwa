import { NetworkState } from '../../../model/parts/networkState';

/* eslint @typescript-eslint/no-unsafe-assignment: off */
/* eslint @typescript-eslint/no-unsafe-member-access: off */


export const getNetworkState = (): NetworkState => {
    const { onLine, connection } = navigator;

    const state: NetworkState = {
        online: onLine,
    };

    if (connection) {
        return {
            ...state,
            downlink: connection.downlink,
            type: connection.type,
            effectiveType: connection.effectiveType,
        };
    }

    return state;
};
