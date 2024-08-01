import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react';
import { memo, PropsWithChildren } from 'react';
import { useUnit } from 'effector-react';
import { sessionModel } from '@/entities/viewer';
import { getUserName, UserAvatar } from '@/entities/user';
import { sharedConfigRoutes } from '@/shared/config';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Logout } from '@/features/auth/logout';
import {
    HELLO_TEXT,
    HELLO_TEXT_WITHOUT_NAME,
    LOGOUT_TEXT,
    PROFILE_TEXT,
    SETTINGS_TEXT,
    SIGN_IN_AS,
    translationNS,
    WISH_TEXT,
} from '../config';

const { RouteName } = sharedConfigRoutes;
const { PROFILE_EDIT_PAGE, SETTINGS_PAGE } = RouteName;

/**
 * Layout
 */
const Root: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return <div className="w-full">{children}</div>;
};

/**
 * Components
 */

const Greetings: FunctionComponent = memo(() => {
    const { t } = useTranslation(translationNS);
    const profile = useUnit(sessionModel.$viewerProfileData);
    const name = getUserName(profile);
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
});

const UserTool: FunctionComponent = () => {
    const logout = useUnit(Logout.model.logout);
    const navigate = useNavigate();
    const profile = useUnit(sessionModel.$viewerProfileData);
    const { t } = useTranslation(translationNS);

    const profileEmail = profile?.email;

    const onPressProfile = (): void => navigate(PROFILE_EDIT_PAGE);
    const onPressSettings = (): void => navigate(SETTINGS_PAGE);
    const onPressLogout = (): void => logout();

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <UserAvatar user={profile} isBordered />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profileInfo" className="h-14 gap-2">
                    <p className="font-semibold">{t(SIGN_IN_AS)}</p>
                    <p className="font-semibold">{profileEmail}</p>
                </DropdownItem>
                <DropdownItem key="profileEdit" onPress={onPressProfile}>
                    {t(PROFILE_TEXT)}
                </DropdownItem>
                <DropdownItem key="appSettings" onPress={onPressSettings}>
                    {t(SETTINGS_TEXT)}
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

export const WelcomeTopbar: FunctionComponent = () => {
    return (
        <Root>
            <div className="mx-auto grid w-full grid-cols-[auto_max-content] items-center gap-2 text-white lg:w-[750px]">
                <Greetings />
                <UserTool />
            </div>
        </Root>
    );
};
