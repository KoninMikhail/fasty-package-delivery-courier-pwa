import { ChangePassword } from '@/features/viewer/changePassword';
import { createEffect } from 'effector';
import { changePasswordFx, sessionModel } from '@/entities/viewer';
import { ChangeAvatar } from '@/features/viewer/changeAvatar';

const changeAvatarFx = createEffect({
    handler: async ({ avatar, userId }: { avatar: string; userId: number }) => {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return avatar;
    },
});

export const changePasswordModel = ChangePassword.factory.createModel({
    targetUser: sessionModel.$sessionStore,
    updateUserFx: changePasswordFx,
});

export const changeAvatarModel = ChangeAvatar.factory.createModel({
    user: sessionModel.$sessionStore,
    changeAvatarFx,
});
