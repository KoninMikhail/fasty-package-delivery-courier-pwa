import { entityDeliveryUi } from '@/entities/delivery';
import { useList, useUnit } from 'effector-react';
import { Chip } from '@nextui-org/react';
import { HorizontalScroll } from '@/shared/ui/layouts';
import {
    $$empty,
    $$hasError,
    $$loading,
    $inProgressDeliveries,
    $init,
} from '../../model';

const { DeliveryCardRowShort } = entityDeliveryUi;

const Filter: FunctionComponent = () => (
    <div className="relative grid grid-cols-1 gap-1">
        <HorizontalScroll>
            <div className="flex gap-1">
                <Chip color="default" size="lg">
                    Default
                </Chip>
                <Chip color="default" size="lg">
                    Default
                </Chip>
                <Chip color="default" size="lg">
                    Default
                </Chip>
                <Chip color="default" size="lg">
                    Default
                </Chip>
                <Chip color="default" size="lg">
                    Default
                </Chip>
                <Chip color="default" size="lg">
                    Default
                </Chip>
                <Chip color="default" size="lg">
                    Default
                </Chip>
                <Chip color="default" size="lg">
                    Default
                </Chip>
            </div>
        </HorizontalScroll>
    </div>
);

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
