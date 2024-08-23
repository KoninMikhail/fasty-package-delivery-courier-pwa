import { useUnit } from 'effector-react';
import { getDeliveryWeightPersisted } from '@/entities/delivery';
import { $pageDeliveryDetails } from '../../../../model/stores';

export const DeliveryWeight: FunctionComponent = () => {
    const delivery = useUnit($pageDeliveryDetails);
    const weight = delivery ? getDeliveryWeightPersisted(delivery) : '';
    return <p>{weight}</p>;
};
