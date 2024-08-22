import { useUnit } from 'effector-react';
import { ClientContactCardList } from '@/entities/client';
import { getDeliveryContact } from '@/entities/delivery';
import { $delivery } from '../../../../model';

export const DeliveryContactPerson: FunctionComponent = () => {
    const delivery = useUnit($delivery);
    const contact = getDeliveryContact(delivery);
    return <ClientContactCardList contact={contact} />;
};
