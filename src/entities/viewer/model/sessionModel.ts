import { createStore, sample } from 'effector';
import { User, userSchema } from '@/shared/api';
import { empty, not } from 'patronum';
import { persist } from 'effector-storage/local';
import { authByEmailFx, getViewerProfileDataFx, logoutFx } from '../api';

export const $sessionProfileStore = createStore<Nullable<User>>(null)
    .on(getViewerProfileDataFx.doneData, (_, data) => data)
    .reset([logoutFx.done, logoutFx.fail, authByEmailFx.fail]);

export const $isSessionAuthorized = not(empty($sessionProfileStore));

persist({
    store: $sessionProfileStore,
    key: 'viewerProfileStore',
    contract: (raw): raw is User => {
        const result = userSchema.nullable().safeParse(raw);
        if (result.success) {
            return true;
        }
        throw result.error;
    },
});

sample({
    clock: authByEmailFx.doneData,
    target: getViewerProfileDataFx,
});
