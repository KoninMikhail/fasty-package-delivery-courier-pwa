import './init';
import { $myDeliveriesStore } from '@/widgets/deliveries/myDeliveries/model/stores';
import {
    init,
    fetchData,
    dataUpdated,
    $isInitialized,
    reset,
    setOffline,
    initOffline,
    removeDelivery,
} from './model/model';

export const widgetMyDeliveriesModel = {
    init,
    initOffline,
    setOffline,
    $myDeliveriesStore,
    fetchData,
    removeDelivery,
    reset,
    dataUpdated,
    $isInitialized,
};
export * as widgetMyDeliveriesUi from './ui';
