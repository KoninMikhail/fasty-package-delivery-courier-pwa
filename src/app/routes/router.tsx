import { Route, Routes } from 'react-router-dom';

import { sharedConfigRoutes } from '@/shared/config';
import { sharedUiLayouts } from '@/shared/ui';
import { pageAuthUi } from '@/pages/auth/authPage';
import { pageSettingsUi } from '@/pages/viewer/settingsPage';
import { pageProfileEditUi } from '@/pages/viewer/profileEditPage';
import { pageMyDeliveriesUi } from '@/pages/deliveries/myActiveDeliveriesPage';
import { pageSingleDeliveryDetailsUi } from '@/pages/deliveries/singleDeliveryDetailsPage';
import { pageMyDeliveriesHistoryUi } from '@/pages/deliveries/myHistoryPage';
import { pageMarketUi } from '@/pages/deliveries/marketPage';
import { pageNorFoundUi } from '@/pages/errors/notFoundPage';
import { pageSearchUi } from '@/pages/search/searchPage/';

const { RouteName } = sharedConfigRoutes;
const { SuspenseLayout } = sharedUiLayouts;

const { MarketPage } = pageMarketUi;
const { NotFoundPage } = pageNorFoundUi;
const { MyDeliveriesPage } = pageMyDeliveriesUi;
const { SettingsPage } = pageSettingsUi;
const { ProfileEditPage } = pageProfileEditUi;
const { MyDeliveriesHistoryPage } = pageMyDeliveriesHistoryUi;
const { SingleDeliveryDetailsPage } = pageSingleDeliveryDetailsUi;
const { AuthPage } = pageAuthUi;
const { SearchPage } = pageSearchUi;

const {
    ROOT_PAGE,
    AUTH_PAGE,
    DELIVERIES,
    DELIVERIES_DETAIL_PAGE,
    SETTINGS_PAGE,
    DELIVERIES_HISTORY_PAGE,
    PROFILE_EDIT_PAGE,
    SEARCH_PAGE,
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
        component: MyDeliveriesPage,
    },
    {
        path: DELIVERIES_DETAIL_PAGE,
        component: SingleDeliveryDetailsPage,
    },
    {
        path: DELIVERIES_HISTORY_PAGE,
        component: MyDeliveriesHistoryPage,
    },
    {
        path: SETTINGS_PAGE,
        component: SettingsPage,
    },
    {
        path: PROFILE_EDIT_PAGE,
        component: ProfileEditPage,
    },
    { path: SEARCH_PAGE, component: SearchPage },
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
