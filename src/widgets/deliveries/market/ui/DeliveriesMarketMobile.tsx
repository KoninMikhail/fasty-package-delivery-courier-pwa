import type { PropsWithChildren } from 'react';
import { deliveryUi } from '@/entities/delivery';
import { useGate, useList, useUnit } from 'effector-react';
import { sharedConfigRoutes } from '@/shared/config';
import { Offline } from '@/entities/viewer/ui';
import { useNetworkInfo } from '@/shared/config/network';
import {
    $avaliableDeliveries,
    $isDeliveriesLoading,
    MarketGate,
} from '../model';

const { RouteName } = sharedConfigRoutes;
const { DELIVERIES } = RouteName;

const { DeliveryShortInfoCard } = deliveryUi;

/* eslint-disable unicorn/consistent-function-scoping */

/**
 * Layout
 */
const Root: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>
);

/**
 * @name DeliveriesMarketMobile
 * @description widget for display available deliveries
 * @constructor
 */
export const DeliveriesMarketMobile: FunctionComponent = () => {
    const { online, effectiveType } = useNetworkInfo();
    const isPending = useUnit($isDeliveriesLoading);
    const content = useList($avaliableDeliveries, (delivery) => {
        return <DeliveryShortInfoCard delivery={delivery} />;
    });

    useGate(MarketGate, { online, effectiveType });

    if (isPending) {
        return <Offline>you are offline</Offline>;
    }
    return <Root>{content}</Root>;
};
