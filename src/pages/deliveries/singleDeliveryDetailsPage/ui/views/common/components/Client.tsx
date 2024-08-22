import { useUnit } from 'effector-react';
import { getClientName } from '@/entities/client';
import { getDeliveryClient } from '@/entities/delivery';
import { $delivery } from '../../../../model';

export const Client: FunctionComponent = () => {
    const delivery = useUnit($delivery);
    const client = getDeliveryClient(delivery);
    const clientName = (client && getClientName(client)) || '';
    return <p>{clientName}</p>;
};
