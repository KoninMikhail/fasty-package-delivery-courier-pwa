import { createEvent, sample } from 'effector';
import { removeSessionFx } from '@/shared/auth/effects';

export const logout = createEvent<void>();

sample({
    clock: logout,
    target: removeSessionFx,
});
