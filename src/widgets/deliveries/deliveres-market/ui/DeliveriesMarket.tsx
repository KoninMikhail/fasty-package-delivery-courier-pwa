import type { PropsWithChildren } from 'react';
import { entityDeliveryUi } from '@/entities/delivery';
import { useList } from 'effector-react';
import { $avaliableDeliveries } from '../model';

const { DeliveryCardRowShort } = entityDeliveryUi;

/**
 * Layout
 */
const Root: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>
);
const Filters: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="">{children}</div>
);

const Deliveries: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="flex flex-col gap-4">{children}</div>
);

/**
 * @name DeliveriesMarket
 * @description widget for display available deliveries
 * @constructor
 */
export const DeliveriesMarket: FunctionComponent = () => {
    const onPressCard = (): void => {
        alert('work');
    };

    const deliveries = useList($avaliableDeliveries, () => {
        return <DeliveryCardRowShort onPress={onPressCard} />;
    });

    return (
        <Root>
            <Filters>
                <div>Календарь</div>
                <div>типы доставок</div>
            </Filters>
            <Deliveries>{deliveries}</Deliveries>
        </Root>
    );
};
