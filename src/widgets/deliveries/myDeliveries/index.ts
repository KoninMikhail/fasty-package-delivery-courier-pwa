import './init';
import {
    init,
    fetchData,
    dataUpdated,
    $isInitialized,
    $isOnline,
    initOffline,
    $errors,
} from './model/model';

export const widgetMyDeliveriesModel = {
    init,
    initOffline,
    $errors,
    fetchData,
    $isOnline,
    dataUpdated,
    $isInitialized,
};
export * as widgetMyDeliveriesUi from './ui';
