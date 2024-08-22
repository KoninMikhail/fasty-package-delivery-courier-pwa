import { useUnit } from 'effector-react';
import { SubwayStationWithIcon } from '@/shared/services/subway';
import { getDeliveryMetro } from '@/entities/delivery';
import { $delivery } from '../../../../model';

export const DeliveryAddressSubway: FunctionComponent = () => {
    const delivery = useUnit($delivery);
    const metro = getDeliveryMetro(delivery);
    return <SubwayStationWithIcon value={metro} />;
};
