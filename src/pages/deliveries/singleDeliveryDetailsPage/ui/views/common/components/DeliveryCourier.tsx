import { useUnit } from 'effector-react';
import { getDeliveryCourier } from '@/entities/delivery';
import { UserCardRow } from '@/entities/user';
import { $delivery } from '../../../../model';

export const DeliveryCourier: FunctionComponent = () => {
    const delivery = useUnit($delivery);
    const courier = getDeliveryCourier(delivery);

    if (!courier)
        return (
            <div className="h-12 py-2">У доставки нет назначенного курьера</div>
        );

    return <UserCardRow user={courier} />;
};
