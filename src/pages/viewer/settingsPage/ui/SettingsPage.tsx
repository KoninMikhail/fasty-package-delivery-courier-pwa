import {
    sharedConfigDetectDevice,
    sharedConfigConstants,
    sharedConfigLocale,
} from '@/shared/config';
import { Authorized } from '@/entities/viewer';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';
import { DesktopSettingsPageView, MobileSettingsPageView } from './views';

import { translationNS } from '../config';

import locale_en from '../locales/en.locale.json';
import locale_ru from '../locales/ru.locale.json';

const { useDeviceScreen } = sharedConfigDetectDevice;
const { locale } = sharedConfigLocale;
const { APP_NAME } = sharedConfigConstants;

/**
 * locale.ts
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

/**
 * @name RootPage
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
