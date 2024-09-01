import { Authorized, deviceModel, sessionModel } from '@/entities/viewer';
import { sharedConfigConstants } from '@/shared/config';

import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';
import { useGate, useUnit } from 'effector-react';
import { DesktopMarketPageView, MobileMarketPageView } from './views';
import { PAGE_TITLE, translationNS } from '../config';
import { MarketPageGate } from '../model/model';

const { APP_NAME, APP_DESCRIPTION } = sharedConfigConstants;

/**
 * @name MarketPage
 * @description Page for deliveries exchange
 * @constructor
 */
export const MarketPage: FunctionComponent = () => {
    const isDesktop = useUnit(deviceModel.$$isDesktop);
    const { t, i18n } = useTranslation(translationNS);
    const currentLanguage = i18n.language as keyof typeof APP_DESCRIPTION;

    useDocumentTitle(
        t(PAGE_TITLE, {
            appName: APP_NAME,
            appDescription: APP_DESCRIPTION[currentLanguage],
        }),
    );
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
