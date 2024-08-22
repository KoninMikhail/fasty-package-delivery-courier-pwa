import { FiSearch } from 'react-icons/fi';
import { MdOutlineSentimentDissatisfied } from 'react-icons/md';
import { useList, useUnit } from 'effector-react';
import { Skeleton, Spacer } from '@nextui-org/react';
import React, { Suspense } from 'react';
import {
    $currentQuery,
    $isEmptyQuery,
    $isEmptyResults,
    $isLoading,
} from '@/widgets/deliveries/searchDeliveries/model/model';
import { useTranslation } from 'react-i18next';
import {
    translationNS,
    SEARCH_EMPTY_QUERY_KEY,
    SEARCH_RESULTS_KEY,
    SEARCH_NOT_FOUND_KEY,
} from '../config';
import { $searchResults } from '../model/stores';

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

const SearchResults: FunctionComponent<{ wide?: boolean }> = ({ wide }) => {
    const { t } = useTranslation();

    const query = useUnit($currentQuery);
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
            <Spacer y={4} />
            <div className="flex flex-col gap-4">{results}</div>
        </>
    );
};

/**
 * View
 */
interface SearchDeliveriesByQueryResultsProperties {
    fullWidth?: boolean;
}

export const SearchDeliveriesByQueryResults: FunctionComponent<
    SearchDeliveriesByQueryResultsProperties
> = ({ fullWidth }) => {
    const { isEmptyResults, isEmptyQuery, isLoading } = useUnit({
        isEmptyResults: $isEmptyResults,
        isEmptyQuery: $isEmptyQuery,
        isLoading: $isLoading,
    });

    if (isLoading) return <Loading />;
    if (isEmptyResults) return <NotFound />;
    if (isEmptyQuery && isEmptyResults) return <EmptyQuery />;

    return (
        <div className="flex h-full flex-col gap-4">
            <Suspense fallback={<Loading />}>
                <SearchResults wide={fullWidth} />
            </Suspense>
        </div>
    );
};
