import { useUnit } from 'effector-react';
import { getDeliveryContents } from '@/entities/delivery';
import { $pageDeliveryDetails } from '../../../../model/stores';

export const DeliveryContents: FunctionComponent = () => {
    const delivery = useUnit($pageDeliveryDetails);
    const contents = getDeliveryContents(delivery);
    return <p>{contents}</p>;
};
