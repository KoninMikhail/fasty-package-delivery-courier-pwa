import './init';
import {
    $isInitialized,
    init,
    initOffline,
    queryChanged,
    setOnline,
} from './model/model';
import { $searchQuery } from './model/stores';

export const widgetSearchResultsModel = {
    $searchQuery,
    queryChanged,
    setOnline,
    init,
    initOffline,
    $isInitialized,
};
export * as widgetSearchDeliveriesUi from './ui';
