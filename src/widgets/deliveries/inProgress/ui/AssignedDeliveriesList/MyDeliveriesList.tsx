import { DeliveryShortInfoCard } from '@/entities/delivery';
import { useList, useUnit } from 'effector-react';
import { Chip } from '@nextui-org/react';
import { HorizontalScroll } from '@/shared/ui/layouts';
import { useEffect, useMemo } from 'react';
import { getTimeIntervalsInRange } from '@/widgets/deliveries/inProgress/lib/getTimeIntervalsInRange.test';
import {
    $$empty,
    $$hasError,
    $$loading,
    $inProgressDeliveries,
    $init,
    initWidgetMyDeliveries,
} from '../../model';

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

export const MyDeliveriesList: FunctionComponent = () => {
    const [init, isInit, isLoading, hasError, isEmpty] = useUnit([
        initWidgetMyDeliveries,
        $init,
        $$loading,
        $$hasError,
        $$empty,
    ]);

    useEffect(() => {
        init();
    }, []);

    const items = useList($inProgressDeliveries, (delivery) => (
        <DeliveryShortInfoCard delivery={delivery} />
    ));

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (isInit && isEmpty) {
        return (
            <div>
                <Filter />
                <div>Нет активных доставок</div>
            </div>
        );
    }

    if (isInit && hasError) {
        return <div>Ошибка</div>;
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Filter />
            <div>{items}</div>
        </div>
    );
};
