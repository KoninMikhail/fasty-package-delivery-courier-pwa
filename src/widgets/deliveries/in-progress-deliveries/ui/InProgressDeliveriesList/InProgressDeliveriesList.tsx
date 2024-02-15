import { entityDeliveryUi } from '@/entities/delivery';
import { useList } from 'effector-react';
import { $inProgressDeliveries } from '@/widgets/deliveries/in-progress-deliveries/model/model';

const { DeliveryCardRowShort } = entityDeliveryUi;

export const InProgressDeliveriesList: FunctionComponent = () => {
    const items = useList($inProgressDeliveries, (delivery) => (
        <DeliveryCardRowShort delivery={delivery} />
    ));

    return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{items}</div>;
};
