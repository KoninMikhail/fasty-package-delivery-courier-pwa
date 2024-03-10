import { useList } from 'effector-react';
import { $searchResults } from '@/widgets/search/searchResults/model/model';
import { useNetworkInfo } from '@/shared/config/network';
import { Spacer } from '@nextui-org/react';
import { DeliverySearchResultCard } from '@/entities/delivery/ui/DeliverySearchResultCard/DeliverySearchResultCard';

const OfflineMessage = () => {
    return (
        <div>
            <h1>Offline</h1>
        </div>
    );
};

const LoadingMessage = () => {
    return (
        <div>
            <h1>Loading...</h1>
        </div>
    );
};

const NotFound = () => {
    return (
        <div>
            <h1>not found.</h1>
        </div>
    );
};

export const SearchResultsMobile: FunctionComponent = () => {
    const { online } = useNetworkInfo();
    const searchResults = useList($searchResults, (item) => {
        return <DeliverySearchResultCard delivery={item} />;
    });

    if (searchResults.length === 0) {
        return <NotFound />;
    }

    return (
        <div>
            <Spacer y={4} />
            <div className="flex flex-col gap-4">{searchResults}</div>
        </div>
    );
};
