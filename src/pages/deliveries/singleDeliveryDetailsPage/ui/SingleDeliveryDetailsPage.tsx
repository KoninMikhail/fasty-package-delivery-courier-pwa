import { Authorized } from '@/entities/viewer';
import {
    sharedConfigDetectDevice,
    sharedConfigConstants,
} from '@/shared/config';

import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';
import { useGate } from 'effector-react';
import { useParams } from 'react-router-dom';
import { DeliveryDetailsPageGateway } from '@/pages/deliveries/singleDeliveryDetailsPage/model';
import {
    DesktopDeliveryDetailsPageView,
    MobileDeliveryDetailsPageView,
} from './views';
import { translationNS } from '../config';

const { useDeviceScreen } = sharedConfigDetectDevice;
const { APP_NAME } = sharedConfigConstants;

/**
 * @name SingleDeliveryDetailsPage
 * @description Page for deliveries exchange
 * @constructor
 */
export const SingleDeliveryDetailsPage: FunctionComponent = () => {
    const { isDesktop } = useDeviceScreen();
    const { deliveryId } = useParams();
    const { t } = useTranslation(translationNS);

    const pageTitle = t('page.title', {
        id: deliveryId,
        appName: APP_NAME,
    });

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
