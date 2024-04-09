import { useList } from 'effector-react';
import { $deliveriesStore } from '@/widgets/deliveries/myDeliveries/model/deliveriesStore';
import { DeliveryCountdownCard } from '@/entities/delivery';
import { Button } from '@nextui-org/react';
import { useScroll } from 'framer-motion';
import { useRef } from 'react';

export const UpcomingDeliveriesHorizontalSlider: FunctionComponent = () => {
    const reference = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        container: reference,
    });

    const deliveries = useList($deliveriesStore, (delivery) => (
        <DeliveryCountdownCard delivery={delivery} />
    ));

    return (
        <div className="relative overflow-hidden">
            <div className="absolute bottom-0 left-0 top-0 z-50 flex w-36 items-center justify-center bg-gradient-to-l from-transparent from-50% to-background">
                <Button>sdsdfff</Button>
            </div>
            <div className="flex gap-4">d{deliveries}</div>
            <div className="absolute bottom-0 right-0 top-0 flex w-32 items-center justify-center bg-gradient-to-l from-background from-50% to-transparent">
                <Button>sdsd</Button>
            </div>
        </div>
    );
};
