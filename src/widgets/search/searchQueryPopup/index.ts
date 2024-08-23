import './init';
import { $isInitialized, init, searchTriggerClicked } from './model/model';
import { $query } from './model/stores';

export const widgetSearchQueryPopupModel = {
    init,
    $isInitialized,
    $query,
    searchTriggerClicked,
};
export * as widgetSearchQueryPopupUi from './ui';
