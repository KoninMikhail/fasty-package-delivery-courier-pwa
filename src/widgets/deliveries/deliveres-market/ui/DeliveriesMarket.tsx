import type { PropsWithChildren } from 'react';
import { entityDeliveryUi } from '@/entities/delivery';
import { useGate, useList, useUnit } from 'effector-react';
import { Card, Skeleton } from '@nextui-org/react';
import {
    $avaliableDeliveries,
    $isDeliveriesLoading,
    MarketGate,
} from '../model';

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

    const onPressCard = (): void => {
        alert('work');
    };

    const deliveries = useList($avaliableDeliveries, (delivery) => {
        return (
            <DeliveryCardRowShort onPress={onPressCard} delivery={delivery} />
        );
    });
    useGate(MarketGate);

    if (isPending) {
        return (
            <Card className="w-[200px] space-y-5 p-4" radius="lg">
                <Skeleton isLoaded={false} className="rounded-lg">
                    <div className="h-24 rounded-lg bg-secondary" />
                </Skeleton>
                <div className="space-y-3">
                    <Skeleton isLoaded={false} className="w-3/5 rounded-lg">
                        <div className="h-3 w-full rounded-lg bg-secondary" />
                    </Skeleton>
                    <Skeleton isLoaded={false} className="w-4/5 rounded-lg">
                        <div className="h-3 w-full rounded-lg bg-secondary-300" />
                    </Skeleton>
                    <Skeleton isLoaded={false} className="w-2/5 rounded-lg">
                        <div className="h-3 w-full rounded-lg bg-secondary-200" />
                    </Skeleton>
                </div>
            </Card>
        );
    }
    return <Root>{deliveries}</Root>;
};
