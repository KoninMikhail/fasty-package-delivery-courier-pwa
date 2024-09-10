import { useUnit } from 'effector-react';
import { HiLightningBolt } from 'react-icons/hi';
import {
    getDeliveryExpressState,
    getDeliveryExpressStateTranslated,
} from '@/entities/delivery';
import { $pageDeliveryDetails } from '../../../../model/stores';

export const DeliveryTypeExpress: FunctionComponent = () => {
    const delivery = useUnit($pageDeliveryDetails);
    const isExpress = getDeliveryExpressState(delivery);
    const label = getDeliveryExpressStateTranslated(delivery);

    if (isExpress)
        return (
            <div className="flex items-center gap-1">
                <span className="text-xl text-secondary">
                    <HiLightningBolt />
                </span>
                {label}
            </div>
        );

    return <div className="flex items-center gap-1">{label}</div>;
};
