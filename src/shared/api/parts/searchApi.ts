import { makeApi } from '@zodios/core';
import { z } from 'zod';

export const searchApi = makeApi([
    {
        method: 'get',
        path: '/',
        alias: 'searchDeliveriesById',
        description: 'Search for a product',
        response: z.any(),
        parameters: [
            {
                name: 'query',
                description: 'Search by delivery number',
                type: 'Query',
                schema: z.string(),
            },
        ],
    },
]);
