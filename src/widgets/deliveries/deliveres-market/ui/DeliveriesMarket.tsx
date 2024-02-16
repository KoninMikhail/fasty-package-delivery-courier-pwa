import type { PropsWithChildren } from 'react';
import { entityDeliveryUi } from '@/entities/delivery';
import { useGate, useList, useUnit } from 'effector-react';
import { Link } from 'react-router-dom';
import { sharedConfigRoutes } from '@/shared/config';
import { Offline } from '@/entities/viewer/ui';
import {
    $avaliableDeliveries,
    $isDeliveriesLoading,
    MarketGate,
} from '../model';

const { RouteName } = sharedConfigRoutes;
const { DELIVERIES } = RouteName;

const { DeliveryCardRowShort } = entityDeliveryUi;

/**
 * Layout
 */
const Root: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>
);

/**
 * @name DeliveriesMarket
 * @description widget for display available deliveries
 * @constructor
 */
export const DeliveriesMarket: FunctionComponent<PropsWithChildren> = () => {
    const isPending = useUnit($isDeliveriesLoading);

    const onPressCard = () => {
        alert('work');
    };

    const deliveries = useList($avaliableDeliveries, (delivery) => {
        return (
            <Link to={DELIVERIES} key={delivery.id}>
                <DeliveryCardRowShort
                    onPress={onPressCard}
                    delivery={delivery}
                />
            </Link>
        );
    });

    useGate(MarketGate);

    if (isPending) {
        return <Offline>you are offline</Offline>;
    }
    return <Root>{deliveries}</Root>;
};
