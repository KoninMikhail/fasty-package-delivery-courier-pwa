import { ChangePassword } from '@/features/viewer/changePassword';
import { setViewerAccountPasswordFx, sessionModel } from '@/entities/viewer';
import { ChangeAvatar } from '@/features/viewer/changeAvatar';
import { changeViewerAvatarFx } from '@/entities/viewer/model/effects/changeViewerAvatarFx';

export const changePasswordModel = ChangePassword.factory.createModel({
    targetUser: sessionModel.$sessionStore,
    updateUserFx: setViewerAccountPasswordFx,
});

export const changeAvatarModel = ChangeAvatar.factory.createModel({
    minWidth: 150,
    minHeight: 150,
    resizeToMaxWidth: 600,
    resizeToMaxHeight: 600,
    changeAvatarFx: changeViewerAvatarFx,
});
