import { createEffect } from 'effector';
import { apiClient, User } from '@/shared/api';

export type ChangeUserPasswordFxParameters = {
    userId: User['id'];
    password: string;
};

export const changeUserPasswordFx = createEffect(
    async ({ userId, password }: ChangeUserPasswordFxParameters) => {
        return apiClient.patchUserById(
            {
                password,
            },
            {
                params: {
                    userId,
                },
            },
        );
    },
);
