import { Authorized } from '@/entities/viewer';
import {
    sharedConfigDetectDevice,
    sharedConfigConstants,
} from '@/shared/config';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';
import { useGate } from 'effector-react';
import { DesktopProfilePageView, MobileProfilePageView } from './views';
import { translationNS } from '../config';
import { MyDeliveriesPageGate } from '../model/model';

const { useDeviceScreen } = sharedConfigDetectDevice;
const { APP_NAME } = sharedConfigConstants;

/**
 * @name MyDeliveriesPage
 * @description Page for deliveries exchange
 * @constructor
 */
export const MyDeliveriesPage: FunctionComponent = () => {
    const { isDesktop } = useDeviceScreen();
    const { t } = useTranslation(translationNS);

    const pageTitle = `${t('page.title')} | ${APP_NAME}`;
    const heading = t('page.header');

    useDocumentTitle(pageTitle);
    useGate(MyDeliveriesPageGate);

    return isDesktop ? (
        <Authorized>
            <DesktopProfilePageView heading={heading} />
        </Authorized>
    ) : (
        <Authorized>
            <MobileProfilePageView />
        </Authorized>
    );
};
