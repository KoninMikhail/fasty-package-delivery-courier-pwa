import { FiSearch } from 'react-icons/fi';
import { MdOutlineSentimentDissatisfied } from 'react-icons/md';
import { useList, useUnit } from 'effector-react';
import { Skeleton } from '@nextui-org/react';
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { RiWifiOffLine } from 'react-icons/ri';
import {
    translationNS,
    SEARCH_EMPTY_QUERY_KEY,
    SEARCH_RESULTS_KEY,
    SEARCH_NOT_FOUND_KEY,
} from '../config';
import { $searchQuery, $searchResults } from '../model/stores';
import {
    $isEmptyQuery,
    $isEmptyResults,
    $isInitialized,
    $isOnline,
    fetchDeliveriesByQueryModel,
} from '../model/model';

/**
 * Placeholders
 */
const Loading: FunctionComponent = () => {
    return (
        <div className="flex w-full flex-col gap-4">
            <Skeleton className="h-36 w-full rounded-2xl" />
            <Skeleton className="h-36 w-full rounded-2xl" />
            <Skeleton className="h-36 w-full rounded-2xl" />
        </div>
    );
};

const EmptyQuery: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="mx-auto flex h-[60vh] w-3/4 flex-col items-center justify-center gap-4 text-center text-content3">
            <FiSearch className="text-6xl" />
            {t(SEARCH_EMPTY_QUERY_KEY)}
        </div>
    );
};

const NotFound: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    return (
        <div className="mx-auto flex h-[60vh] w-3/4 flex-col items-center justify-center gap-4 text-center text-content3">
            <MdOutlineSentimentDissatisfied className="text-6xl" />
            {t(SEARCH_NOT_FOUND_KEY)}
        </div>
    );
};

/**
 * Components
 */

const DeliverySearchResultCardWide = React.lazy(() =>
    import('@/entities/delivery').then((module) => ({
        default: module.DeliverySearchResultCardWide,
    })),
);

const DeliverySearchResultCard = React.lazy(() =>
    import('@/entities/delivery').then((module) => ({
        default: module.DeliverySearchResultCard,
    })),
);

const OfflineMessage: FunctionComponent = () => {
    return (
        <div className="block p-4 py-16">
            <div className="flex h-56 w-full flex-col items-center justify-center gap-4 pb-24">
                <RiWifiOffLine className="text-8xl text-content3" />
                <div className="text-content3">No internet connection</div>
            </div>
        </div>
    );
};

const SearchResults: FunctionComponent<{ wide?: boolean }> = ({ wide }) => {
    const { t } = useTranslation(translationNS);

    const query = useUnit($searchQuery);
    const results = useList($searchResults, (result) =>
        wide ? (
            <DeliverySearchResultCardWide
                key={result.id}
                delivery={result}
                query={query}
            />
        ) : (
            <DeliverySearchResultCard
                key={result.id}
                delivery={result}
                query={query}
            />
        ),
    );
    return (
        <>
            <div className="font-medium">{t(SEARCH_RESULTS_KEY)}</div>
            <div className="flex flex-col gap-4">{results}</div>
        </>
    );
};

/**
 * View
 */
interface SearchResultsListProperties {
    fullWidth?: boolean;
}

export const SearchResultsList: FunctionComponent<
    SearchResultsListProperties
> = ({ fullWidth }) => {
    const { isInit, isOnline, isLoading, isEmptyResults, isEmptyQuery } =
        useUnit({
            isInit: $isInitialized,
            isOnline: $isOnline,
            isLoading: fetchDeliveriesByQueryModel.$pending,
            isEmptyResults: $isEmptyResults,
            isEmptyQuery: $isEmptyQuery,
        });

    if (!isInit) return <Loading />;
    if (!isOnline) return <OfflineMessage />;
    if (isLoading) return <Loading />;
    if (isEmptyQuery) return <EmptyQuery />;
    if (isEmptyResults) return <NotFound />;

    return (
        <div className="flex h-full flex-col gap-4">
            <Suspense fallback={<Loading />}>
                <SearchResults wide={fullWidth} />
            </Suspense>
        </div>
    );
};
