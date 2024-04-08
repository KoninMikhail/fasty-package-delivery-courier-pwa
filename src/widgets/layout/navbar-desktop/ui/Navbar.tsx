import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { sharedUiComponents, sharedUiBranding } from '@/shared/ui';
import { sharedConfigRoutes } from '@/shared/config';

import { Logout } from '@/features/auth/logout';
import { Spacer } from '@nextui-org/react';
import { bottomToolItems, navbarItems } from '../data';
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
    const { t } = useTranslation(translationNS);
    return (
        <header className="bg-content-1 flex h-full min-w-72 flex-col rounded-r-3xl bg-content1 p-6 shadow-xl">
            <Link to={ROOT_PAGE}>
                <Logo />
            </Link>
            <div className="flex flex-grow items-center">
                <Menu
                    items={navbarItems}
                    orientation="vertical"
                    renderItem={(item) => {
                        return (
                            <MenuItem
                                key={item.href}
                                to={item.href}
                                icon={item.icon}
                                label={t(item.label)}
                            />
                        );
                    }}
                />
            </div>
            <div>
                <div className="flex flex-grow items-center justify-start">
                    <Menu
                        items={bottomToolItems}
                        orientation="vertical"
                        renderItem={(item) => {
                            return (
                                <MenuItem
                                    key={item.href}
                                    to={item.href}
                                    icon={item.icon}
                                    label={t(item.label)}
                                />
                            );
                        }}
                    />
                </div>
                <Spacer y={4} />
                <Logout.Button fullWidth />
            </div>
        </header>
    );
};
