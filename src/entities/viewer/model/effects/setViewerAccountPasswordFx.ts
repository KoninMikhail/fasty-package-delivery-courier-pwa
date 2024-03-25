import { createEffect } from 'effector';
import { apiClient, User } from '@/shared/api';
import { debug } from 'patronum';

export type ChangePasswordFxParameters = {
    user: User;
    password: string;
};

export const setViewerAccountPasswordFx = createEffect({
    handler: async ({ user, password }: ChangePasswordFxParameters) => {
        await apiClient.patchUserById(
            { password },
            {
                params: {
                    userId: user.id,
                },
            },
        );
    },
});

debug(setViewerAccountPasswordFx.done);
