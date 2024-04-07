import { useInView } from 'react-intersection-observer';
import { useUnit } from 'effector-react';
import { modelView } from 'effector-factorio';
import { Spinner } from '@nextui-org/react';
import { PropsWithChildren } from 'react';
import { useUnmount } from 'usehooks-ts';
import { factory } from './model';

interface WrapperProperties extends PropsWithChildren {
    containerClassName?: HTMLDivElement['className'];
}

export const Wrapper = modelView(
    factory,
    ({ children, ...rest }: WrapperProperties) => {
        const model = factory.useModel();
        const isLoading = useUnit(model.$loading);
        const [start, stop] = useUnit([
            model.startContentRequests,
            model.stopContentRequests,
        ]);

        const { ref: loaderReference } = useInView({
            onChange: (inView) => {
                if (inView) {
                    start();
                } else {
                    stop();
                }
            },
            threshold: 1,
        });

        useUnmount(() => stop());

        return (
            <div className="relative">
                {children}
                <div ref={loaderReference} className="relative w-full">
                    <div className="flex min-h-12 w-full justify-center">
                        {isLoading ? <Spinner size="sm" /> : null}
                    </div>
                </div>
            </div>
        );
    },
);
