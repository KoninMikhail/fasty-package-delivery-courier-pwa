import { Authorized } from '@/entities/viewer';
import {
    sharedConfigDetectDevice,
    sharedConfigConstants,
} from '@/shared/config';

import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';
import { useUnit } from 'effector-react';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useNetworkInfo } from '@/shared/config/network';
import { widgetSearchQueryPopupModel } from '@/widgets/search/searchQueryPopup';
import { DesktopSearchPageView, MobileSearchPageView } from './views';
import { translationNS } from '../config';
import {
    $searchQuery,
    queryChanged,
    $searchResults,
    $finalSearchState,
} from '../model';

const { useDeviceScreen } = sharedConfigDetectDevice;
const { APP_NAME, APP_DESCRIPTION } = sharedConfigConstants;

/**
 * Renders the search page, adapting the layout for mobile or desktop screens.
 * It performs a search based on the query parameters from the URL or user input.
 */
export const SearchPage: FunctionComponent = () => {
    const { online: isOnline } = useNetworkInfo();
    const { isDesktop } = useDeviceScreen();
    const { t, i18n } = useTranslation(translationNS);
    const appLanguage = i18n.language as keyof typeof APP_DESCRIPTION;

    // Search
    const [searchParameters] = useSearchParams();
    const urlQuery = searchParameters.get('q') || '';
    const [query, setQuery, searchResults] = useUnit([
        $searchQuery,
        queryChanged,
        $searchResults,
    ]);

    const onClickSearchInputMobile = useUnit(
        widgetSearchQueryPopupModel.modal.clickTriggerElement,
    );

    useEffect(() => {
        setQuery(urlQuery);
    }, [urlQuery, setQuery]);

    // Page
    const pageState = useUnit($finalSearchState);
    useDocumentTitle(
        t('page.title', {
            query,
            appName: APP_NAME,
            appDescription: APP_DESCRIPTION[appLanguage],
        }),
    );

    return isDesktop ? (
        <Authorized>
            <DesktopSearchPageView
                query={query}
                pageState={pageState}
                results={searchResults}
                onPressInput={onClickSearchInputMobile}
            />
        </Authorized>
    ) : (
        <Authorized>
            <MobileSearchPageView
                online={isOnline}
                query={query}
                pageState={pageState}
                results={searchResults}
                onPressInput={onClickSearchInputMobile}
            />
        </Authorized>
    );
};
