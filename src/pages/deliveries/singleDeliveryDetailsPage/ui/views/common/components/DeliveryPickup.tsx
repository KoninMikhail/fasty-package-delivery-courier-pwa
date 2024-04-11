import { useUnit } from 'effector-react';
import { $$deliveryPickupDateTime } from '../../../../model';

export const DeliveryPickup: FunctionComponent = () => {
    const pickup = useUnit($$deliveryPickupDateTime);
    return <p>{pickup}</p>;
};
