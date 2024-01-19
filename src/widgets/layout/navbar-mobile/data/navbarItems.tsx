import { LuPackage } from 'react-icons/lu';
import { sharedConfigRoutes } from '@/shared/config';
import { TbTruckDelivery } from 'react-icons/tb';
import { IoMdSettings } from 'react-icons/io';
import { MdChecklistRtl } from 'react-icons/md';

const { RouteName } = sharedConfigRoutes;

const { ROOT_PAGE, PROFILE_PAGE, SETTINGS_PAGE, DELIVERIES_HISTORY_PAGE } =
    RouteName;

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
        id: 'history',
        icon: <MdChecklistRtl />,
        label: 'nav.history',
        href: DELIVERIES_HISTORY_PAGE,
    },
    {
        id: 'settings',
        icon: <IoMdSettings />,
        label: 'nav.settings',
        href: SETTINGS_PAGE,
    },
];
