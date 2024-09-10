import { DeliveryCountdownCard } from '@/entities/delivery';

import { FunctionComponent, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { Button } from '@nextui-org/react';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import { useList, useUnit } from 'effector-react';
import { NoDeliveries } from '@/widgets/deliveries/myDeliveries/ui/common/NoDeliveries';
import {
    $$empty,
    $$inPending,
    $isInitialized,
} from '@/widgets/deliveries/myDeliveries/model/model';
import { Loading } from '@/widgets/deliveries/myDeliveries/ui/common/Loading';
import { $$upcomingPickups } from '../../model/stores';

export const UpcomingDeliveriesHorizontalSlider: FunctionComponent = () => {
    const { isInit, isEmpty, isUpdating } = useUnit({
        isInit: $isInitialized,
        isEmpty: $$empty,
        isUpdating: $$inPending,
    });

    const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
    const itemWidth = 230;
    const rootReference = useRef<HTMLDivElement>(null);
    const stopTriggerReference = useRef<HTMLDivElement>(null);
    const stopTriggerOnScreen = useInView(stopTriggerReference);

    const scrollX = useMotionValue(0);
    const animatedScrollX = useSpring(scrollX, {
        stiffness: 300,
        damping: 30,
    });

    const onPressBack = (): void => {
        if (activeItemIndex === 0) {
            return;
        }
        scrollX.set(scrollX.get() + itemWidth);
        setActiveItemIndex(activeItemIndex - 1);
    };
    const onPressNext = (): void => {
        scrollX.set(scrollX.get() - itemWidth);
        setActiveItemIndex(activeItemIndex + 1);
    };

    const deliveries = useList($$upcomingPickups, (delivery) => {
        return <DeliveryCountdownCard delivery={delivery} />;
    });

    if (!isInit) return <Loading skeletonCount={4} />;

    if (isEmpty) {
        if (isUpdating) return <Loading skeletonCount={4} />;
        return <NoDeliveries bordered />;
    }

    return (
        <div className="relative w-full">
            <motion.div
                ref={rootReference}
                className="flex gap-[20px]"
                style={{
                    x: animatedScrollX,
                }}
            >
                {deliveries}
                <div ref={stopTriggerReference} />
            </motion.div>
            <div className="absolute -right-2 -top-16 flex gap-2">
                <Button
                    isDisabled={activeItemIndex === 0}
                    isIconOnly
                    variant="flat"
                    className="rounded-full"
                    onPress={onPressBack}
                >
                    <MdArrowLeft />
                </Button>
                <Button
                    isDisabled={stopTriggerOnScreen}
                    isIconOnly
                    variant="flat"
                    className="rounded-full"
                    onPress={onPressNext}
                >
                    <MdArrowRight />
                </Button>
            </div>
        </div>
    );
};
