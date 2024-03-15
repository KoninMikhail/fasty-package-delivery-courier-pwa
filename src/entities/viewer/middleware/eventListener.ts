import { onRequestFail } from '@/shared/api/middleware';
import { failAuthOnApiRequest } from '../model/sessionModel';

onRequestFail.watch((event) => {
    if (event.response?.status === 401) {
        failAuthOnApiRequest();
    }
});
