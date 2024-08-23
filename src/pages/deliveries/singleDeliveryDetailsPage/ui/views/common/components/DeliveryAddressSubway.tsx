import { useUnit } from 'effector-react';
import { SubwayStationWithIcon } from '@/shared/services/subway';
import { getDeliveryMetro } from '@/entities/delivery';
import { $pageDeliveryDetails } from '../../../../model/stores';

export const DeliveryAddressSubway: FunctionComponent = () => {
    const delivery = useUnit($pageDeliveryDetails);
    const metro = getDeliveryMetro(delivery);
    return <SubwayStationWithIcon value={metro} />;
};
