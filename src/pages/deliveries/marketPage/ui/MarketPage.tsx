import { Authorized } from '@/entities/viewer';
import {
    sharedConfigDetectDevice,
    sharedConfigConstants,
} from '@/shared/config';

import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';
import { useGate } from 'effector-react';
import { DesktopMarketPageView, MobileMarketPageView } from './views';
import { translationNS } from '../config';
import { MarketPageGate } from '../model/model';

const { useDeviceScreen } = sharedConfigDetectDevice;
const { APP_NAME } = sharedConfigConstants;

/**
 * @name MarketPage
 * @description Page for deliveries exchange
 * @constructor
 */
export const MarketPage: FunctionComponent = () => {
    const { isDesktop } = useDeviceScreen();
    const { t } = useTranslation(translationNS);


    const pageTitle = t('page.title', { APP_NAME });

    useDocumentTitle(pageTitle);
    useGate(MarketPageGate);

    return isDesktop ? (
        <Authorized>
            <DesktopMarketPageView />
        </Authorized>
    ) : (
        <Authorized>
            <MobileMarketPageView />
        </Authorized>
    );
};
