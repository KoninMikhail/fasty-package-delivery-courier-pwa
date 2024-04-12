import { useUnit } from 'effector-react';
import { sessionModel } from '@/entities/viewer';
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react';
import { UserAvatar, UserCardRow } from '@/entities/user';
import { sharedConfigRoutes } from '@/shared/config';
import {
    LOGOUT_TEXT,
    PROFILE_TEXT,
    SETTINGS_TEXT,
    SIGN_IN_AS,
} from '@/widgets/viewer/welcome-topbar/config';
import { useTranslation } from 'react-i18next';
import { Logout } from '@/features/auth/logout';
import { useNavigate } from 'react-router-dom';
import { translationNS } from '../config';

const { RouteName } = sharedConfigRoutes;
const { PROFILE_EDIT_PAGE, SETTINGS_PAGE } = RouteName;

interface UserMenuProperties {
    type: 'avatar' | 'userCard';
}

export const UserMenu: FunctionComponent<UserMenuProperties> = ({ type }) => {
    const navigate = useNavigate();
    const { t } = useTranslation(translationNS);

    const profile = useUnit(sessionModel.$viewerProfileData);
    const profileEmail = profile?.email;

    const onPressProfile = (): void => navigate(PROFILE_EDIT_PAGE);
    const onPressSettings = (): void => navigate(SETTINGS_PAGE);
    const onPressLogout = useUnit(Logout.model.logout);

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                {type === 'userCard' ? (
                    <UserCardRow user={profile} />
                ) : (
                    <UserAvatar user={profile} isBordered />
                )}
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
