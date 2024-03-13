import { Authorized } from '@/entities/viewer';
import {
    sharedConfigConstants,
    sharedConfigDetectDevice,
} from '@/shared/config';

import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';
import { DesktopProfileEditPageView, MobileProfileEditPageView } from './views';
import { translationNS } from '../config';

const { useDeviceScreen } = sharedConfigDetectDevice;
const { APP_NAME } = sharedConfigConstants;

/**
 * @name MarketPage
 * @description Page for deliveries exchange
 * @constructor
 */
export const ProfileEditPage: FunctionComponent = () => {
    const { isDesktop } = useDeviceScreen();
    const { t } = useTranslation(translationNS);

    const pageTitle = `${t('page.title')} | ${APP_NAME}`;

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
