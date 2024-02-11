import { sample } from 'effector';
import { viewerProfileModel } from '@/entities/viewer';
import { createGate } from 'effector-react';

export const WelcomeTopbarGate = createGate();

sample({
    clock: WelcomeTopbarGate.open,
    target: viewerProfileModel.getViewerProfileDataFx,
});
