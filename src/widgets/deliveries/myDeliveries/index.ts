import './init';
import { $myDeliveriesStore } from '@/widgets/deliveries/myDeliveries/model/stores';
import {
    init,
    fetchData,
    dataUpdated,
    $isInitialized,
    $isOnline,
    initOffline,
    $errors,
    reset,
} from './model/model';

export const widgetMyDeliveriesModel = {
    init,
    initOffline,
    $myDeliveriesStore,
    fetchData,
    $isOnline,
    reset,
    dataUpdated,
    $isInitialized,
};
export * as widgetMyDeliveriesUi from './ui';
