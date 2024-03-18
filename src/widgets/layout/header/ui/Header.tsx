import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Image, User } from '@nextui-org/react';
import { sharedUiComponents } from '@/shared/ui';
import { sharedConfigRoutes } from '@/shared/config';
import { navbarItems } from '../data';
import { translationNS } from '../config';

const { Menu, MenuItem } = sharedUiComponents;
const { RouteName } = sharedConfigRoutes;
const { ROOT_PAGE } = RouteName;

/**
 * @name Header
 * @description Header for the app
 * @constructor
 */
export const Header: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <header className="flex h-full gap-8 rounded-r-3xl bg-black">
            <Link to={ROOT_PAGE}>
                <Image
                    width={70}
                    alt="NextUI hero Image"
                    src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                />
            </Link>
            <div className="flex flex-grow items-center justify-center">
                <Menu
                    items={navbarItems}
                    orientation="vertical"
                    renderItem={(item) => {
                        return (
                            <MenuItem to={item.href} label={t(item.label)} />
                        );
                    }}
                />
            </div>
            <div>
                <User
                    name="Junior Garcia"
                    description={
                        <Link href="https://twitter.com/jrgarciadev" size="sm">
                            @jrgarciadev
                        </Link>
                    }
                    avatarProps={{
                        src: 'https://avatars.githubusercontent.com/u/30373425?v=4',
                    }}
                />
            </div>
        </header>
    );
};
