import { useUnit } from 'effector-react';
import { IoCar } from 'react-icons/io5';
import { MdOutlineDirectionsRun } from 'react-icons/md';
import {
    getDeliveryType,
    getDeliveryTypeTranslated,
} from '@/entities/delivery';
import { $delivery } from '../../../../model';

export const DeliveryTypeTransport: FunctionComponent = () => {
    const delivery = useUnit($delivery);
    const type = getDeliveryType(delivery);
    const text = getDeliveryTypeTranslated(delivery);

    if (type === 'car')
        return (
            <div className="flex items-center gap-1">
                <span className="text-xl">
                    <IoCar />
                </span>
                {text}
            </div>
        );
    return (
        <div className="flex items-center gap-1">
            <span className="text-xl">
                <MdOutlineDirectionsRun />
            </span>
            {text}
        </div>
    );
};
