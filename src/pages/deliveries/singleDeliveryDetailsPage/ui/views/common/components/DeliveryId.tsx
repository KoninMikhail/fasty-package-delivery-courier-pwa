import { useUnit } from 'effector-react';
import { $$deliveryId } from '../../../../model';

export const DeliveryId: FunctionComponent = () => {
    const id = useUnit($$deliveryId);
    return id;
};
