import type { ComponentType, PropsWithChildren } from 'react'

export enum RouteName {
	DELIVERIES_LIST_PAGE = '/',
	DELIVERY_ITEM_PAGE = `/delivery/:deliveryId`,
	AUTH_PAGE = '/auth',
	PROFILE_PAGE = '/profile',
	MAP_PAGE = '/map'
}

export interface RouteDescription {
	path: RouteName
	component: ComponentType
	layout?: ComponentType<PropsWithChildren>
}
