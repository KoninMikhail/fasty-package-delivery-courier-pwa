import { z } from 'zod';
import { ZodiosResponseByPath } from '@zodios/core';
import { subwayStationSchema } from '../schemas';
import { subwayApi } from '../parts';

type SubwayApi = typeof subwayApi;

export type SubwayStation = z.infer<typeof subwayStationSchema>;
export type GetSubwayStationsListResponse = ZodiosResponseByPath<
    SubwayApi,
    'get',
    '/'
>;
