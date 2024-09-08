import './init';
import {
    $isInitialized,
    init,
    initOffline,
    searchTriggerClicked,
} from './model/model';
import { $query } from './model/stores';

export const widgetSearchQueryPopupModel = {
    init,
    initOffline,
    $isInitialized,
    $query,
    searchTriggerClicked,
};
export * as widgetSearchQueryPopupUi from './ui';
