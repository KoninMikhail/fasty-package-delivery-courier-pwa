import { Route, Routes } from 'react-router-dom';

import { sharedConfigRoutes } from '@/shared/config';
import { sharedUiLayouts } from '@/shared/ui';
import { pageAuthUi } from '@/pages/auth/authPage';
import { pageSettingsUi } from '@/pages/viewer/settingsPage';
import { pageProfileEditUi } from '@/pages/viewer/profileEditPage';
import { pageMyActiveDeliveriesUi } from '@/pages/deliveries/myActiveDeliveriesPage';
import { pageSingleDeliveryDetailsUi } from '@/pages/deliveries/singleDeliveryDetailsPage';
import { pageMyHistoryUi } from '@/pages/deliveries/myHistoryPage';
import { pageMarketUi } from '@/pages/deliveries/marketPage';
import { pageNorFoundUi } from '@/pages/errors/notFoundPage';

const { RouteName } = sharedConfigRoutes;
const { SuspenseLayout } = sharedUiLayouts;

const { MarketPage } = pageMarketUi;
const { NotFoundPage } = pageNorFoundUi;
const { MyActiveDeliveriesPage } = pageMyActiveDeliveriesUi;
const { SettingsPage } = pageSettingsUi;
const { ProfileEditPage } = pageProfileEditUi;
const { MyHistoryPage } = pageMyHistoryUi;
const { SingleDeliveryDetailsPage } = pageSingleDeliveryDetailsUi;
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
        component: MarketPage,
    },
    {
        path: DELIVERIES,
        component: MyActiveDeliveriesPage,
    },
    {
        path: DELIVERIES_DETAIL_PAGE,
        component: SingleDeliveryDetailsPage,
    },
    {
        path: DELIVERIES_HISTORY_PAGE,
        component: MyHistoryPage,
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
