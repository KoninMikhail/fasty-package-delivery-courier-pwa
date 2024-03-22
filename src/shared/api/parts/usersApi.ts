import { makeApi } from '@zodios/core';
import { z } from 'zod';
import { API_BASE_URL } from '../instance';
import { userSchema } from '../schemas';

export const usersApi = makeApi([
    {
        method: 'get',
        path: '/me',
        alias: 'getMe',
        description: 'Get the current user information',
        response: z.any(),
    },
    {
        method: 'get',
        path: '/:userId',
        alias: 'getUserById',
        description: 'Get a user by its ID',
        response: z.any(),
    },
    {
        method: 'patch',
        path: '/:userId',
        alias: 'patchUserById',
        description: 'Update a user by its ID',
        response: z.any(),
        parameters: [
            {
                name: 'user',
                type: 'Body',
                schema: z.object({
                    password: z.string(),
                }),
            },
        ],
    },
    {
        method: 'put',
        path: '/avatar',
        alias: 'uploadViewerAvatar',
        parameters: [
            {
                name: 'upload',
                type: 'Body',
                schema: z.object({
                    upload: z.string(),
                }),
            },
        ],
        response: userSchema.transform((user) => {
            if (user.avatar_src) {
                return {
                    ...user,
                    avatar_src: `${API_BASE_URL}${user.avatar_src}`,
                };
            }
            return user;
        }),
    },
]);
