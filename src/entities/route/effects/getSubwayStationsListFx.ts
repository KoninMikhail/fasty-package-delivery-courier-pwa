import { createEffect } from 'effector';
import { apiClient, SubwayStation } from '@/shared/api';

export const getSubwayStationsListFx = createEffect<void, SubwayStation[]>({
    handler: async () => {
        return apiClient.fetchSubwayStationsList();
    },
});
