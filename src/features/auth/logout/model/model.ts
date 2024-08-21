import { createEvent, sample } from 'effector';
import { logoutFx } from '@/entities/viewer';

export const logout = createEvent<void>();
export const $pending = logoutFx.pending;
export const userLoggedOut = logoutFx.done;

sample({
    clock: logout,
    target: logoutFx,
});
