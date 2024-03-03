import type { PropsWithChildren, ReactNode } from 'react';

import { widgetNavbarMobileUi } from '@/widgets/layout/navbar-mobile';
import { sharedConfigRoutes } from '@/shared/config';
import { Button, Spacer } from '@nextui-org/react';
import { UserAvatar } from '@/entities/user';
import { useUnit } from 'effector-react';
import { sessionModel } from '@/entities/viewer';
import { useTranslation } from 'react-i18next';
import { User } from '@/shared/api';
import { IoPencil } from 'react-icons/io5';
import { ChangePassword } from '@/features/viewer/changePassword';
import {
    changeAvatarModel,
    changePasswordModel,
} from '@/pages/viewer/profileEditPage/model/model';
import { ChangeAvatar } from '@/features/viewer/changeAvatar';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { translationNS } from '../../config';

const {
    RouteName: { DELIVERIES },
} = sharedConfigRoutes;
const { NavbarMobile } = widgetNavbarMobileUi;

/**
 * Constants
 */

const PERSONAL_INFO_LABEL = 'section.label.personalInfo';
const CHANGE_PASSWORD_LABEL = 'section.label.changePassword';
const CHANGE_PASSWORD_DESCRIPTION = 'section.description.changePassword';
const AVATAR_SIZE_DESCRIPTION = 'section.description.avatarSize';
const AVATAR_FORMAT_DESCRIPTION = 'section.description.avatarFormat';
const FULL_NAME_LABEL = 'section.label.fullName';
const EMAIL_LABEL = 'section.label.email';
const PHONE_LABEL = 'section.label.phone';
const UNKNOWN_LABEL = 'section.label.unknown';

/**
 * Layout
 */
const Content: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <main className="h-full w-full flex-col px-4 lg:mx-auto lg:w-[750px]">
        {children}
    </main>
);

const Heading: FunctionComponent<PropsWithChildren> = ({ children }) => (
    <h2 className="text-xl font-bold">{children}</h2>
);

const Header: FunctionComponent<{ backButton: ReactNode; title: string }> = ({
    backButton,
    title,
}) => (
    <header className="flex w-full items-center px-4 pt-4">
        <div className="flex-shrink">{backButton}</div>
        <div className="mx-auto">{title}</div>
    </header>
);

/**
 * Components
 */
const BackButton: FunctionComponent = () => {
    const navigate = useNavigate();
    const onPress = (): void => navigate(-1);

    return (
        <Button
            size="sm"
            href={DELIVERIES}
            onPress={onPress}
            variant="bordered"
            className="flex items-center gap-1"
        >
            <IoMdArrowRoundBack />
        </Button>
    );
};

const AvatarTool: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const user = useUnit(sessionModel.$sessionStore);

    const sizeDescription = t(AVATAR_SIZE_DESCRIPTION);
    const formatDescription = t(AVATAR_FORMAT_DESCRIPTION);

    return (
        <div className="flex w-full items-center gap-4 lg:gap-6">
            <div>
                <UserAvatar
                    className="h-20 w-20 text-large lg:h-28 lg:w-28"
                    user={user}
                />
            </div>
            <div>
                <ChangeAvatar.UploadButton model={changeAvatarModel} />
                <Spacer y={1} />
                <p className="text-xs">{sizeDescription}</p>
                <p className="text-xs">{formatDescription}</p>
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
    const fullNameLabel = t(FULL_NAME_LABEL);
    const fullName = user
        ? `${user.first_name} ${user.last_name}`
        : t(UNKNOWN_LABEL);

    const emailLabel = t(EMAIL_LABEL);
    const email = user ? user.email : t(UNKNOWN_LABEL);

    const phoneLabel = t(PHONE_LABEL);
    const phone = user?.phone ?? t(UNKNOWN_LABEL);

    return (
        <div className="w-full rounded-xl border-2 p-4">
            <div className="flex justify-between gap-2">
                <Heading>{heading}</Heading>
                <Button size="sm" isDisabled isIconOnly>
                    <IoPencil />
                </Button>
            </div>
            <Spacer y={4} />
            <div className="flex flex-col gap-2 md:flex-row">
                <div className="w-full max-w-xs">
                    <label className="mb-0.5 block text-sm font-bold text-gray-700">
                        {fullNameLabel}
                    </label>
                    <div>{fullName}</div>
                </div>
                <div className="w-full max-w-xs">
                    <label className="mb-0.5 block text-sm font-bold text-gray-700">
                        {emailLabel}
                    </label>
                    <div>{email}</div>
                </div>
                <div className="w-full max-w-xs">
                    <label className="mb-0.5 block text-sm font-bold text-gray-700">
                        {phoneLabel}
                    </label>
                    <div>{phone}</div>
                </div>
            </div>
        </div>
    );
};

const PasswordTool: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const heading = t(CHANGE_PASSWORD_LABEL);
    const description = t(CHANGE_PASSWORD_DESCRIPTION);
    return (
        <div>
            <Heading>{heading}</Heading>
            <p className="text-md">{description}</p>
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
            <Header
                backButton={<BackButton />}
                title="Редактирование профиля"
            />
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
