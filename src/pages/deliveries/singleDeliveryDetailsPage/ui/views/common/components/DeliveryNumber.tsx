import { useUnit } from 'effector-react';
import { getDeliveryNumber } from '@/entities/delivery';
import { $pageDeliveryDetails } from '../../../../model/stores';

export const DeliveryNumber: FunctionComponent = () => {
    const delivery = useUnit($pageDeliveryDetails);
    if (!delivery) return null;
    return getDeliveryNumber(delivery);
};
