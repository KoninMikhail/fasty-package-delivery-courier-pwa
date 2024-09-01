import { sharedConfigConstants } from '@/shared/config';
import { Authorized, deviceModel, sessionModel } from '@/entities/viewer';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';
import { useUnit } from 'effector-react';
import { DesktopSettingsPageView, MobileSettingsPageView } from './views';

import { translationNS } from '../config';

const { APP_NAME, APP_DESCRIPTION } = sharedConfigConstants;

/**
 * @name SettingsPage
 * @description Page for deliveries exchange
 * @constructor
 */
export const SettingsPage: FunctionComponent = () => {
    const { t, i18n } = useTranslation(translationNS);
    const isDesktop = useUnit(deviceModel.$$isDesktop);
    const currentLanguage = i18n.language as keyof typeof APP_DESCRIPTION;

    const heading = t('page.header');

    useDocumentTitle(
        t('page.title', {
            appName: APP_NAME,
            appDescription: APP_DESCRIPTION[currentLanguage],
        }),
    );

    return isDesktop ? (
        <Authorized>
            <DesktopSettingsPageView header={heading} />
        </Authorized>
    ) : (
        <Authorized>
            <MobileSettingsPageView />
        </Authorized>
    );
};
