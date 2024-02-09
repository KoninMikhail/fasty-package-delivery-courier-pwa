import { ReactNode } from 'react';

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
    return <div>{children}</div>;
};

export default HorizontalSliderWithControls;
