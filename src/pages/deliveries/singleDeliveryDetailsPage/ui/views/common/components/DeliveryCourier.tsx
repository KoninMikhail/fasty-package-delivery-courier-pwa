import { useUnit } from 'effector-react';
import { lazily } from 'react-lazily';
import { $$deliveryCourier } from '../../../../model';

const { UserCardRow } = lazily(() => import('@/entities/user'));

export const DeliveryCourier: FunctionComponent = () => {
    const courier = useUnit($$deliveryCourier);

    if (!courier)
        return (
            <div className="h-12 py-2">У доставки нет назначенного курьера</div>
        );

    return <UserCardRow user={courier} />;
};
