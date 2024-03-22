import { ChangePassword } from '@/features/viewer/changePassword';
import { changePasswordFx, sessionModel } from '@/entities/viewer';
import { ChangeAvatar } from '@/features/viewer/changeAvatar';
import { changeViewerAvatarFx } from '@/entities/viewer/model/effects/changeViewerAvatarFx';

export const changePasswordModel = ChangePassword.factory.createModel({
    targetUser: sessionModel.$sessionStore,
    updateUserFx: changePasswordFx,
});

export const changeAvatarModel = ChangeAvatar.factory.createModel({
    user: sessionModel.$sessionStore,
    changeAvatarFx: changeViewerAvatarFx,
});
