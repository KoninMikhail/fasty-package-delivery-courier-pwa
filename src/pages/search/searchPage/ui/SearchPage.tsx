import { Authorized } from '@/entities/viewer';
import {
    sharedConfigDetectDevice,
    sharedConfigConstants,
} from '@/shared/config';

import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';
import { useGate } from 'effector-react';
import { SearchPageGateway } from '@/pages/search/searchPage/model';
import { useSearchParams } from 'react-router-dom';
import { useKeyPress } from '@/shared/lib/browser';
import { translationNS } from '../config';
import { DesktopSearchPageView, MobileSearchPageView } from './views';

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
    const [searchParameters] = useSearchParams();

    const pageTitle = `${t('page.title')} | ${APP_NAME}`;
    const query = searchParameters.get('q') || '';

    useDocumentTitle(pageTitle);
    useGate(SearchPageGateway, {
        query,
    });

    useKeyPress(['Enter'], () => {
        alert('Enter pressed');
    });

    return isDesktop ? (
        <Authorized>
            <DesktopSearchPageView />
        </Authorized>
    ) : (
        <Authorized>
            <MobileSearchPageView query={query} />
        </Authorized>
    );
};
