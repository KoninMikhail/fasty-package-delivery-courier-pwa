import { LuPackage } from 'react-icons/lu';
import { sharedConfigRoutes } from '@/shared/config';
import { TbTruckDelivery } from 'react-icons/tb';
import { IoMdSettings } from 'react-icons/io';

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
        icon: <TbTruckDelivery />,
        label: 'nav.deliveries',
        href: PROFILE_PAGE,
    },
    {
        id: 'contacts',
        icon: <IoMdSettings />,
        label: 'nav.settings',
        href: SETTINGS_PAGE,
    },
];
