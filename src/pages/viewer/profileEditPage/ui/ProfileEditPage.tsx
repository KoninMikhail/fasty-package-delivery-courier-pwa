import { Authorized } from '@/entities/viewer';
import { sharedConfigConstants } from '@/shared/config';

import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';
import { useGate, useUnit } from 'effector-react';
import { DetectDeviceType } from '@/features/device/detecDeviceType';
import { ProfilePageGate } from '@/pages/viewer/profileEditPage/model';
import { DesktopProfileEditPageView, MobileProfileEditPageView } from './views';
import { PAGE_TITLE, translationNS } from '../config';

const { APP_NAME, APP_DESCRIPTION } = sharedConfigConstants;

/**
 * @name MarketPage
 * @description Page for deliveries exchange
 * @constructor
 */
export const ProfileEditPage: FunctionComponent = () => {
    const isDesktop = useUnit(DetectDeviceType.$$isDesktop);
    const { t, i18n } = useTranslation(translationNS);
    const currentLanguage = i18n.language as keyof typeof APP_DESCRIPTION;

    const pageTitle = t(PAGE_TITLE, {
        appName: APP_NAME,
        appDescription: APP_DESCRIPTION[currentLanguage],
    });

    useDocumentTitle(pageTitle);
    useGate(ProfilePageGate);

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
