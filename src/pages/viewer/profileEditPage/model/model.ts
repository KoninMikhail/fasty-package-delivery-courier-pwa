import { ChangePassword } from '@/features/viewer/changePassword';
import { setViewerAccountPasswordFx, sessionModel } from '@/entities/viewer';
import { ChangeAvatar } from '@/features/viewer/changeAvatar';
import { changeViewerAvatarFx } from '@/entities/viewer/model/effects/changeViewerAvatarFx';

export const changePasswordModel = ChangePassword.factory.createModel({
    targetUser: sessionModel.$sessionStore,
    updateUserFx: setViewerAccountPasswordFx,
});

export const changeAvatarModel = ChangeAvatar.factory.createModel({
    user: sessionModel.$sessionStore,
    changeAvatarFx: changeViewerAvatarFx,
});
