import type { ComponentType, PropsWithChildren } from 'react';

export enum RouteName {
    ROOT_PAGE = '/',
    DELIVERY_DETAILS_PAGE = `/delivery/:deliveryId`,
    DELIVERIES_HISTORY_PAGE = '/history',
    DELIVERIES_MAP_PAGE = '/deliveries/map',
    PROFILE_PAGE = '/profile',
    SETTINGS_PAGE = '/settings',
}

export interface RouteDescription {
    path: RouteName;
    component: ComponentType;
    layout?: ComponentType<PropsWithChildren>;
}
