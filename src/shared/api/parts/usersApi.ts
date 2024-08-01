import { makeApi } from '@zodios/core';
import { z } from 'zod';
import { userSchema } from '../schemas';

export const usersApi = makeApi([
    {
        method: 'get',
        path: '/:userId',
        alias: 'getUserById',
        description: 'Get a user by its ID',
        response: userSchema,
    },
    {
        method: 'post',
        path: '/me/uploadAvatar',
        alias: 'uploadViewerAvatar',
        parameters: [
            {
                name: 'upload',
                type: 'Body',
                schema: z.any(),
            },
        ],
        response: userSchema,
    },
]);
