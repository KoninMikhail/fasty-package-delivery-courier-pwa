import { failAuthOnApiRequest } from '@/entities/viewer/model/sessionModel';
import { onRequestFail } from '@/shared/api/middleware';

onRequestFail.watch((event) => {
    if (event.response?.status === 401) {
        failAuthOnApiRequest();
    }
});
