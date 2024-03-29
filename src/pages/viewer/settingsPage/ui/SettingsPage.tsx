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
const { APP_NAME, APP_DESCRIPTION } = sharedConfigConstants;

/**
 * @name SettingsPage
 * @description Page for deliveries exchange
 * @constructor
 */
export const SettingsPage: FunctionComponent = () => {
    const { isDesktop } = useDeviceScreen();
    const { t, i18n } = useTranslation(translationNS);
    const currentLanguage = i18n.language as keyof typeof APP_DESCRIPTION;

    const heading = t('page.header');

    useDocumentTitle(
        t('page.title', {
            appName: APP_NAME,
            appDescription: APP_DESCRIPTION[currentLanguage],
        }),
    );

    return isDesktop ? (
        <Authorized>
            <DesktopSettingsPageView header={heading} />
        </Authorized>
    ) : (
        <Authorized>
            <MobileSettingsPageView />
        </Authorized>
    );
};
