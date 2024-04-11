import { useUnit } from 'effector-react';
import { IoCar } from 'react-icons/io5';
import { MdOutlineDirectionsRun } from 'react-icons/md';
import { $$deliveryType, $$deliveryTypeTranslated } from '../../../../model';

export const DeliveryTypeTransport: FunctionComponent = () => {
    const type = useUnit($$deliveryType);
    const text = useUnit($$deliveryTypeTranslated);

    if (type === 'car') {
        return (
            <div className="flex items-center gap-1">
                <span className="text-xl">
                    <IoCar />
                </span>
                {text}
            </div>
        );
    }
    return (
        <div className="flex items-center gap-1">
            <span className="text-xl">
                <MdOutlineDirectionsRun />
            </span>
            {text}
        </div>
    );
};
