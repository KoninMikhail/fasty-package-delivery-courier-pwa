import { entityDeliveryUi } from '@/entities/delivery';
import { useList } from 'effector-react';
import {
    $inProgressDeliveries,
    getInProgressDeliveriesFx,
} from '@/widgets/deliveries/in-progress-deliveries/model/model';
import { useEffect } from 'react';

const { DeliveryCardRowShort } = entityDeliveryUi;

export const InProgressDeliveriesList: FunctionComponent = () => {
    const items = useList($inProgressDeliveries, (delivery) => (
        <DeliveryCardRowShort delivery={delivery} />
    ));

    useEffect(() => {
        const data = async () => getInProgressDeliveriesFx();
        void data();
        console.log(data);
    }, []);

    return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{items}</div>;
};
