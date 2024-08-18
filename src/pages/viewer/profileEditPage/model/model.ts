import { ChangePassword } from '@/features/viewer/changePassword';
import {
    setViewerAccountPasswordFx,
    sessionModel,
    logoutFx,
} from '@/entities/viewer';
import { ChangeAvatar } from '@/features/viewer/changeAvatar';
import { changeViewerAvatarFx } from '@/entities/viewer/model/effects/changeViewerAvatarFx';
import { sharedConfigConstants } from '@/shared/config';

const { APP_DEMO_MODE } = sharedConfigConstants;

export const changePasswordModel = ChangePassword.factory.createModel({
    targetUser: sessionModel.$viewerProfileData,
    updateUserFx: setViewerAccountPasswordFx,
    logoutFx,
    demoMode: APP_DEMO_MODE,
});

export const changeAvatarModel = ChangeAvatar.factory.createModel({
    minWidth: 200,
    minHeight: 200,
    resizeToMaxWidth: 600,
    resizeToMaxHeight: 600,
    changeAvatarFx: changeViewerAvatarFx,
});
