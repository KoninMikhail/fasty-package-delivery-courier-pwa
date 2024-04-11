import { ChangePassword } from '@/features/viewer/changePassword';
import { setViewerAccountPasswordFx, sessionModel } from '@/entities/viewer';
import { ChangeAvatar } from '@/features/viewer/changeAvatar';
import { changeViewerAvatarFx } from '@/entities/viewer/model/effects/changeViewerAvatarFx';

export const changePasswordModel = ChangePassword.factory.createModel({
    targetUser: sessionModel.$viewerProfileData,
    updateUserFx: setViewerAccountPasswordFx,
});

export const changeAvatarModel = ChangeAvatar.factory.createModel({
    minWidth: 200,
    minHeight: 200,
    resizeToMaxWidth: 600,
    resizeToMaxHeight: 600,
    changeAvatarFx: changeViewerAvatarFx,
});
