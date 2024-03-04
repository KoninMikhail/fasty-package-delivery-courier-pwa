import { DeliveryShortInfoCard, getMyDeliveriesFx } from '@/entities/delivery';
import { useList, useUnit } from 'effector-react';
import { Chip, Spinner } from '@nextui-org/react';
import { HorizontalScroll } from '@/shared/ui/layouts';
import { useEffect, useMemo } from 'react';
import { getTimeIntervalsInRange } from '@/widgets/deliveries/inProgress/lib/getTimeIntervalsInRange.test';
import {
    $$empty,
    $$hasError,
    $$loading,
    $myDeliveries,
    $init,
} from '../../model';

/**
 * Сomponents
 */
const Filter: FunctionComponent = () => {
    const times = useMemo(() => {
        return getTimeIntervalsInRange('8:00', '20:00', 90);
    }, []);
    return (
        <div className="relative grid grid-cols-1 gap-1">
            <HorizontalScroll>
                <div className="flex gap-1">
                    {times.map((time) => (
                        <Chip key={time} color="default" size="lg">
                            {time}
                        </Chip>
                    ))}
                </div>
            </HorizontalScroll>
        </div>
    );
};

const Loader: FunctionComponent = () => {
    return (
        <div className="flex w-full justify-center gap-4">
            <Spinner size="sm" color="primary" />
            <span>Обновляем данные</span>
        </div>
    );
};

const Error: FunctionComponent = () => {
    return <div>Ошибка</div>;
};

export const MyDeliveriesList: FunctionComponent = () => {
    const [isInit, isLoading, hasError, isEmpty] = useUnit([
        $init,
        $$loading,
        $$hasError,
        $$empty,
    ]);

    useEffect(() => {
        void getMyDeliveriesFx();
    }, []);

    const items = useList($myDeliveries, (delivery) => (
        <DeliveryShortInfoCard delivery={delivery} />
    ));

    if (isInit && isEmpty) {
        return (
            <div>
                <Filter />
                <div>Нет активных доставок</div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Filter />
            {isLoading ? <Loader /> : null}
            {isInit && hasError ? <Error /> : null}
            <div className="flex flex-col gap-4">{items}</div>
        </div>
    );
};
