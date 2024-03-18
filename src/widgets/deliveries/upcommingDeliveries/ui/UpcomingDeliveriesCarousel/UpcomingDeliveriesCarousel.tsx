import { useList, useUnit } from 'effector-react';
import {
    $$empty,
    $$hasError,
    $$upcomingDeliveriesLimited,
    $isFirstLoad,
    $loading,
} from '@/widgets/deliveries/upcommingDeliveries/model';
import { DeliveryCountdownCard } from '@/entities/delivery';

export const UpcomingDeliveriesCarousel: FunctionComponent = () => {
    const [isUpdating, isFirstLoad] = useUnit([$loading, $isFirstLoad]);
    const isEmpty = useUnit($$empty);
    const hasError = useUnit($$hasError);

    const items = useList($$upcomingDeliveriesLimited, (delivery) => (
        <DeliveryCountdownCard delivery={delivery} />
    ));
    return <div className="flex gap-4">{items}</div>;
};
