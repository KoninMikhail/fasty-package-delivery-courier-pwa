import {
    CSSProperties,
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { motion, useAnimation } from 'framer-motion';
import useDimensions from 'react-use-dimensions';

import clsx from 'clsx';
import { Context } from './Context';

interface ITrackProperties {
    padding: TailwindSize; // Assuming `TailwindSize` is a type you've defined elsewhere
    gap: number;
    velocity: number;
    transition: {
        stiffness: number;
        damping: number;
        mass: number;
    };
    allowSlideToLast: boolean;
    style: CSSProperties;
    children: ReactNode;
}

// Custom Hook: Use Window Size
function useWindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
}

// Custom Hook: Use Dimensions
function useDimensions() {
    const reference = useRef<HTMLDivElement | null>(null);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
    });

    useEffect(() => {
        if (reference.current) {
            const measure = () => {
                const rect = reference.current!.getBoundingClientRect();
                setDimensions({
                    width: rect.width,
                    height: rect.height,
                    x: rect.x,
                    y: rect.y,
                });
            };

            measure(); // Initial measure

            // Optional: Re-measure on window resize or similar actions
        }
    }, [reference]);

    return [reference, dimensions] as const;
}

export const Track: FunctionComponent<ITrackProperties> = ({
    children,
    padding,
    gap,
    velocity,
    transition,
    allowSlideToLast,
    style,
}) => {
    const [trackReference, trackDimensions] = useDimensions();
    const windowDimensions = useWindowSize();
    const controls = useAnimation();

    const { state, dispatch } = useContext(Context);

    const negativeItems = state.items.map(
        (item) => item * -1 + trackDimensions.x || 0,
    );

    const lastTwo = state.items.slice(-2);
    const lastItem = lastTwo[1] - lastTwo[0];

    function onDragEnd(event, info) {
        const offset = info.offset.x;
        const correctedVelocity = info.velocity.x * velocity;

        const direction = correctedVelocity < 0 || offset < 0 ? 1 : -1;
        const startPosition = info.point.x - offset;

        const endOffset =
            direction === 1
                ? Math.min(correctedVelocity, offset)
                : Math.max(correctedVelocity, offset);
        const endPosition = startPosition + endOffset;

        const closestPosition = negativeItems.reduce((previous, current) =>
            Math.abs(current - endPosition) < Math.abs(previous - endPosition)
                ? current
                : previous,
        );

        const activeSlide = negativeItems.indexOf(closestPosition);
        dispatch({ type: 'SET_ACTIVE_ITEM', activeItem: activeSlide });

        controls.start({
            x: allowSlideToLast
                ? closestPosition
                : Math.max(
                      closestPosition,
                      windowDimensions.innerWidth -
                          trackDimensions.width -
                          // TODO: real track wrapper left/right offsets that should be live!
                          (trackDimensions.x + trackDimensions.x),
                  ),
            transition: {
                type: 'spring',
                velocity: info.velocity.x,
                stiffness: transition.stiffness,
                damping: transition.damping,
                mass: transition.mass,
            },
        });
    }

    return (
        <motion.div
            className={clsx(
                'flex flex-nowrap',
                padding ? `p-${padding}` : 'p-0',
                'min-w-min',
                'cursor-grab',
                'active:cursor-grabbing',
            )}
            ref={trackReference}
            style={style}
            animate={controls}
            drag="x"
            dragConstraints={{
                left: allowSlideToLast
                    ? lastItem + gap - trackDimensions.width
                    : windowDimensions.innerWidth -
                      trackDimensions.width -
                      // TODO: real track wrapper left/right offsets that should be live!
                      (trackDimensions.x + trackDimensions.x),
                right: 0,
            }}
            onDragEnd={onDragEnd}
        >
            {children}
        </motion.div>
    );
};
