import { DeliveryCountdownCard } from '@/entities/delivery/ui';
import { useList } from 'effector-react';
import { $inProgressDeliveries } from '../../model';

export const UpcomingDeliveriesSlider: FunctionComponent = () => {
    const items = useList($inProgressDeliveries, (delivery) => (
        <DeliveryCountdownCard delivery={delivery} />
    ));

    return (
        <div className="flex flex-nowrap justify-start gap-4 py-2">
            <DeliveryCountdownCard />

            {items}
        </div>
    );
};
