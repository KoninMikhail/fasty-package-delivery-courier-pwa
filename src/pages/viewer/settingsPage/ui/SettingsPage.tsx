import {
    sharedConfigConstants,
    sharedConfigDetectDevice,
} from '@/shared/config';
import { Authorized } from '@/entities/viewer';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';
import { DesktopSettingsPageView, MobileSettingsPageView } from './views';

import { translationNS } from '../config';

const { useDeviceScreen } = sharedConfigDetectDevice;
const { APP_NAME } = sharedConfigConstants;

/**
 * @name SettingsPage
 * @description Page for deliveries exchange
 * @constructor
 */
export const SettingsPage: FunctionComponent = () => {
    const { isDesktop } = useDeviceScreen();
    const { t } = useTranslation(translationNS);

    const pageTitle = `${t('page.title')} | ${APP_NAME}`;

    useDocumentTitle(pageTitle);

    return isDesktop ? (
        <Authorized>
            <DesktopSettingsPageView />
        </Authorized>
    ) : (
        <Authorized>
            <MobileSettingsPageView />
        </Authorized>
    );
};
