import { useInView } from 'react-intersection-observer';
import { useUnit } from 'effector-react';
import { modelView } from 'effector-factorio';
import { factory } from './model';

export const Trigger = modelView(factory, () => {
    const model = factory.useModel();
    const { pageEnded } = useUnit({
        pageEnded: model.pageEndTriggered,
    });

    const { ref: loaderReference } = useInView({
        onChange: (inView) => {
            if (inView) {
                pageEnded();
            }
        },
        threshold: 1,
    });

    return <div ref={loaderReference} className="relative w-full" />;
});
