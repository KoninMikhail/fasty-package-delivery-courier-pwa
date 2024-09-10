import { useUnit } from 'effector-react';
import { getDeliveryPickupDateTime } from '@/entities/delivery';
import { $pageDeliveryDetails } from '../../../../model/stores';

export const DeliveryPickup: FunctionComponent = () => {
    const delivery = useUnit($pageDeliveryDetails);
    if (!delivery) return null;
    const pickup = getDeliveryPickupDateTime(delivery, true, true);
    return <p>{pickup}</p>;
};
