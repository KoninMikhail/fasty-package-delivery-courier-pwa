import { useUnit } from 'effector-react';
import { ClientContactCardList } from '@/entities/client';
import { getDeliveryContact } from '@/entities/delivery';
import { $pageDeliveryDetails } from '../../../../model/stores';

export const DeliveryContactPerson: FunctionComponent = () => {
    const delivery = useUnit($pageDeliveryDetails);
    const contact = getDeliveryContact(delivery);
    return <ClientContactCardList contact={contact} />;
};
