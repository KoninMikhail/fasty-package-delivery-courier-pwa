import { ReactElement, ReactNode } from 'react';

interface INativeScrollProperties {
    children: ReactNode | ReactNode[];
    direction?: 'horizontal' | 'vertical';
}

export const NativeScroll: FunctionComponent<INativeScrollProperties> = ({
    children,
    direction = 'horizontal',
}): ReactElement => {
    if (direction === 'horizontal') {
        return (
            <div className="block overflow-hidden">
                <div
                    className="-mb-24 transform overflow-x-auto pb-24"
                    style={{ transform: 'translateZ(0px)' }}
                >
                    {children}
                </div>
            </div>
        );
    }

    return (
        <div className="block overflow-hidden">
            <div className="translate-z-0 -mr-24 transform overflow-y-scroll pr-24">
                <div>{children}</div>
            </div>
        </div>
    );
};
