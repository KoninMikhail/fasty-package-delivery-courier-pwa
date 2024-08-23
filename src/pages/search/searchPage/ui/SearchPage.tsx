import { Authorized, sessionModel } from '@/entities/viewer';
import { sharedConfigConstants } from '@/shared/config';

import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';
import { useGate, useUnit } from 'effector-react';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { widgetSearchResultsModel } from '@/widgets/search/searchResults';
import { DesktopSearchPageView, MobileSearchPageView } from './views';
import { translationNS } from '../config';
import { queryChanged, SearchPageGate } from '../model/model';

const { APP_NAME, APP_DESCRIPTION } = sharedConfigConstants;

/**
 * Renders the search page, adapting the layout for mobile or desktop screens.
 * It performs a search based on the query parameters from the URL or user input.
 */
export const SearchPage: FunctionComponent = () => {
    const [isDesktop] = useUnit([sessionModel.$$isDesktop]);
    const { t, i18n } = useTranslation(translationNS);
    const appLanguage = i18n.language as keyof typeof APP_DESCRIPTION;

    // Search
    const [searchParameters] = useSearchParams();
    const urlQuery = searchParameters.get('q') || '';
    const { query, setQuery } = useUnit({
        query: widgetSearchResultsModel.$searchQuery,
        setQuery: queryChanged,
    });

    useEffect(() => {
        setQuery(urlQuery);
    }, [urlQuery, setQuery]);

    useDocumentTitle(
        t('page.title', {
            context: query ? 'search' : 'default',
            query,
            appName: APP_NAME,
            appDescription: APP_DESCRIPTION[appLanguage],
        }),
    );

    useGate(SearchPageGate);

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
