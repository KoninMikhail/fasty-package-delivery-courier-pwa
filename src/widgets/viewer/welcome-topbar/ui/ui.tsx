import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react';
import { PropsWithChildren } from 'react';
import { useUnit } from 'effector-react';
import { sessionModel } from '@/entities/viewer';
import { UserAvatar } from '@/entities/user';
import { sharedConfigRoutes } from '@/shared/config';
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { User } from '@/shared/api';
import { Logout } from '@/features/auth/logout';
import { translationNS } from '../config';

const { RouteName } = sharedConfigRoutes;

const { PROFILE_EDIT_PAGE } = RouteName;

/**
 * Сonstants
 */

const HELLO_TEXT = 'greetings.name';
const HELLO_TEXT_WITHOUT_NAME = 'greetings.withoutName';
const WISH_TEXT = 'greetings.wish';
const SIGN_IN_AS = 'signUp.title';
const LOGOUT_TEXT = 'logout.label';
const PROFILE_TEXT = 'myProfile.label';

/**
 * Layout
 */
const Root: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return <div className="w-full">{children}</div>;
};

/**
 * Components
 */

const Greetings: FunctionComponent<{
    profile: Nullable<User>;
}> = ({ profile }) => {
    const { t } = useTranslation(translationNS);
    const name = profile?.first_name;
    const helloText = name
        ? t(HELLO_TEXT, { name })
        : t(HELLO_TEXT_WITHOUT_NAME);
    const wishText = t(WISH_TEXT);

    return (
        <div>
            <div>
                <span className="font-bold">{helloText}</span>
            </div>
            <div>
                <span className="font-bold">{wishText}</span>
            </div>
        </div>
    );
};

const UserTool: FunctionComponent<{
    profile: Nullable<User>;
    onPressProfile: () => void;
    onPressLogout: () => void;
}> = ({ profile, onPressProfile, onPressLogout }) => {
    const { t } = useTranslation(translationNS);

    const profileEmail = profile?.email;

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <UserAvatar user={profile} isBordered />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">{t(SIGN_IN_AS)}</p>
                    <p className="font-semibold">{profileEmail}</p>
                </DropdownItem>
                <DropdownItem key="settings" onPress={onPressProfile}>
                    {t(PROFILE_TEXT)}
                </DropdownItem>
                <DropdownItem
                    key="logout"
                    color="danger"
                    onPress={onPressLogout}
                >
                    {t(LOGOUT_TEXT)}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

/**
 * View
 * @constructor
 */

export const WelcomeTopbar: FunctionComponent = () => {
    const navigate = useNavigate();
    const profile = useUnit(sessionModel.$sessionStore);
    const logout = useUnit(Logout.model);

    const onPressProfile = (): void => navigate(PROFILE_EDIT_PAGE);
    const onPressLogout = (): void => logout();

    return (
        <Root>
            <div className="mx-auto grid w-full grid-cols-[auto_max-content] items-center gap-2 text-white lg:w-[750px]">
                <Greetings profile={profile} />
                <UserTool
                    profile={profile}
                    onPressProfile={onPressProfile}
                    onPressLogout={onPressLogout}
                />
            </div>
        </Root>
    );
};
