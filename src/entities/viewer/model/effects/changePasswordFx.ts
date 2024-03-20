import { createEffect } from 'effector';
import { apiClient, User } from '@/shared/api';

export type ChangePasswordFxParameters = {
    user: User;
    password: string;
};

export const changePasswordFx = createEffect({
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
