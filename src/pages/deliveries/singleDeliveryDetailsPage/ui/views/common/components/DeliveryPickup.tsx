import { useUnit } from 'effector-react';
import { getDeliveryPickupDateTime } from '@/entities/delivery';
import { $delivery } from '../../../../model';

export const DeliveryPickup: FunctionComponent = () => {
    const delivery = useUnit($delivery);
    const pickup = getDeliveryPickupDateTime(delivery, true, true);
    return <p>{pickup}</p>;
};
