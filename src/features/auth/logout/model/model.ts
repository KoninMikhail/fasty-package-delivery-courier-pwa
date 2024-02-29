import { createEvent, sample } from 'effector';
import { logoutFx } from '@/entities/viewer';

export const logout = createEvent<void>();

sample({
    clock: logout,
    target: logoutFx,
});
