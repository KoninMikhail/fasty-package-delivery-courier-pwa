import { onRequestFail } from '@/shared/api/middleware';
import httpStatus from 'http-status';
import { refreshAuthTokensFx } from '../model/effects';

onRequestFail.watch((event) => {
    if (event.response?.status === httpStatus.UNAUTHORIZED) {
        void refreshAuthTokensFx();
    }
});
