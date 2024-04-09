import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useTransform } from 'framer-motion';
import useDimensions from 'react-use-dimensions';

import { Context } from './Context';

const ItemWrapper = styled(motion.div)`
    flex: 0 0 auto;

    &:not(:last-child) {
        margin-right: ${(properties) => properties.gap}px;
    }
`;

const MotionWrapper = styled(motion.div)``;

const Item = ({ children, gap, padding, index, offset }) => {
    const { dispatch } = useContext(Context);
    const [itemReference, { x }] = useDimensions({ liveMeasure: false });

    const opacity = useTransform(
        offset,
        [(index - 1) * -300, index * -300, (index + 1) * -300],
        [0.2, 1, 0.2],
    );

    const scale = useTransform(
        offset,
        [(index - 1) * -300, index * -300, (index + 1) * -300],
        [0.8, 1, 0.8],
    );

    useEffect(() => {
        if (x !== undefined) {
            dispatch({ type: 'ADD_ITEM', item: x - padding });
        }
    }, [x, dispatch, padding]);

    return (
        <ItemWrapper ref={itemReference} gap={gap} style={{ opacity, scale }}>
            <MotionWrapper>{children}</MotionWrapper>
        </ItemWrapper>
    );
};

export default Item;
