import { createGate } from 'effector-react';
import { sample } from 'effector';
import { viewerProfileModel } from '@/entities/viewer';
import { debug } from 'patronum';
import { getViewerProfileDataFx } from '@/entities/viewer/model/profileModel';

export const WelcomeTopbarGate = createGate();

sample({
    clock: WelcomeTopbarGate.open,
    target: viewerProfileModel.getViewerProfileDataFx,
});

debug(getViewerProfileDataFx.fail);
