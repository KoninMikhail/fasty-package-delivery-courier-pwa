import { DeliveryCountdownCard } from '@/entities/delivery/ui';
import { useList } from 'effector-react';
import { $inProgressDeliveries } from '../../model';

const EmptyState = () => {
    return (
        <div>
            <h1>No deliveries</h1>
        </div>
    );
};

export const UpcomingDeliveriesSlider: FunctionComponent = () => {
    const items = useList($inProgressDeliveries, (delivery) => (
        <DeliveryCountdownCard />
    ));

    return (
        <div className="flex flex-nowrap justify-start gap-4 py-4">
            {items}
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
            <DeliveryCountdownCard />
        </div>
    );
};
