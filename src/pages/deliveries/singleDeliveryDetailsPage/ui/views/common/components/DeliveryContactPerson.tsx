import { useUnit } from 'effector-react';
import { ClientContactCardList } from '@/entities/client';
import { $$deliveryContact } from '../../../../model';

export const DeliveryContactPerson: FunctionComponent = () => {
    const contact = useUnit($$deliveryContact);
    return <ClientContactCardList contact={contact} />;
};
