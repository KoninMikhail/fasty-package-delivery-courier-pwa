import { useTranslation } from 'react-i18next';
import { sharedUiComponents, sharedUiBranding } from '@/shared/ui';
import { sharedConfigRoutes } from '@/shared/config';
import { sessionModel } from '@/entities/viewer';

import { useUnit } from 'effector-react';
import { Link, useNavigate } from 'react-router-dom';
import { UserCardRow } from '@/entities/user';
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react';
import {
    LOGOUT_TEXT,
    PROFILE_TEXT,
    SETTINGS_TEXT,
    SIGN_IN_AS,
} from '@/widgets/viewer/welcome-topbar/config';
import { navbarItems } from '../data';
import { translationNS } from '../config';

const { Menu, MenuItem } = sharedUiComponents;
const { Logo } = sharedUiBranding;
const { RouteName } = sharedConfigRoutes;
const { ROOT_PAGE } = RouteName;

/**
 * @name Navbar
 * @description Header for the app
 * @constructor
 */
export const Navbar: FunctionComponent = () => {
    const navigate = useNavigate();
    const user = useUnit(sessionModel.$viewerProfileData);
    const profile = useUnit(sessionModel.$viewerProfileData);
    const { t } = useTranslation(translationNS);

    const profileEmail = profile?.email;

    /*   const onPressProfile = (): void => navigate(PROFILE_EDIT_PAGE);
    const onPressSettings = (): void => navigate(SETTINGS_PAGE);
    const onPressLogout = (): void => logout(); */
    return (
        <header className="sticky top-0 z-50 h-24 w-full bg-gradient-to-b from-background to-transparent px-8">
            <div className="flex h-24 w-full items-center justify-between">
                <Link to={ROOT_PAGE}>
                    <Logo />
                </Link>
                <div className="mx-auto w-80">
                    <Menu
                        items={navbarItems}
                        stretch
                        orientation="horizontal"
                        renderItem={(item) => {
                            return (
                                <MenuItem
                                    vertical
                                    icon={item.icon}
                                    key={item.href}
                                    to={item.href}
                                    classNames={{
                                        item: 'py-3 !text-sm',
                                    }}
                                    label={t(item.label)}
                                />
                            );
                        }}
                    />
                </div>
                <div>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <UserCardRow user={user} avatarPosition="right" />
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Profile Actions"
                            variant="flat"
                        >
                            <DropdownItem
                                key="profileInfo"
                                className="h-14 gap-2"
                            >
                                <p className="font-semibold">{t(SIGN_IN_AS)}</p>
                                <p className="font-semibold">{profileEmail}</p>
                            </DropdownItem>
                            <DropdownItem key="profileEdit">
                                {t(PROFILE_TEXT)}
                            </DropdownItem>
                            <DropdownItem key="appSettings">
                                {t(SETTINGS_TEXT)}
                            </DropdownItem>
                            <DropdownItem key="logout" color="danger">
                                {t(LOGOUT_TEXT)}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
};
