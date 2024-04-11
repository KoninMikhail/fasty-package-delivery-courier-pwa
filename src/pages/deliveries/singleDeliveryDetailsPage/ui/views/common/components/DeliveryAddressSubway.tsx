import { useUnit } from 'effector-react';
import { SubwayStationWithIcon } from '@/shared/services/subway';
import { $$deliveryMetro } from '../../../../model';

export const DeliveryAddressSubway: FunctionComponent = () => {
    const metro = useUnit($$deliveryMetro);
    return <SubwayStationWithIcon value={metro} />;
};
