import { Authorized, sessionModel } from '@/entities/viewer';
import { sharedConfigConstants } from '@/shared/config';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';
import { useGate, useUnit } from 'effector-react';
import { useParams } from 'react-router-dom';
import { $pageDeliveryDetails } from '@/pages/deliveries/singleDeliveryDetailsPage/model/stores';
import { getDeliveryId } from '@/entities/delivery';
import { DeliveryDetailsPageGate } from '../model/model';

import {
    DesktopDeliveryDetailsPageView,
    MobileDeliveryDetailsPageView,
} from './views';
import { PAGE_TITLE, translationNS } from '../config';

const { APP_NAME, APP_DESCRIPTION } = sharedConfigConstants;

export const SingleDeliveryDetailsPage: FunctionComponent = () => {
    const { isDesktop, delivery } = useUnit({
        isDesktop: sessionModel.$$isDesktop,
        delivery: $pageDeliveryDetails,
    });
    const { deliveryId: deliverySystemId } = useParams();
    const deliveryId = delivery ? getDeliveryId(delivery) : null;
    const { t, i18n } = useTranslation(translationNS);
    const currentLanguage = i18n.language as keyof typeof APP_DESCRIPTION;

    useDocumentTitle(
        t(PAGE_TITLE, {
            id: deliveryId,
            appName: APP_NAME,
            appDescription: APP_DESCRIPTION[currentLanguage],
        }),
    );
    useGate(DeliveryDetailsPageGate, { deliveryId: deliverySystemId });

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
