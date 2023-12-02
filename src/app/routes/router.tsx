import { Route, Routes } from 'react-router-dom';

import { authPageUi } from '@/pages/authPage';
import { deliveriesExchangePageUi } from '@/pages/deliveriesExchangePage';
import { deliveryItemPageUi } from '@/pages/deliveryItemPage';
import { mapPageUi } from '@/pages/mapPage';
import { notfoundPageUi } from '@/pages/notFoundPage';
import { profilePageUi } from '@/pages/profilePage';
import { sharedConfigRoutes } from '@/shared/config';
import { sharedUiLayouts } from '@/shared/ui';

const { RouteName } = sharedConfigRoutes;
const { SuspenseLayout } = sharedUiLayouts;

const { AuthPage } = authPageUi;
const { DeliveriesExchangePage } = deliveriesExchangePageUi;
const { DeliveryItemPage } = deliveryItemPageUi;
const { NotFoundPage } = notfoundPageUi;
const { MapPage } = mapPageUi;
const { ProfilePage } = profilePageUi;

const {
    DELIVERIES_LIST_PAGE,
    AUTH_PAGE,
    DELIVERY_ITEM_PAGE,
    PROFILE_PAGE,
    MAP_PAGE,
} = RouteName;

const routes: sharedConfigRoutes.RouteDescription[] = [
    {
        path: AUTH_PAGE,
        component: AuthPage,
    },
    {
        path: DELIVERIES_LIST_PAGE,
        component: DeliveriesExchangePage,
    },
    {
        path: DELIVERY_ITEM_PAGE,
        component: DeliveryItemPage,
    },
    {
        path: MAP_PAGE,
        component: MapPage,
    },
    {
        path: PROFILE_PAGE,
        component: ProfilePage,
    },
];

const routesContent = routes.map(({ path, component: Component }) => (
    <Route key={path} path={path} element={<Component />} />
));

export const AppRouter = () => (
    <SuspenseLayout>
        <Routes>
            {routesContent}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </SuspenseLayout>
);
