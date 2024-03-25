import { LuPackage } from 'react-icons/lu';
import { sharedConfigRoutes } from '@/shared/config';
import { TbTruckDelivery } from 'react-icons/tb';
import { MdChecklistRtl } from 'react-icons/md';
import { IoSearchSharp } from 'react-icons/io5';
import {
    DELIVERIES_ITEM,
    HISTORY_ITEM,
    MARKET_ITEM,
    SEARCH_ITEM,
} from '../config';

const { RouteName } = sharedConfigRoutes;
const { ROOT_PAGE, DELIVERIES, SEARCH_PAGE, DELIVERIES_HISTORY_PAGE } =
    RouteName;

export const navbarItems = [
    {
        id: 'home',
        icon: <LuPackage />,
        label: MARKET_ITEM,
        href: ROOT_PAGE,
    },
    {
        id: 'about',
        icon: <TbTruckDelivery />,
        label: DELIVERIES_ITEM,
        href: DELIVERIES,
    },
    {
        id: 'history',
        icon: <MdChecklistRtl />,
        label: HISTORY_ITEM,
        href: DELIVERIES_HISTORY_PAGE,
    },
    {
        id: 'search',
        icon: <IoSearchSharp />,
        label: SEARCH_ITEM,
        href: SEARCH_PAGE,
    },
];
