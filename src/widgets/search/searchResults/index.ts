import './init';
import {
    $isInitialized,
    init,
    initOffline,
    queryChanged,
    setOffline,
} from './model/model';
import { $searchQuery } from './model/stores';

export const widgetSearchResultsModel = {
    $searchQuery,
    queryChanged,
    setOffline,
    init,
    initOffline,
    $isInitialized,
};
export * as widgetSearchDeliveriesUi from './ui';
