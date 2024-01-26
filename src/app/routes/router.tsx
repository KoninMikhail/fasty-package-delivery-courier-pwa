import { Route, Routes } from 'react-router-dom';

import { notfoundPageUi } from '@/pages/notFoundPage';
import { sharedConfigRoutes } from '@/shared/config';
import { sharedUiLayouts } from '@/shared/ui';
import { profilePageUi } from '@/pages/profilePage';
import { rootPageUi } from '@/pages/rootPage';
import { settingsPageUi } from '@/pages/settingsPage';
import { deliveriesHistoryPageUi } from '@/pages/deliveriesHistoryPage';
import { deliveryDetailsPageUi } from '@/pages/deliveryDetailsPage';
import { authPageUi } from '@/pages/authPage';
import { cookiePageUi } from '@/pages/polices/cookiePolicyPage';
import { privacyPageUi } from '@/pages/polices/privacyPolicyPage';
import { termsPageUi } from '@/pages/polices/termsPage';

const { RouteName } = sharedConfigRoutes;
const { SuspenseLayout } = sharedUiLayouts;

const { RootPage } = rootPageUi;
const { NotFoundPage } = notfoundPageUi;
const { ProfilePage } = profilePageUi;
const { SettingsPage } = settingsPageUi;
const { DeliveriesHistoryPage } = deliveriesHistoryPageUi;
const { DeliveryDetailsPage } = deliveryDetailsPageUi;
const { CookiePolicyPage } = cookiePageUi;
const { PrivacyPolicyPage } = privacyPageUi;
const { TermsOfServicePage } = termsPageUi;
const { AuthPage } = authPageUi;

const {
    ROOT_PAGE,
    AUTH_PAGE,
    PROFILE_PAGE,
    SETTINGS_PAGE,
    DELIVERIES_HISTORY_PAGE,
    DELIVERY_DETAILS_PAGE,
    PRIVACY_POLICY_PAGE,
    TERMS_OF_SERVICE_PAGE,
    COOKIES_POLICY_PAGE,
} = RouteName;

const routes: sharedConfigRoutes.RouteDescription[] = [
    {
        path: AUTH_PAGE,
        component: AuthPage,
    },
    {
        path: PRIVACY_POLICY_PAGE,
        component: PrivacyPolicyPage,
    },
    {
        path: TERMS_OF_SERVICE_PAGE,
        component: TermsOfServicePage,
    },
    {
        path: COOKIES_POLICY_PAGE,
        component: CookiePolicyPage,
    },
    {
        path: ROOT_PAGE,
        component: RootPage,
    },
    {
        path: PROFILE_PAGE,
        component: ProfilePage,
    },
    {
        path: DELIVERY_DETAILS_PAGE,
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
