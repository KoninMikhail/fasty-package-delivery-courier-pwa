import { User } from '@/shared/api';
import { IoSearch } from 'react-icons/io5';
import { Divider } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { SearchQueryHistoryItem } from '../types';

const DEFAULT_ITEMS_LIMIT = 10;

interface SearchHistoryItemProperties {
    item: SearchQueryHistoryItem;
    onPressItem?: (query: SearchQueryHistoryItem['query']) => void;
}

export const Query: FunctionComponent<SearchHistoryItemProperties> = ({
    item,
    onPressItem,
}) => {
    const onPressItemElement = (): void => {
        if (onPressItem) onPressItem(item.query);
    };

    return (
        <div
            className="grid w-full grid-cols-[max-content_auto] gap-4"
            onClick={onPressItemElement}
        >
            <div className="relative h-10 w-10 rounded-full bg-content3">
                <IoSearch className="translate-x-1/2 translate-y-1/2 text-xl text-content1-foreground" />
            </div>
            <div className="w-full" style={{ cursor: 'pointer' }}>
                <div className="flex h-10  w-full items-center justify-between">
                    <p className="">{item.query}</p>
                </div>
                <Divider />
            </div>
        </div>
    );
};

interface RelatedQueriesProperties {
    user: Nullable<User>;
    queries: SearchQueryHistoryItem[];
    path: string;
    limit?: number;
}

export const RelatedQueries: FunctionComponent<RelatedQueriesProperties> = ({
    user,
    queries,
    path,
    limit = DEFAULT_ITEMS_LIMIT,
}) => {
    const navigate = useNavigate();
    const onPressItem = (query: string): void => {
        const queryParameters = new URLSearchParams({
            q: query,
        }).toString();
        navigate(`${path}?${queryParameters}`);
    };
    return (
        <div className="flex flex-col items-center gap-2">
            {queries.map((queryItem, index) => {
                if (index >= limit) return null;
                if (user && queryItem.id === user.id) {
                    return (
                        <Query
                            key={queryItem.timestamp}
                            item={queryItem}
                            onPressItem={onPressItem}
                        />
                    );
                }
                return null;
            })}
        </div>
    );
};
