import { Authorized } from '@/entities/viewer';
import {
    sharedConfigDetectDevice,
    sharedConfigConstants,
} from '@/shared/config';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';
import { useGate } from 'effector-react';
import {
    DesktopMyDeliveriesPageView,
    MobileMyDeliveriesPageView,
} from './views';
import { translationNS, PAGE_TITLE } from '../config';
import { MyDeliveriesPageGate } from '../model/model';

const { useDeviceScreen } = sharedConfigDetectDevice;
const { APP_NAME, APP_DESCRIPTION } = sharedConfigConstants;

/**
 * @name MyDeliveriesPage
 * @description Page for deliveries exchange
 * @constructor
 */
export const MyDeliveriesPage: FunctionComponent = () => {
    const { isDesktop } = useDeviceScreen();
    const { t, i18n } = useTranslation(translationNS);
    const appLanguage = i18n.language as keyof typeof APP_DESCRIPTION;

    useDocumentTitle(
        t(PAGE_TITLE, {
            appName: APP_NAME,
            appDescription: APP_DESCRIPTION[appLanguage],
        }),
    );
    useGate(MyDeliveriesPageGate);

    return isDesktop ? (
        <Authorized>
            <DesktopMyDeliveriesPageView />
        </Authorized>
    ) : (
        <Authorized>
            <MobileMyDeliveriesPageView />
        </Authorized>
    );
};
