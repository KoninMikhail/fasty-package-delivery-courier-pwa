import { Authorized } from '@/entities/viewer';
import {
    sharedConfigDetectDevice,
    sharedConfigLocale,
    sharedConfigConstants,
} from '@/shared/config';

import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';
import { useGate, useUnit } from 'effector-react';
import { useParams } from 'react-router-dom';
import {selectedDeliveryModel} from '@/entities/delivery';
import {
    DesktopDeliveryDetailsPageView,
    MobileDeliveryDetailsPageView,
} from './views';
import { translationNS } from '../config';
import locale_en from '../locales/en.locale.json';
import locale_ru from '../locales/ru.locale.json';
import { DeliveryDetailsPageGateway } from "@/pages/deliveries/singleDeliveryDetailsPage/model";

const { useDeviceScreen } = sharedConfigDetectDevice;
const { locale } = sharedConfigLocale;
const { APP_NAME } = sharedConfigConstants;

/**
 * locale.ts
 */
locale.addResourceBundle('en', translationNS, locale_en);
locale.addResourceBundle('ru', translationNS, locale_ru);

/**
 * @name SingleDeliveryDetailsPage
 * @description Page for deliveries exchange
 * @constructor
 */
export const SingleDeliveryDetailsPage: FunctionComponent = () => {
    const { isDesktop } = useDeviceScreen();
    const { deliveryId } = useParams();
    const { t } = useTranslation(translationNS);

    const pageTitle = `${t('page.title')} | ${APP_NAME}`;

    useDocumentTitle(pageTitle);
    useGate(DeliveryDetailsPageGateway, { deliveryId });

    return isDesktop ? (
        <Authorized>
            <DesktopDeliveryDetailsPageView />
        </Authorized>
    ) : (
        <Authorized>
            <MobileDeliveryDetailsPageView />
        </Authorized>
    );
};
