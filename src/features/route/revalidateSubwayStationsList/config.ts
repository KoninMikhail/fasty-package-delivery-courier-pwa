import { sharedConfigConstants } from '@/shared/config';

const { APP_NAME } = sharedConfigConstants;

export const SUBWAY_STATIONS_LIST_EXPIRATION = 30; // 30 days
export const SUBWAY_COOKIE_KEY = `${APP_NAME.toLowerCase()}-last-update-subways`;
