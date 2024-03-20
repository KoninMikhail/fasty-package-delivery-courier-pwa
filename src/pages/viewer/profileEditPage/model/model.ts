import { ChangePassword } from '@/features/viewer/changePassword';
import { createEffect } from 'effector';
import { sessionModel } from '@/entities/viewer';
import { apiClient } from '@/shared/api';
import { ChangeAvatar } from '@/features/viewer/changeAvatar';

type ResetPasswordFxParameters = {
    id: string;
    password: string;
};

const resetPasswordFx = createEffect({
    handler: async ({ id, password }: ResetPasswordFxParameters) => {
        await apiClient.patchUserById(
            { password },
            {
                params: {
                    userId: id,
                },
            },
        );
    },
});

const changeAvatarFx = createEffect({
    handler: async ({ avatar, userId }: { avatar: string; userId: number }) => {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return avatar;
    },
});

export const changePasswordModel = ChangePassword.factory.createModel({
    targetUser: sessionModel.$sessionStore,
    updateUserFx: resetPasswordFx,
});

export const changeAvatarModel = ChangeAvatar.factory.createModel({
    user: sessionModel.$sessionStore,
    changeAvatarFx,
});
