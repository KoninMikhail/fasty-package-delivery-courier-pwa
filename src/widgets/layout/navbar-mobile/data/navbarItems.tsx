import { LuPackage } from 'react-icons/lu';
import { sharedConfigRoutes } from '@/shared/config';

const { RouteName } = sharedConfigRoutes;

const { ROOT_PAGE, PROFILE_PAGE, SETTINGS_PAGE } = RouteName;

export const navbarItems = [
    {
        id: 'home',
        icon: <LuPackage />,
        label: 'nav.market',
        href: ROOT_PAGE,
    },
    {
        id: 'about',
        icon: <LuPackage />,
        label: 'nav.deliveries',
        href: PROFILE_PAGE,
    },
    {
        id: 'contacts',
        icon: <LuPackage />,
        label: 'nav.settings',
        href: SETTINGS_PAGE,
    },
];
