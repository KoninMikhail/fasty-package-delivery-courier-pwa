import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useList, useUnit } from 'effector-react';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { Button } from '@nextui-org/react';
import { IoClose } from 'react-icons/io5';
import { sharedConfigRoutes } from '@/shared/config';
import {
    queryAddedToHistory,
    queryItemRemoved,
    searchButtonClicked,
} from '@/widgets/search/searchQueryPopup/model/model';
import { $relatedQueries } from '@/widgets/search/searchQueryPopup/model/stores';
import {
    MAX_RECENT_REQUESTS,
    RELATED_QUERIES,
    translationNS,
} from '../../../config';

const { RouteName } = sharedConfigRoutes;
const { SEARCH_PAGE } = RouteName;

export const RelatedQueries: FunctionComponent<{
    limit?: number;
}> = ({ limit = MAX_RECENT_REQUESTS }) => {
    const { t } = useTranslation(translationNS);
    const navigate = useNavigate();
    const { addQueryToHistory, onStartSearchCloseModal, onDeleteRelatedQuery } =
        useUnit({
            addQueryToHistory: queryAddedToHistory,
            onStartSearchCloseModal: searchButtonClicked,
            onDeleteRelatedQuery: queryItemRemoved,
        });

    const onPressRelatedQuery = (query: string): void => {
        const queryParameters = new URLSearchParams({
            q: query,
        }).toString();

        if (query) {
            addQueryToHistory(query);
            navigate(`${SEARCH_PAGE}?${queryParameters}`);
            onStartSearchCloseModal();
        } else {
            navigate(`${SEARCH_PAGE}`);
            onStartSearchCloseModal();
        }
    };
    const items = useList($relatedQueries, (item, index) => {
        if (index >= limit) return null;

        const onPressItemElement = (): void => {
            onPressRelatedQuery(item);
        };

        const onPressDeleteItemButton = (): void => {
            if (onDeleteRelatedQuery) {
                onDeleteRelatedQuery(item);
            }
        };

        return (
            <div
                className="grid w-full grid-cols-[max-content_auto_max-content] items-center gap-3"
                onClick={onPressItemElement}
            >
                <div className="relative">
                    <FaClockRotateLeft className="text-lg opacity-50" />
                </div>
                <div className="w-full" style={{ cursor: 'pointer' }}>
                    <div className="flex w-full items-center justify-between">
                        <p className="font-bold">{item.toLowerCase()}</p>
                    </div>
                </div>
                <Button
                    isIconOnly
                    variant="light"
                    onPress={onPressDeleteItemButton}
                >
                    <IoClose />
                </Button>
            </div>
        );
    });
    return (
        <>
            <h2 className="py-2">{t(RELATED_QUERIES)}</h2>
            <div className="flex flex-col items-center gap-2">{items}</div>
        </>
    );
};
