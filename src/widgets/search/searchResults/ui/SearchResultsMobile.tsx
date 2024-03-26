import { useList, useUnit } from 'effector-react';
import {
    $$emptySearchQuery,
    $$searchPending,
    $searchResults,
} from '@/widgets/search/searchResults/model/model';
import { useNetworkInfo } from '@/shared/config/network';
import { Skeleton, Spacer } from '@nextui-org/react';
import { DeliverySearchResultCard } from '@/entities/delivery/ui/DeliverySearchResultCard/DeliverySearchResultCard';
import { RiWifiOffLine } from 'react-icons/ri';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineSentimentDissatisfied } from 'react-icons/md';

const Offline: FunctionComponent = () => {
    return (
        <div className="block p-4 py-8">
            <div className="flex h-56 w-full flex-col items-center justify-center gap-4 pb-24">
                <RiWifiOffLine className="text-8xl text-content3" />
                <div className="text-content3">No internet connection</div>
            </div>
        </div>
    );
};
const LoadingMessage: FunctionComponent = () => {
    return (
        <div className="flex w-full flex-col gap-4">
            <Skeleton className="h-36 w-full rounded-2xl" />
            <Skeleton className="h-36 w-full rounded-2xl" />
            <Skeleton className="h-36 w-full rounded-2xl" />
        </div>
    );
};

const EmptyQuery: FunctionComponent = () => {
    return (
        <div className="mx-auto flex h-[60vh] w-3/4 flex-col items-center justify-center gap-4 text-center text-content3">
            <FiSearch className="text-6xl" />
            <p>Не задан поисковый запрос</p>
        </div>
    );
};

const NotFound: FunctionComponent = () => {
    return (
        <div className="mx-auto flex h-[60vh] w-3/4 flex-col items-center justify-center gap-4 text-center text-content3">
            <MdOutlineSentimentDissatisfied className="text-6xl" />
            <p>Извините, ничего не найдено</p>
        </div>
    );
};

export const SearchResultsMobile: FunctionComponent = () => {
    const { online } = useNetworkInfo();
    const isEmptyQuery = useUnit($$emptySearchQuery);
    const inPending = useUnit($$searchPending);
    const searchResults = useList($searchResults, (item) => {
        return <DeliverySearchResultCard delivery={item} />;
    });

    if (!online) return <Offline />;
    if (isEmptyQuery) return <EmptyQuery />;
    if (inPending) return <LoadingMessage />;
    if (searchResults.length === 0) return <NotFound />;

    return (
        <div className="min-h-64">
            <Spacer y={4} />
            <div className="flex flex-col gap-4">{searchResults}</div>
        </div>
    );
};
