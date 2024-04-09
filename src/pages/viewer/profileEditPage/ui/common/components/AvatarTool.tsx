import { useTranslation } from 'react-i18next';
import { useUnit } from 'effector-react';
import { UserAvatar } from '@/entities/user';
import { ChangeAvatar } from '@/features/viewer/changeAvatar';
import { Spacer } from '@nextui-org/react';
import { sessionModel } from '@/entities/viewer';
import { changeAvatarModel } from '../../../model';
import {
    AVATAR_FORMAT_DESCRIPTION,
    AVATAR_SIZE_DESCRIPTION,
    translationNS,
} from '../../../config';

export const AvatarTool: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const user = useUnit(sessionModel.$viewerProfileData);
    const errors = useUnit(changeAvatarModel.$error);
    const hasErrors = errors.length > 0;
    return (
        <div className="flex w-full items-center gap-4 overflow-hidden lg:gap-6">
            <div>
                <UserAvatar
                    className="h-20 w-20 text-large lg:h-28 lg:w-28"
                    user={user}
                />
            </div>
            <div className="block">
                <ChangeAvatar.CropModal model={changeAvatarModel} />
                <ChangeAvatar.UploadButton model={changeAvatarModel} />
                <Spacer y={2.5} />
                {hasErrors ? (
                    <p className="text-xs text-danger">{errors}</p>
                ) : (
                    <>
                        <p className="truncate text-xs">
                            {t(AVATAR_SIZE_DESCRIPTION)}
                        </p>
                        <p className="truncate text-xs">
                            {t(AVATAR_FORMAT_DESCRIPTION)}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};
