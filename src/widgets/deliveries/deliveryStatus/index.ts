import './init';
import { deliveryChanged, loadDelivery, reset } from './model/model';

export const widgetDeliveryStatusModel = {
    loadDelivery,
    deliveryChanged,
    reset,
};
export * as widgetDeliveryStatusUi from './ui';
