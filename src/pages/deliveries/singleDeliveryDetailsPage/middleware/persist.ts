import { persist } from 'effector-storage/local';
import { Delivery } from '@/shared/api';
import { $myDeliveriesStore } from '../model/parts/deliveriesCache';
import { PAGE_SINGLE_DELIVERY_OFFLINE_STORAGE_KEY } from '../config';

persist({
    store: $myDeliveriesStore,
    key: PAGE_SINGLE_DELIVERY_OFFLINE_STORAGE_KEY,
    contract: (raw): raw is Delivery[] => {
        return Array.isArray(raw) && raw.every((item) => item.id);
    },
});
