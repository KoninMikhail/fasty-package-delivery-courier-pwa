import { Authorized } from '@/entities/viewer';
import {
    sharedConfigDetectDevice,
    sharedConfigConstants,
} from '@/shared/config';

import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';
import { DesktopSearchPageView, MobileSearchPageView } from './views';
import { translationNS } from '../config';

const { useDeviceScreen } = sharedConfigDetectDevice;
const { APP_NAME } = sharedConfigConstants;

/**
 * @name SearchPage
 * @description Page for deliveries exchange
 * @constructor
 */
export const SearchPage: FunctionComponent = () => {
    const { isDesktop } = useDeviceScreen();
    const { t } = useTranslation(translationNS);

    const pageTitle = `${t('page.title')} | ${APP_NAME}`;

    useDocumentTitle(pageTitle);

    return isDesktop ? (
        <Authorized>
            <DesktopSearchPageView />
        </Authorized>
    ) : (
        <Authorized>
            <MobileSearchPageView />
        </Authorized>
    );
};
