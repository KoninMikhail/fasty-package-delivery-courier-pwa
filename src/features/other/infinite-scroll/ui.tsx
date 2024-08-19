import { useInView } from 'react-intersection-observer';
import { useUnit } from 'effector-react';
import { modelView } from 'effector-factorio';
import { Spinner as NextUiSpinner } from '@nextui-org/react';
import { factory } from './model';

interface TriggerProperties {
    allowed?: boolean;
}

export const Trigger = modelView(
    factory,
    ({ allowed = true }: TriggerProperties) => {
        const model = factory.useModel();
        const { pageEnded, lastPageLoaded } = useUnit({
            pageEnded: model.pageEndTriggered,
            lastPageLoaded: model.$lastPageLoaded,
        });

        const { ref: loaderReference } = useInView({
            onChange: (inView) => {
                if (inView) {
                    pageEnded();
                }
            },
            threshold: 1,
        });

        if (!allowed || lastPageLoaded) return null;
        return <div ref={loaderReference} className="relative w-full" />;
    },
);

export const Spinner = modelView(factory, () => {
    const model = factory.useModel();
    const { isLoading } = useUnit({ isLoading: model.$isLoading });

    if (isLoading)
        return (
            <div className="relative flex w-full justify-center">
                <NextUiSpinner />
            </div>
        );

    return null;
});
