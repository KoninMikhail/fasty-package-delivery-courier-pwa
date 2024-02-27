import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { User, Image } from '@nextui-org/react';
import { sharedUiComponents } from '@/shared/ui';
import { sharedConfigLocale } from '@/shared/config/locale';
import { sharedConfigRoutes } from '@/shared/config';

import { navbarItems } from '../data';

import locale_en from '../locales/en.locale.json';
import locale_ru from '../locales/ru.locale.json';

import { translationNS } from '../config';

const { locale } = sharedConfigLocale;
const { Menu, MenuItem } = sharedUiComponents;
const { RouteName } = sharedConfigRoutes;

const { ROOT_PAGE } = RouteName;

/**
 * locale.ts
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

/**
 * @name Header
 * @description Header for the app
 * @constructor
 */
export const Header: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <header className="flex min-w-[768px] gap-8 py-4 lg:mx-auto lg:w-[1200px]">
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
                    orientation="horizontal"
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
