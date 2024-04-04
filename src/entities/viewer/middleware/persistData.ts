import { persist } from 'effector-storage/local';
import { User, userSchema } from '@/shared/api';
import { $viewerProfileData } from '../model/session';
import {
    SESSION_USER_PROFILE_LOCAL_STORAGE_KEY,
    UPCOMING_DELIVERIES_LOCAL_STORAGE_KEY,
} from '../config';
import { $homeUpcomingDeliveriesCount } from '../model/settings';

persist({
    store: $viewerProfileData,
    key: SESSION_USER_PROFILE_LOCAL_STORAGE_KEY,
    contract: (raw): raw is User => {
        return userSchema.safeParse(raw).success;
    },
});

persist({
    store: $homeUpcomingDeliveriesCount,
    key: UPCOMING_DELIVERIES_LOCAL_STORAGE_KEY,
});
