import { useUnit } from 'effector-react';
import { lazily } from 'react-lazily';
import { $$deliveryManager } from '../../../../model';

const { UserCardRow } = lazily(() => import('@/entities/user'));

export const DeliveryManager: FunctionComponent = () => {
    const manager = useUnit($$deliveryManager);
    if (!manager)
        return (
            <div className="h-12 py-2">
                У доставки нет назначенного менеджера
            </div>
        );
    return <UserCardRow user={manager} />;
};
