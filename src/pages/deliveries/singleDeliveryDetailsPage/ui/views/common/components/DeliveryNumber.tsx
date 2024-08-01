import { useUnit } from 'effector-react';
import { $$deliveryNumber } from '../../../../model';

export const DeliveryNumber: FunctionComponent = () => {
    const id = useUnit($$deliveryNumber);
    return id;
};
