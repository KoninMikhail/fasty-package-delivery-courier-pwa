import { LuPackage } from 'react-icons/lu';
import { TbTruckDelivery } from 'react-icons/tb';
import { MdChecklistRtl } from 'react-icons/md';
import { IoMdSettings } from 'react-icons/io';

import { sharedConfigRoutes } from '@/shared/config';

const { RouteName } = sharedConfigRoutes;

const { ROOT_PAGE, DELIVERIES, SETTINGS_PAGE, DELIVERIES_HISTORY_PAGE } =
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
        href: DELIVERIES,
    },
    {
        id: 'history',
        icon: <MdChecklistRtl />,
        label: 'nav.history',
        href: DELIVERIES_HISTORY_PAGE,
    },
];

export const bottomToolItems = [
    {
        id: 'settings',
        icon: <IoMdSettings />,
        label: 'nav.settings',
        href: SETTINGS_PAGE,
    },
];
