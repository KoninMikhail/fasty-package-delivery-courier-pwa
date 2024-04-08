import { useUnit } from 'effector-react';
import { $$deliveryWeight } from '../../../../model';

export const DeliveryWeight: FunctionComponent = () => {
    const weight = useUnit($$deliveryWeight);
    return <p>{weight}</p>;
};
