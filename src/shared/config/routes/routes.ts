import type { ComponentType, PropsWithChildren } from 'react';

export enum RouteName {
    ROOT_PAGE = '/',
    AUTH_PAGE = '/auth',
    DELIVERIES_HISTORY_PAGE = '/history',
    DELIVERIES = '/deliveries',
    DELIVERIES_DETAIL_PAGE = `/deliveries/:deliveryId`,
    SEARCH_PAGE = '/search',
    PROFILE_EDIT_PAGE = '/profile',
    SETTINGS_PAGE = '/settings',
    LOGOUT_PAGE = '/logout',
}

export interface RouteDescription {
    path: RouteName;
    component: ComponentType;
    layout?: ComponentType<PropsWithChildren>;
}
