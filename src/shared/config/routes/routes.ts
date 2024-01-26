import type { ComponentType, PropsWithChildren } from 'react';

export enum RouteName {
    ROOT_PAGE = '/',
    AUTH_PAGE = '/auth',
    DELIVERY_DETAILS_PAGE = `/delivery/:deliveryId`,
    DELIVERIES_HISTORY_PAGE = '/history',
    DELIVERIES_MAP_PAGE = '/deliveries/map',
    PROFILE_PAGE = '/profile',
    SETTINGS_PAGE = '/settings',
    PRIVACY_POLICY_PAGE = '/docs/privacy-policy',
    TERMS_OF_SERVICE_PAGE = '/docs/terms-of-service',
    COOKIES_POLICY_PAGE = '/docs/cookies-policy',
}

export interface RouteDescription {
    path: RouteName;
    component: ComponentType;
    layout?: ComponentType<PropsWithChildren>;
}
