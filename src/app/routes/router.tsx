import { Route, Routes } from 'react-router-dom';

import { notfoundPageUi } from '@/pages/notFoundPage';
import { sharedConfigRoutes } from '@/shared/config';
import { sharedUiLayouts } from '@/shared/ui';
import { profilePageUi } from '@/pages/profilePage';
import { rootPageUi } from '@/pages/rootPage';
import { settingsPageUi } from '@/pages/settingsPage';

const { RouteName } = sharedConfigRoutes;
const { SuspenseLayout } = sharedUiLayouts;

const { RootPage } = rootPageUi;
const { NotFoundPage } = notfoundPageUi;
const { ProfilePage } = profilePageUi;
const { SettingsPage } = settingsPageUi;

const { ROOT_PAGE, PROFILE_PAGE, SETTINGS_PAGE, DELIVERIES_HISTORY_PAGE } =
    RouteName;

const routes: sharedConfigRoutes.RouteDescription[] = [
    {
        path: ROOT_PAGE,
        component: RootPage,
    },
    {
        path: PROFILE_PAGE,
        component: ProfilePage,
    },
    {
        path: DELIVERIES_HISTORY_PAGE,
        component: SettingsPage,
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
