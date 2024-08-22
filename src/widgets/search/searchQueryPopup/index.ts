import './init';
import { $isInitialized, init, searchTriggerClicked } from './model/model';

export const widgetSearchQueryPopupModel = {
    init,
    $isInitialized,
    searchTriggerClicked,
};
export * as widgetSearchQueryPopupUi from './ui';
