import { useInView } from 'react-intersection-observer';
import { useUnit } from 'effector-react';
import { modelView } from 'effector-factorio';
import { Spinner, SpinnerProps } from '@nextui-org/react';
import { PropsWithChildren } from 'react';
import { useUnmount } from 'usehooks-ts';
import { factory } from './model';

interface WrapperProperties extends PropsWithChildren {
    containerClassName?: HTMLDivElement['className'];
    spinnerSize?: SpinnerProps['size'];
}

export const Wrapper = modelView(
    factory,
    ({ children, spinnerSize = 'sm' }: WrapperProperties) => {
        const model = factory.useModel();
        const isLoading = useUnit(model.$loading);
        const { pageActual, pageEnded } = useUnit({
            pageEnded: model.pageEnded,
            pageActual: model.pageActual,
        });

        const { ref: loaderReference } = useInView({
            onChange: (inView) => {
                if (inView) {
                    pageEnded();
                } else {
                    pageActual();
                }
            },
            threshold: 1,
        });

        useUnmount(() => pageActual());

        return (
            <div className="relative">
                {children}
                <div ref={loaderReference} className="relative w-full">
                    <div className="flex min-h-12 w-full justify-center">
                        {isLoading ? <Spinner size={spinnerSize} /> : null}
                    </div>
                </div>
            </div>
        );
    },
);
