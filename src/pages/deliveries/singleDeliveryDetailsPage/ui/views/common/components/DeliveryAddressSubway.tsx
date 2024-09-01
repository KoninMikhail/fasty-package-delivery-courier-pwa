import { useUnit } from 'effector-react';
import { SubwayStationWithIcon } from '@/entities/route';
import { getDeliveryMetro } from '@/entities/delivery';
import { $pageDeliveryDetails } from '../../../../model/stores';

export const DeliveryAddressSubway: FunctionComponent = () => {
    const delivery = useUnit($pageDeliveryDetails);
    const metro = getDeliveryMetro(delivery);
    return <SubwayStationWithIcon value={metro} />;
};
