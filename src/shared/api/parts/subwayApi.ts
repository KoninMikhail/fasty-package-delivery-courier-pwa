import { makeApi } from '@zodios/core';
import { z } from 'zod';
import { subwayStationSchema } from '../schemas/SubwaySchema';

export const subwayApi = makeApi([
    {
        method: 'get',
        path: '/',
        alias: 'fetchSubwayStationsList',
        description: 'Fetch subway stations list',
        response: z.array(subwayStationSchema),
    },
]);
