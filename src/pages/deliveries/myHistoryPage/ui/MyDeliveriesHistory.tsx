import { Authorized } from '@/entities/viewer';
import {
    sharedConfigDetectDevice,
    sharedConfigLocale,
    sharedConfigConstants,
} from '@/shared/config';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';
import { useGate } from 'effector-react';
import { useEffect } from 'react';
import { searchDeliveriesByQueryFx } from '@/entities/search/api/searchDeliveriesByQuery';
import {
    DesktopMyDeliveriesHistoryView,
    MobileMyDeliveriesHistoryView,
} from './views';
import { translationNS } from '../config';
import locale_en from '../locales/en.locale.json';
import locale_ru from '../locales/ru.locale.json';
import { MyDeliveriesHistoryPageGate } from '../model';

const { useDeviceScreen } = sharedConfigDetectDevice;
const { locale } = sharedConfigLocale;
const { APP_NAME } = sharedConfigConstants;

/**
 * locale.ts
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

/**
 * @name MyDeliveriesPage
 * @description Page for deliveries exchange
 * @constructor
 */
export const MyDeliveriesHistoryPage: FunctionComponent = () => {
    const { isDesktop } = useDeviceScreen();
    const { t } = useTranslation(translationNS);

    const pageTitle = `${t('page.title')} | ${APP_NAME}`;

    useDocumentTitle(pageTitle);
    useGate(MyDeliveriesHistoryPageGate);

    useEffect(() => {
        void searchDeliveriesByQueryFx('82');
    }, []);

    return isDesktop ? (
        <Authorized>
            <DesktopMyDeliveriesHistoryView />
        </Authorized>
    ) : (
        <Authorized>
            <MobileMyDeliveriesHistoryView />
        </Authorized>
    );
};
