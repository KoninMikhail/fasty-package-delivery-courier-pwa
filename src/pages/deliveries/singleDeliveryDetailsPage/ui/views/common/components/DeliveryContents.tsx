import { useUnit } from 'effector-react';
import { getDeliveryContents } from '@/entities/delivery';
import { $delivery } from '../../../../model';

export const DeliveryContents: FunctionComponent = () => {
    const delivery = useUnit($delivery);
    const contents = getDeliveryContents(delivery);
    return <p>{contents}</p>;
};
