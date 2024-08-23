import { useUnit } from 'effector-react';
import { getClientName } from '@/entities/client';
import { getDeliveryClient } from '@/entities/delivery';
import { $pageDeliveryDetails } from '../../../../model/stores';

export const Client: FunctionComponent = () => {
    const delivery = useUnit($pageDeliveryDetails);
    const client = getDeliveryClient(delivery);
    const clientName = (client && getClientName(client)) || '';
    return <p>{clientName}</p>;
};
