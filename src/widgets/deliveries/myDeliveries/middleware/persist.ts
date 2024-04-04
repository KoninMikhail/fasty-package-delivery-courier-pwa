import { persist } from 'effector-storage/local';
import { Delivery } from '@/shared/api';
import { LOCAL_STORAGE_CACHE_KEY } from '@/widgets/deliveries/myDeliveries/config';
import { $deliveriesStore } from '../model/deliveriesStore';

/**
 * Local storage persistence
 */

persist({
    store: $deliveriesStore,
    key: LOCAL_STORAGE_CACHE_KEY,
    contract: (raw): raw is Delivery[] => {
        return Array.isArray(raw) && raw.every((item) => item.id);
    },
});
