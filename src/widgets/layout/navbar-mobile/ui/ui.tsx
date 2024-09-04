import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { sharedUiComponents } from '@/shared/ui';
import { sharedLibTypeGuards } from '@/shared/lib';
import { translationNS } from '../config';
import { navbarItems } from '../data';

const { Menu, MenuItem } = sharedUiComponents;
const { isEmpty } = sharedLibTypeGuards;

/**
 * Components
 */
const NavbarContainer: FunctionComponent<PropsWithChildren> = ({
    children,
}) => (
    <div className="fixed bottom-0 left-0 right-0 z-30 w-full rounded-t-3xl border-[1px] border-b-0 border-gray-100 bg-background p-1.5 shadow-2xl ring-default dark:border-default-50">
        <div className="mx-auto w-full lg:w-[750px]">{children}</div>
    </div>
);

/**
 * @name NavbarMobile
 * @description Navbar for mobile devices
 * @constructor
 */
export const NavbarMobile: FunctionComponent = React.memo(() => {
    const { t } = useTranslation(translationNS);
    const savedQuery = localStorage.getItem('searchQuery');
    console.log('search', savedQuery);
    const items = navbarItems.map((item) => {
        if (item.id === 'search' && !isEmpty(savedQuery)) {
            return {
                ...item,
                href: `${item.href}/?q=${savedQuery}`,
            };
        }
        return item;
    });

    return (
        <NavbarContainer>
            <Menu
                items={items}
                orientation="horizontal"
                stretch
                renderItem={(item) => (
                    <MenuItem
                        key={item.href}
                        to={item.href}
                        icon={item.icon}
                        label={t(item.label)}
                        classNames={{
                            item: 'px-4',
                        }}
                        vertical
                    />
                )}
            />
        </NavbarContainer>
    );
});
