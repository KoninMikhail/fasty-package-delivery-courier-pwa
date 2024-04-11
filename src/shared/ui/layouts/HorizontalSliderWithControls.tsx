import {
    ReactNode,
    useCallback,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface IHorizontalSliderWithControlsProperties {
    children: ReactNode | ReactNode[];
}

/**
 * @name HorizontalSliderWithControls
 * @param children
 * @constructor
 */
export const HorizontalSliderWithControls: FunctionComponent<
    IHorizontalSliderWithControlsProperties
> = ({ children }) => {
    const scrollReference = useRef(null);
    const ghostReference = useRef(null);
    const [scrollRange, setScrollRange] = useState(0);
    const [viewportW, setViewportW] = useState(0);

    useLayoutEffect(() => {
        scrollReference && setScrollRange(scrollReference.current.scrollWidth);
    }, [scrollReference]);

    const onResize = useCallback((entries) => {
        for (const entry of entries) {
            setViewportW(entry.contentRect.width);
        }
    }, []);

    useLayoutEffect(() => {
        const resizeObserver = new ResizeObserver((entries) =>
            onResize(entries),
        );
        resizeObserver.observe(ghostReference.current);
        return () => resizeObserver.disconnect();
    }, [onResize]);

    const { scrollYProgress } = useScroll();
    const transform = useTransform(
        scrollYProgress,
        [0, 1],
        [0, -scrollRange + viewportW],
    );
    const physics = { damping: 15, mass: 0.27, stiffness: 55 };
    const spring = useSpring(transform, physics);

    return (
        <>
            <div className="scroll-container overflow-hidden">
                <motion.section
                    ref={scrollReference}
                    style={{ x: spring }}
                    className="thumbnails-container"
                >
                    {children}
                </motion.section>
            </div>
            <div
                ref={ghostReference}
                style={{ height: scrollRange }}
                className="ghost"
            />
        </>
    );
};

export default HorizontalSliderWithControls;
