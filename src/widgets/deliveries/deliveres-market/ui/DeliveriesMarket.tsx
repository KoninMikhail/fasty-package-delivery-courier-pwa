import type { PropsWithChildren } from 'react';
import { entityDeliveryUi } from '@/entities/delivery';

const { DeliveryCardRowShort } = entityDeliveryUi;

const Container: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>
);

export const DeliveriesMarket: FunctionComponent = () => {
    return (
        <Container>
            <DeliveryCardRowShort />
            <DeliveryCardRowShort />
            <DeliveryCardRowShort />
            <DeliveryCardRowShort />
            <DeliveryCardRowShort />
            <DeliveryCardRowShort />
        </Container>
    );
};
