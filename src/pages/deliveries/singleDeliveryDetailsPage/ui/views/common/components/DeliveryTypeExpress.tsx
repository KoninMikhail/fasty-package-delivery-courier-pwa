import { useUnit } from 'effector-react';
import { HiLightningBolt } from 'react-icons/hi';
import {
    $$deliveryIsExpress,
    $$deliveryIsExpressTranslated,
} from '../../../../model';

export const DeliveryTypeExpress: FunctionComponent = () => {
    const express = useUnit($$deliveryIsExpressTranslated);
    const isExpress = useUnit($$deliveryIsExpress);

    return (
        <div className="flex items-center gap-1">
            {isExpress ? (
                <span className="text-xl text-secondary">
                    <HiLightningBolt />
                </span>
            ) : null}
            {express}
        </div>
    );
};
