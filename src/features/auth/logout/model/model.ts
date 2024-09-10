import { createEvent, sample } from 'effector';
import { logoutFx, sessionModel } from '@/entities/viewer';
import { pending, throttle } from 'patronum';

export const logout = createEvent();
export const $pending = pending({ effects: [logoutFx] });
export const userLoggedOut = createEvent();

sample({
    clock: logout,
    target: [sessionModel.clearViewerProfileData, userLoggedOut],
});

throttle({ source: logout, timeout: 2000, target: logoutFx });
