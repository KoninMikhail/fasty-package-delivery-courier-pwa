import { sessionUi } from '@/entities/session';
import {
    sharedConfigDetectDevice,
    sharedConfigLocale,
    sharedConfigConstants,
} from '@/shared/config';

import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';
import { DesktopRootPageView, MobileRootPageView } from './views';
import { translationNS } from '../config';
import locale_en from '../locales/en.locale.json';
import locale_ru from '../locales/ru.locale.json';

const { useDeviceScreen } = sharedConfigDetectDevice;
const { locale } = sharedConfigLocale;
const { APP_NAME } = sharedConfigConstants;

/**
 * Components
 */
const { Authorized } = sessionUi;

/**
 * locale
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

/**
 * @name DeliveryDetailsPage
 * @description Page for deliveries exchange
 * @constructor
 */
export const DeliveryDetailsPage: FunctionComponent = () => {
    const { isDesktop } = useDeviceScreen();
    const { t } = useTranslation(translationNS);

    const pageTitle = `${t('page_title')} | ${APP_NAME}`;

    useDocumentTitle(pageTitle);

    return isDesktop ? <DesktopRootPageView /> : <MobileRootPageView />;
};
