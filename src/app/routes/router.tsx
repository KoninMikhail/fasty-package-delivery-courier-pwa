import { Route, Routes } from 'react-router-dom';

import { notfoundPageUi } from '@/pages/errors/notFoundPage';
import { sharedConfigRoutes } from '@/shared/config';
import { sharedUiLayouts } from '@/shared/ui';
import { profilePageUi } from '@/pages/deliveries/deliveriesCurrentPage';
import { deliveryDetailsPageUi } from '@/pages/deliveries/deliveryDetailsPage';
import { authPageUi } from '@/pages/auth/authPage';
import { rootPageUi } from '@/pages/deliveries/deliveriesMarketPage';
import { settingsPageUi } from '@/pages/viewer/settingsPage';
import { deliveriesHistoryPageUi } from '@/pages/deliveries/deliveriesHistoryPage';

const { RouteName } = sharedConfigRoutes;
const { SuspenseLayout } = sharedUiLayouts;

const { DeliveriesMarketPage } = rootPageUi;
const { NotFoundPage } = notfoundPageUi;
const { ProfilePage } = profilePageUi;
const { SettingsPage } = settingsPageUi;
const { DeliveriesHistoryPage } = deliveriesHistoryPageUi;
const { DeliveryDetailsPage } = deliveryDetailsPageUi;
const { AuthPage } = authPageUi;

const {
    ROOT_PAGE,
    AUTH_PAGE,
    DELIVERIES,
    DELIVERIES_DETAIL_PAGE,
    SETTINGS_PAGE,
    DELIVERIES_HISTORY_PAGE,
} = RouteName;

const routes: sharedConfigRoutes.RouteDescription[] = [
    {
        path: AUTH_PAGE,
        component: AuthPage,
    },
    {
        path: ROOT_PAGE,
        component: DeliveriesMarketPage,
    },
    {
        path: DELIVERIES,
        component: ProfilePage,
    },
    {
        path: DELIVERIES_DETAIL_PAGE,
        component: DeliveryDetailsPage,
    },
    {
        path: DELIVERIES_HISTORY_PAGE,
        component: DeliveriesHistoryPage,
    },
    {
        path: SETTINGS_PAGE,
        component: SettingsPage,
    },
];

const routesContent = routes.map(({ path, component: Component }) => (
    <Route key={path} path={path} element={<Component />} />
));

export const AppRouter: FunctionComponent = () => (
    <SuspenseLayout>
        <Routes>
            {routesContent}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </SuspenseLayout>
);
