import { sharedConfigConstants } from '@/shared/config';

const { APP_NAME } = sharedConfigConstants;

export const SESSION_USER_PROFILE_LOCAL_STORAGE_KEY = `${APP_NAME.toUpperCase()}_SETTINGS_SESSION_USER_PROFILE`;
export const UPCOMING_DELIVERIES_LOCAL_STORAGE_KEY = `${APP_NAME.toUpperCase()}_SETTINGS_HOME_UPCOMING_DELIVERIES_COUNT`;
