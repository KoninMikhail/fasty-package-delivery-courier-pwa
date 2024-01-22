import type { PropsWithChildren } from 'react';
import { entityDeliveryUi } from '@/entities/delivery';

const { DeliveryCardRowShort } = entityDeliveryUi;

const Root: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</div>
);

const Filters: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="">{children}</div>
);
const Deliveries: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="flex flex-col gap-4">{children}</div>
);

export const DeliveriesMarket: FunctionComponent = () => {
    const deliveries = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <Root>
            <Filters>филтра</Filters>
            <Deliveries>
                {deliveries.map((delivery) => {
                    return <DeliveryCardRowShort />;
                })}
            </Deliveries>
        </Root>
    );
};
