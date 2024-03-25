import type { PropsWithChildren } from 'react';

import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { Button, Divider, Spacer } from '@nextui-org/react';
import { UserAvatar } from '@/entities/user';
import { useUnit } from 'effector-react';
import { sessionModel } from '@/entities/viewer';
import { useTranslation } from 'react-i18next';
import { User } from '@/shared/api';
import { IoPencil } from 'react-icons/io5';
import { ChangePassword } from '@/features/viewer/changePassword';
import { ChangeAvatar } from '@/features/viewer/changeAvatar';
import { getFullUserName } from '@/entities/user/lib/utils';
import { changeAvatarModel, changePasswordModel } from '../../model';
import { BackButton, PageTitle } from '../common';
import {
    AVATAR_FORMAT_DESCRIPTION,
    AVATAR_SIZE_DESCRIPTION,
    CHANGE_PASSWORD_DESCRIPTION,
    CHANGE_PASSWORD_LABEL,
    EMAIL_LABEL,
    FULL_NAME_LABEL,
    PERSONAL_INFO_LABEL,
    PHONE_LABEL,
    translationNS,
    UNKNOWN_LABEL,
} from '../../config';

const { NavbarMobile } = widgetNavbarMobileUi;

/**
 * Layout
 */
const Content: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col px-4 lg:mx-auto lg:w-[750px]">
        {children}
    </main>
);

const Header: FunctionComponent = () => (
    <header className="flex w-full items-center px-4 pt-4">
        <h1 className="flex-grow truncate text-xl font-bold">
            <PageTitle />
        </h1>
        <div className="flex-shrink">
            <BackButton />
        </div>
    </header>
);

/**
 * Components
 */

const AvatarTool: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const user = useUnit(sessionModel.$sessionStore);
    return (
        <div className="flex w-full items-center gap-4 overflow-hidden lg:gap-6">
            <div>
                <UserAvatar
                    className="h-20 w-20 text-large lg:h-28 lg:w-28"
                    user={user}
                />
            </div>
            <div className="block">
                <ChangeAvatar.UploadButton model={changeAvatarModel} />
                <Spacer y={2.5} />
                <p className="truncate text-xs">{t(AVATAR_SIZE_DESCRIPTION)}</p>
                <p className="truncate text-xs">
                    {t(AVATAR_FORMAT_DESCRIPTION)}
                </p>
            </div>
        </div>
    );
};

const PersonalInfo: FunctionComponent<{ user: Nullable<User> }> = ({
    user,
}) => {
    const { t } = useTranslation(translationNS);
    const heading = t(PERSONAL_INFO_LABEL);

    /**
     * Personal info
     */
    const fullName = user ? getFullUserName(user) : t(UNKNOWN_LABEL);
    const email = user ? user.email : t(UNKNOWN_LABEL);
    const phone = user?.phone ?? t(UNKNOWN_LABEL);

    return (
        <div className="w-full rounded-xl border-2 p-4">
            <div className="flex justify-between gap-2">
                <h2 className="text-xl font-bold">{heading}</h2>
                <Button size="sm" isDisabled isIconOnly>
                    <IoPencil />
                </Button>
            </div>
            <Spacer y={4} />
            <div className="flex flex-col gap-2 md:flex-row">
                <div className="w-full max-w-xs">
                    <label className="mb-0.5 block text-xs font-bold text-content3">
                        {t(FULL_NAME_LABEL)}
                    </label>
                    <div>{fullName}</div>
                </div>
                <div className="w-full max-w-xs">
                    <label className="mb-0.5 block text-xs font-bold text-content3">
                        {t(EMAIL_LABEL)}
                    </label>
                    <div>{email}</div>
                </div>
                <div className="w-full max-w-xs">
                    <label className="mb-0.5 block text-xs font-bold text-content3">
                        {t(PHONE_LABEL)}
                    </label>
                    <div>{phone}</div>
                </div>
            </div>
        </div>
    );
};

const PasswordTool: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <div>
            <h2 className="text-xl font-bold">{t(CHANGE_PASSWORD_LABEL)}</h2>
            <Spacer y={2} />
            <p className="text-sm">{t(CHANGE_PASSWORD_DESCRIPTION)}</p>
            <Spacer y={4} />
            <div className="flex flex-col gap-4">
                <ChangePassword.Form model={changePasswordModel} />
            </div>
        </div>
    );
};

/**
 * @name MobileProfileEditPageView
 * @description Page for deliveries exchange
 * @constructor
 */
export const MobileProfileEditPageView: FunctionComponent = () => {
    const user = useUnit(sessionModel.$sessionStore);
    return (
        <>
            <Header />
            <Spacer y={4} className="px-4" />
            <Divider />
            <Spacer y={8} />
            <Content>
                <AvatarTool />
                <Spacer y={8} />
                <PersonalInfo user={user} />
                <Spacer y={8} />
                <PasswordTool />
                <Spacer y={24} />
            </Content>
            <NavbarMobile />
        </>
    );
};
