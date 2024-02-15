import { DeliveryCardRowShort } from '@/entities/delivery/ui';
import { useList } from 'effector-react';
import { $inProgressDeliveries } from '@/widgets/deliveries/in-progress-deliveries/model/model';

export const MyDeliveriesSlider: FunctionComponent = () => {
    const items = useList($inProgressDeliveries, (delivery) => (
        <DeliveryCardRowShort delivery={delivery} />
    ));

    return (
        <div className="flex flex-nowrap justify-start gap-4 py-2">{items}</div>
    );
};
