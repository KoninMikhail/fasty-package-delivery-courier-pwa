import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { sharedUiComponents } from '@/shared/ui';
import { translationNS } from '../config';
import { navbarItems } from '../data';

const { Menu, MenuItem } = sharedUiComponents;

/**
 * Components
 */
const NavbarContainer: FunctionComponent<PropsWithChildren> = ({
    children,
}) => (
    <div className="fixed bottom-0 left-0  right-0 z-30 w-full rounded-t-3xl border border-b-0 border-gray-100 bg-background p-1.5 shadow-2xl  ring-default dark:border-gray-950">
        <div className="mx-auto w-full lg:w-[750px]">{children}</div>
    </div>
);

/**
 * @name NavbarMobile
 * @description Navbar for mobile devices
 * @constructor
 */
export const NavbarMobile: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <NavbarContainer>
            <Menu
                items={navbarItems}
                orientation="horizontal"
                stretch
                renderItem={(item) => {
                    return (
                        <MenuItem
                            key={item.href}
                            to={item.href}
                            icon={item.icon}
                            label={t(item.label)}
                            vertical
                        />
                    );
                }}
            />
        </NavbarContainer>
    );
};