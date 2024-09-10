import { LuPackage } from 'react-icons/lu';
import { TbTruckDelivery, TbUserEdit } from 'react-icons/tb';
import { MdChecklistRtl } from 'react-icons/md';
import { IoMdSettings } from 'react-icons/io';

import { sharedConfigRoutes } from '@/shared/config';
import { IoSearchSharp } from 'react-icons/io5';

const { RouteName } = sharedConfigRoutes;

const {
    ROOT_PAGE,
    SEARCH_PAGE,
    DELIVERIES,
    SETTINGS_PAGE,
    DELIVERIES_HISTORY_PAGE,
    PROFILE_EDIT_PAGE,
} = RouteName;

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
    {
        id: 'search',
        icon: <IoSearchSharp />,
        label: 'nav.search',
        href: SEARCH_PAGE,
    },
];

export const bottomToolItems = [
    {
        id: 'profile-edit',
        icon: <TbUserEdit />,
        label: 'nav.profileEdit',
        href: PROFILE_EDIT_PAGE,
    },
    {
        id: 'settings',
        icon: <IoMdSettings />,
        label: 'nav.settings',
        href: SETTINGS_PAGE,
    },
];
