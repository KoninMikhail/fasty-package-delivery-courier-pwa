import { Authorized, sessionModel } from '@/entities/viewer';
import { sharedConfigConstants } from '@/shared/config';

import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';
import { useUnit } from 'effector-react';
import { DesktopProfileEditPageView, MobileProfileEditPageView } from './views';
import { translationNS } from '../config';

const { APP_NAME, APP_DESCRIPTION } = sharedConfigConstants;

/**
 * @name MarketPage
 * @description Page for deliveries exchange
 * @constructor
 */
export const ProfileEditPage: FunctionComponent = () => {
    const isDesktop = useUnit(sessionModel.$$isDesktop);
    const { t, i18n } = useTranslation(translationNS);
    const currentLanguage = i18n.language as keyof typeof APP_DESCRIPTION;

    const pageTitle = t('page.title', {
        appName: APP_NAME,
        appDescription: APP_DESCRIPTION[currentLanguage],
    });

    useDocumentTitle(pageTitle);

    return isDesktop ? (
        <Authorized>
            <DesktopProfileEditPageView />
        </Authorized>
    ) : (
        <Authorized>
            <MobileProfileEditPageView />
        </Authorized>
    );
};
