import { Zodios } from '@zodios/core';

const DELIVERIES_API_BASE_URL = import.meta.env
    .VITE_DELIVERIES_API_BASE_URL as unknown as string;

export const deliveriesApi = new Zodios(DELIVERIES_API_BASE_URL, [
    {
        method: 'get',
        path: '/users/:id', // auto detect :id and ask for it in apiClient get params
        alias: 'getUser', // optional alias to call this endpoint with it
        description: 'Get a user',
        response: z.object({
            id: z.number(),
            name: z.string(),
        }),
    },
]);
