import { useList, useUnit } from 'effector-react';
import { $deliveriesStore } from '@/widgets/deliveries/myDeliveries/model/deliveriesStore';
import { DeliveryCountdownCard } from '@/entities/delivery';
import {
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { useRef, useState, FunctionComponent, MouseEventHandler } from 'react';
import { motion, PanInfo, useMotionValue, useSpring } from 'framer-motion';
import { settingsModel } from '@/entities/viewer';

const DRAG_THRESHOLD = 150;
const FALLBACK_WIDTH = 508;

export const UpcomingDeliveriesHorizontalSlider: FunctionComponent = () => {
    const allowedCount = useUnit(settingsModel.$homeUpcomingDeliveriesCount);
    const containerReference = useRef<HTMLDivElement>(null);
    const itemsReference = useRef<(HTMLDivElement | null)[]>([]);

    const [activeSlide, setActiveSlide] = useState(0);
    const offsetX = useMotionValue(0);
    const animatedX = useSpring(offsetX, {
        damping: 20,
        stiffness: 150,
    });

    const [isDragging, setIsDragging] = useState(false);

    const updateSlide = (direction: 'prev' | 'next') => {
        const currentOffsetX = offsetX.get();
        const itemWidth =
            itemsReference.current[activeSlide]?.offsetWidth || FALLBACK_WIDTH;
        if (direction === 'next') {
            if (activeSlide - 1 < allowedCount) {
                offsetX.set(currentOffsetX - itemWidth);
                setActiveSlide(activeSlide + 1);
            }
        } else if (activeSlide > 0) {
            offsetX.set(currentOffsetX + itemWidth);
            setActiveSlide(activeSlide - 1);
        }
    };

    const handlePan = (_: MouseEvent, panInfo: PanInfo) => {
        const { offset } = panInfo;
        if (Math.abs(offset.x) > DRAG_THRESHOLD) {
            updateSlide(offset.x > 0 ? 'prev' : 'next');
        }
    };

    const deliveries = useList($deliveriesStore, (delivery, index) => {
        if (allowedCount >= index - 1) return null;

        const onDivClick: MouseEventHandler<HTMLDivElement> = (event): void => {
            if (isDragging) event.stopPropagation();
        };

        return (
            <motion.div
                layout
                ref={(element) => {
                    itemsReference.current[index] = element;
                }}
                className="relative grid shrink-0 select-none gap-4 transition-opacity duration-300"
                onClick={onDivClick}
            >
                <DeliveryCountdownCard delivery={delivery} />
            </motion.div>
        );
    });

    return (
        <div className="group container overflow-hidden">
            <div className="relative overflow-hidden">
                <motion.div
                    ref={containerReference}
                    className="flex cursor-none items-start gap-4"
                    style={{ x: animatedX }}
                    drag="x"
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                    onPan={handlePan}
                >
                    {deliveries}
                </motion.div>

                {activeSlide > 0 && (
                    <div className="absolute bottom-0 left-0 top-0 flex w-24 items-center justify-start bg-gradient-to-l from-transparent from-50% to-background text-2xl">
                        <button
                            type="button"
                            className="h-full pr-8"
                            onClick={() => updateSlide('prev')}
                            disabled={activeSlide === 0}
                        >
                            <MdOutlineKeyboardArrowLeft className="text-4xl" />
                        </button>
                    </div>
                )}

                {activeSlide <= allowedCount && (
                    <div className="absolute bottom-0 right-0 top-0 flex w-24 items-center justify-end bg-gradient-to-l from-background from-50% to-transparent text-2xl">
                        <button
                            type="button"
                            className="z-50 h-full pl-8"
                            onClick={() => updateSlide('next')}
                            disabled={activeSlide === allowedCount - 1}
                        >
                            <MdOutlineKeyboardArrowRight className="text-4xl" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
