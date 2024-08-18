import { createEvent, createStore, sample } from 'effector';
import { getViewerProfileFx, sessionModel } from '@/entities/viewer';
import { condition } from 'patronum';

export const profileDataRequested = createEvent();
export const profileDataReceived = createEvent();
export const profileDataFailed = createEvent();

const profileDataRequestedAllowProcessing = createEvent();
const profileDataAddedToWaitlist = createEvent();

const $waitsForUpdateProfileDate = createStore<number>(0)
    .on(profileDataAddedToWaitlist, (state) => state + 1)
    .reset(getViewerProfileFx.done);

condition({
    source: profileDataRequested,
    if: sessionModel.$$isOnline,
    then: profileDataRequestedAllowProcessing,
    else: profileDataAddedToWaitlist,
});

sample({
    clock: profileDataRequestedAllowProcessing,
    source: {
        isOnline: sessionModel.$$isOnline,
        isAuthorized: sessionModel.$isAuthorized,
    },
    filter: ({ isOnline, isAuthorized }) => isOnline && isAuthorized,
    target: getViewerProfileFx,
});

sample({
    clock: sessionModel.$$isOnline,
    source: {
        waitsForUpdateProfileDate: $waitsForUpdateProfileDate,
        isAuthorized: sessionModel.$isAuthorized,
    },
    filter: ({ waitsForUpdateProfileDate, isAuthorized }, isOnline) =>
        waitsForUpdateProfileDate > 0 && !!isOnline && isAuthorized,
    target: getViewerProfileFx,
});

sample({
    clock: getViewerProfileFx.done,
    target: profileDataReceived,
});

sample({
    clock: getViewerProfileFx.fail,
    target: profileDataFailed,
});
