import { ChangePassword } from '@/features/viewer/changePassword';
import { viewerProfileModel } from '@/entities/viewer';
import { createEffect } from 'effector/effector.umd';
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
    targetUser: viewerProfileModel.$profileDataStore,
    updateUserFx: resetPasswordFx,
});

export const changeAvatarModel = ChangeAvatar.factory.createModel({});
