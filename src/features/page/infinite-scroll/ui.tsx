import { useInView } from 'react-intersection-observer';
import { useUnit } from 'effector-react';
import { modelView } from 'effector-factorio';
import { Spinner } from '@nextui-org/react';
import { PropsWithChildren } from 'react';
import { factory } from './model';

interface WrapperProperties extends PropsWithChildren {
    containerClassName?: HTMLDivElement['className'];
}

export const Wrapper = modelView(
    factory,
    ({ children, ...rest }: WrapperProperties) => {
        const model = factory.useModel();
        const isLoading = useUnit(model.$loading);
        const isContentScrolled = useUnit(model.setContentScrolled);

        const { ref: loaderReference } = useInView({
            onChange: (inView) => inView && isContentScrolled(),
            threshold: 0,
        });

        return (
            <div className="relative">
                {children}
                <div ref={loaderReference} className="relative w-full">
                    <div className="flex w-full justify-center">
                        {isLoading ? <Spinner size="lg" /> : null}
                    </div>
                </div>
            </div>
        );
    },
);
