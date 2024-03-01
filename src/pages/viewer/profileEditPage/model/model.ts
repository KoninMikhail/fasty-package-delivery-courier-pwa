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
        await apiClient.changeUserPassword(
            { password },
            {
                params: {
                    userId: id,
                },
            },
        );
    },
});

export const changePasswordModel = ChangePassword.factory.createModel({
    targetUser: sessionModel.$viewerProfileStore,
    updateUserFx: resetPasswordFx,
});

export const changeAvatarModel = ChangeAvatar.factory.createModel({});
