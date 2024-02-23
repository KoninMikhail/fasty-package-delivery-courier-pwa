import { DeliveryCountdownCard } from '@/entities/delivery/ui';
import { useList, useUnit } from 'effector-react';
import { sharedUiLayouts } from '@/shared/ui';
import { Button, Skeleton, Spacer } from '@nextui-org/react';
import { GoAlert } from 'react-icons/go';
import { AiOutlineReload } from 'react-icons/ai';
import { BsBoxSeam } from 'react-icons/bs';
import {
    $$empty,
    $$hasError,
    $$loading,
    $inProgressDeliveries,
} from '../../model';

const { HorizontalScroll } = sharedUiLayouts;

const EmptyState: FunctionComponent = () => {
    return (
        <div className="block p-4">
            <div className="flex h-44 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed p-4">
                <BsBoxSeam className="text-4xl text-content3" />
                <Spacer y={3} />
                <div>
                    <span className="text-lg text-content3">
                        No deliveries yet
                    </span>
                </div>
            </div>
        </div>
    );
};

const LoadingState: FunctionComponent = () => {
    return (
        <div className="block py-4">
            <HorizontalScroll>
                <div className="flex flex-nowrap justify-start gap-4 px-4">
                    <Skeleton className="rounded-lg">
                        <DeliveryCountdownCard />
                    </Skeleton>
                    <Skeleton className="rounded-lg">
                        <DeliveryCountdownCard />
                    </Skeleton>
                    <Skeleton className="rounded-lg">
                        <DeliveryCountdownCard />
                    </Skeleton>
                </div>
            </HorizontalScroll>
        </div>
    );
};

const ErrorState: FunctionComponent = () => {
    return (
        <div className="block p-4">
            <div className="flex h-44 w-full flex-col items-center justify-center gap-1 rounded-xl  border-2 border-dashed p-4">
                <GoAlert className="text-6xl text-content3" />
                <div>
                    <span className="text-content3">Чтото пошло не так</span>
                </div>
                <Spacer y={1} />
                <Button size="sm">
                    <AiOutlineReload />
                    Попробовать снова
                </Button>
            </div>
        </div>
    );
};

export const UpcomingDeliveriesSlider: FunctionComponent = () => {
    const isLoading = useUnit($$loading);
    const isEmpty = useUnit($$empty);
    const hasError = useUnit($$hasError);
    const items = useList($inProgressDeliveries, (delivery) => (
        <DeliveryCountdownCard delivery={delivery} />
    ));

    if (hasError) {
        return <ErrorState />;
    }

    if (isLoading && isEmpty) {
        return <LoadingState />;
    }

    if (isEmpty) {
        return <EmptyState />;
    }
    return (
        <HorizontalScroll className="px-4">
            <div className="flex flex-nowrap justify-start gap-4 py-4">
                {items}
            </div>
        </HorizontalScroll>
    );
};
