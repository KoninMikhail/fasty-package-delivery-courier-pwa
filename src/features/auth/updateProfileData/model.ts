import { createEvent, sample } from 'effector';
import { getViewerProfileFx, sessionModel } from '@/entities/viewer';

export const profileDataRequested = createEvent();
export const profileDataReceived = createEvent();
export const profileDataFailed = createEvent<Error>();

sample({
    clock: profileDataRequested,
    target: getViewerProfileFx,
});

sample({
    clock: getViewerProfileFx.doneData,
    target: [sessionModel.setViewerAccount, profileDataReceived],
});

sample({
    clock: getViewerProfileFx.failData,
    target: profileDataFailed,
});
