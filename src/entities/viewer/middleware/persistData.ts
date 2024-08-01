import { persist } from 'effector-storage/local';
import { User, userSchema } from '@/shared/api';
import { $viewerProfileData, viewerDataReceived } from '../model/session';
import {
    SESSION_USER_PROFILE_LOCAL_STORAGE_KEY,
    UPCOMING_DELIVERIES_LOCAL_STORAGE_KEY,
} from '../config';
import { $homeUpcomingDeliveriesCount } from '../model/settings';
import { revalidateAuthFx } from '../model/effects/revalidateAuthFx';

persist({
    store: $viewerProfileData,
    key: SESSION_USER_PROFILE_LOCAL_STORAGE_KEY,
    contract: (raw): raw is User => userSchema.safeParse(raw).success,
    done: viewerDataReceived,
    fail: revalidateAuthFx,
});

persist({
    store: $homeUpcomingDeliveriesCount,
    contract: (raw): raw is number => typeof raw === 'number',
    key: UPCOMING_DELIVERIES_LOCAL_STORAGE_KEY,
});
