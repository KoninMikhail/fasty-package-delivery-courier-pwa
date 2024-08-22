import { useTranslation } from 'react-i18next';
import {
    ACTION_SEARCH,
    translationNS,
} from '@/widgets/search/searchQueryPopup/config';
import { useNavigate } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { useKeyPress } from '@/shared/lib/browser';
import { Button } from '@nextui-org/react';

import { sharedConfigRoutes } from '@/shared/config';
import { $query } from '../../../model/stores';
import { queryAddedToHistory, searchButtonClicked } from '../../../model/model';

const { RouteName } = sharedConfigRoutes;
const { SEARCH_PAGE } = RouteName;

export const PerformSearchButton: FunctionComponent = () => {
    const { t } = useTranslation(translationNS);
    const navigate = useNavigate();

    const { query, addToHistory, onStartSearchCloseModal } = useUnit({
        addToHistory: queryAddedToHistory,
        query: $query,
        onStartSearchCloseModal: searchButtonClicked,
    });

    const onPressSearchButton = (): void => {
        const queryParameters = new URLSearchParams({
            q: query,
        }).toString();

        if (query) {
            addToHistory(query);
            navigate(`${SEARCH_PAGE}?${queryParameters}`);
            onStartSearchCloseModal();
        } else {
            navigate(`${SEARCH_PAGE}`);
            onStartSearchCloseModal();
        }
    };

    useKeyPress(['Enter'], onPressSearchButton);

    return (
        <Button color="primary" onPress={onPressSearchButton}>
            {t(ACTION_SEARCH)}
        </Button>
    );
};
