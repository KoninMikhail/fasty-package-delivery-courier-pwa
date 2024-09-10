import { useUnit } from 'effector-react';
import { getDeliveryManager } from '@/entities/delivery';
import { UserCardRow } from '@/entities/user';
import { $pageDeliveryDetails } from '../../../../model/stores';

export const DeliveryManager: FunctionComponent = () => {
    const delivery = useUnit($pageDeliveryDetails);
    const manager = getDeliveryManager(delivery);
    if (!manager)
        return (
            <div className="h-12 py-2">
                У доставки нет назначенного менеджера
            </div>
        );
    return <UserCardRow user={manager} />;
};
