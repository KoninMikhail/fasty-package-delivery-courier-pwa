import { Route, Routes } from 'react-router-dom';

import { pageNorFoundUi } from '@/pages/errors/notFoundPage';
import { sharedConfigRoutes } from '@/shared/config';
import { sharedUiLayouts } from '@/shared/ui';
import { profilePageUi } from '@/pages/deliveries/deliveriesCurrentPage';
import { deliveryDetailsPageUi } from '@/pages/deliveries/deliveryDetailsPage';
import { pageAuthUi } from '@/pages/auth/authPage';
import { rootPageUi } from '@/pages/deliveries/deliveriesMarketPage';
import { pageSettingsUi } from '@/pages/viewer/settingsPage';
import { deliveriesHistoryPageUi } from '@/pages/deliveries/deliveriesHistoryPage';
import { pageProfileEditUi } from '@/pages/viewer/profileEditPage';

const { RouteName } = sharedConfigRoutes;
const { SuspenseLayout } = sharedUiLayouts;

const { DeliveriesMarketPage } = rootPageUi;
const { NotFoundPage } = pageNorFoundUi;
const { ProfilePage } = profilePageUi;
const { SettingsPage } = pageSettingsUi;
const { ProfileEditPage } = pageProfileEditUi;
const { DeliveriesHistoryPage } = deliveriesHistoryPageUi;
const { DeliveryDetailsPage } = deliveryDetailsPageUi;
const { AuthPage } = pageAuthUi;

const {
    ROOT_PAGE,
    AUTH_PAGE,
    DELIVERIES,
    DELIVERIES_DETAIL_PAGE,
    SETTINGS_PAGE,
    DELIVERIES_HISTORY_PAGE,
    PROFILE_EDIT_PAGE,
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
    {
        path: PROFILE_EDIT_PAGE,
        component: ProfileEditPage,
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
