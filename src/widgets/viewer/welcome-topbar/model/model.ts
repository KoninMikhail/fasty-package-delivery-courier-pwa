import { createGate } from 'effector-react';
import { debug } from 'patronum';
import { getViewerProfileDataFx } from '@/entities/viewer/model/profileModel';

export const WelcomeTopbarGate = createGate();

debug(getViewerProfileDataFx.fail);
