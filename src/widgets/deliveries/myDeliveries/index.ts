import './init';
import { $myDeliveriesStore } from '@/widgets/deliveries/myDeliveries/model/stores';
import {
    init,
    fetchData,
    dataUpdated,
    $isInitialized,
    reset,
} from './model/model';

export const widgetMyDeliveriesModel = {
    init,
    $myDeliveriesStore,
    fetchData,
    reset,
    dataUpdated,
    $isInitialized,
};
export * as widgetMyDeliveriesUi from './ui';
