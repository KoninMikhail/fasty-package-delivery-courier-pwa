import { Authorized } from '@/entities/viewer';
import {
    sharedConfigDetectDevice,
    sharedConfigConstants,
} from '@/shared/config';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';
import { useGate } from 'effector-react';
import {
    DesktopMyDeliveriesHistoryView,
    MobileMyDeliveriesHistoryView,
} from './views';
import { translationNS } from '../config';
import { MyDeliveriesHistoryPageGate } from '../model';

const { useDeviceScreen } = sharedConfigDetectDevice;
const { APP_NAME } = sharedConfigConstants;

/**
 * @name MyDeliveriesPage
 * @description Page for deliveries exchange
 * @constructor
 */
export const MyDeliveriesHistoryPage: FunctionComponent = () => {
    const { isDesktop } = useDeviceScreen();
    const { t } = useTranslation(translationNS);

    const pageTitle = `${t('page.title')} | ${APP_NAME}`;
    const heading = t('page.header');

    useDocumentTitle(pageTitle);
    useGate(MyDeliveriesHistoryPageGate);

    return isDesktop ? (
        <Authorized>
            <DesktopMyDeliveriesHistoryView header={heading} />
        </Authorized>
    ) : (
        <Authorized>
            <MobileMyDeliveriesHistoryView />
        </Authorized>
    );
};
