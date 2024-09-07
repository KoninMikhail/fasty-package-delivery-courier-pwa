import { Spacer } from '@nextui-org/react';
import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { PropsWithChildren } from 'react';

import { UserAvatar } from '@/entities/user';
import { ChangeAvatar } from '@/features/viewer/changeAvatar';
import { sessionModel } from '@/entities/viewer';
import {
    AVATAR_FORMAT_DESCRIPTION,
    AVATAR_SIZE_DESCRIPTION,
    translationNS,
} from '../config';
import { $isOffline, changeAvatarModel } from '../model/model';

/**
 * Layouts
 */
const Message: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <p className="border-l-large border-primary-300 pl-3 text-sm">{children}</p>
);

/**
 * ResetPasswordModal
 * @constructor
 */
export const SelectAvatarRow: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const { user, isOffline, errors } = useUnit({
        user: sessionModel.$viewerProfileData,
        isOffline: $isOffline,
        errors: changeAvatarModel.$error,
    });
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
                <ChangeAvatar.UploadButton
                    model={changeAvatarModel}
                    isDisabled={!!isOffline}
                />
                <Spacer y={2.5} />
                {hasErrors ? (
                    <p className="text-xs text-danger">
                        {errors[0].message ?? null}
                    </p>
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
