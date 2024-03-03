import { createGate } from 'effector-react';
import { debug } from 'patronum';
import { getViewerProfileFx } from '@/entities/viewer';

export const WelcomeTopbarGate = createGate();

debug(getViewerProfileFx.fail);
