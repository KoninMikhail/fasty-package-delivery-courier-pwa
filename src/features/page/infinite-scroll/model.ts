import type { Effect } from 'effector';
import { createEvent, sample } from 'effector';

import { modelFactory } from 'effector-factorio';

type FactoryOptions = {
    requestContentFx: Effect<void, void>;
};

export const factory = modelFactory((options: FactoryOptions) => {
    const contentRequested = createEvent();

    const $loading = options.requestContentFx.pending;

    sample({
        clock: contentRequested,
        target: options.requestContentFx,
    });

    return {
        $loading,
        setContentScrolled: contentRequested,
    };
});
