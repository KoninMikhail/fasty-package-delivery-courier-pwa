import { sample } from 'effector';
import { createGate } from 'effector-react';
import { sessionModel } from '@/entities/viewer';

const { resourcesLoaded, $initSessionComplete } = sessionModel;

export const NotFoundGate = createGate<void>();

sample({
    clock: NotFoundGate.open,
    source: $initSessionComplete,
    filter: (isComplete) => !isComplete,
    target: resourcesLoaded,
});
