import { entityDeliveryUi } from '@/entities/delivery';
import { useList, useUnit } from 'effector-react';
import {
    $$empty,
    $$hasError,
    $$loading,
    $inProgressDeliveries,
    $init,
} from '../../model';

const { DeliveryCardRowShort } = entityDeliveryUi;

export const MyDeliveriesList: FunctionComponent = () => {
    const [isInit, isLoading, hasError, isEmpty] = useUnit([
        $init,
        $$loading,
        $$hasError,
        $$empty,
    ]);

    const items = useList($inProgressDeliveries, (delivery) => (
        <DeliveryCardRowShort delivery={delivery} />
    ));

    if (isLoading) {
        return (
            <>
                <DeliveryCardRowShort />
                <DeliveryCardRowShort />
                <DeliveryCardRowShort />
            </>
        );
    }

    if (isInit && isEmpty) {
        return <div>Нет активных доставок</div>;
    }

    if (isInit && hasError) {
        return <div>Ошибка</div>;
    }

    return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{items}</div>;
};
