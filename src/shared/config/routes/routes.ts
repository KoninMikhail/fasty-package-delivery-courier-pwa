import type { ComponentType, PropsWithChildren } from 'react';

export enum RouteName {
    ROOT_PAGE = '/',
    AUTH_PAGE = '/auth',
    DELIVERIES_HISTORY_PAGE = '/history',
    DELIVERIES = '/deliveries',
    DELIVERIES_DETAIL_PAGE = `/deliveries/:deliveryId`,
    SETTINGS_PAGE = '/settings',
}

export interface RouteDescription {
    path: RouteName;
    component: ComponentType;
    layout?: ComponentType<PropsWithChildren>;
}
