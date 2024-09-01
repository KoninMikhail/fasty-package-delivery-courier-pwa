import { Authorized, deviceModel, sessionModel } from '@/entities/viewer';
import { sharedConfigConstants } from '@/shared/config';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';
import { useGate, useUnit } from 'effector-react';
import {
    DesktopMyDeliveriesHistoryView,
    MobileMyDeliveriesHistoryView,
} from './views';
import { PAGE_TITLE, translationNS } from '../config';
import { MyDeliveriesHistoryPageGate } from '../model';

const { APP_NAME, APP_DESCRIPTION } = sharedConfigConstants;

/**
 * @name MyDeliveriesPage
 * @description Page for deliveries exchange
 * @constructor
 */
export const MyDeliveriesHistoryPage: FunctionComponent = () => {
    const { isDesktop } = useUnit({
        isDesktop: deviceModel.$$isDesktop,
    });
    const { t, i18n } = useTranslation(translationNS);
    const currentLanguage = i18n.language as keyof typeof APP_DESCRIPTION;
    const heading = t('page.header');

    useDocumentTitle(
        t(PAGE_TITLE, {
            appName: APP_NAME,
            appDescription: APP_DESCRIPTION[currentLanguage],
        }),
    );
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
