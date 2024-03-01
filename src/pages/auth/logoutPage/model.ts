import { createEvent, createStore, sample } from 'effector';
import { logoutFx, sessionModel } from '@/entities/viewer';

export const logoutPageInit = createEvent<void>();

export const $logoutCompleted = createStore(false)
    .on(logoutFx.done, () => true)
    .on(logoutFx.fail, () => true)
    .reset(sessionModel.$sessionProfileStore);

sample({
    clock: logoutPageInit,
    source: $logoutCompleted,
    filter: (data) => !data,
    target: logoutFx,
});
