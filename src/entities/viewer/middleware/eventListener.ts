import { onRequestFail } from '@/shared/api/middleware';
import { sharedLibErrors } from '@/shared/lib';
import { requestViewerLogout } from '@/entities/viewer/model/session';

const { ErrorCodes } = sharedLibErrors;

onRequestFail.watch((event) => {
    if (event.response?.status === ErrorCodes.UNAUTHORIZED) {
        requestViewerLogout();
    }
});
