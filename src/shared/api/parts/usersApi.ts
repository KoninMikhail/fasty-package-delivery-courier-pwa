import { makeApi } from '@zodios/core';
import { z } from 'zod';
import { userSchema } from '../schemas';
import { transformPathToUrl } from '../uilts/transformPathToUrl';

export const usersApi = makeApi([
    {
        method: 'get',
        path: '/:userId',
        alias: 'getUserById',
        description: 'Get a user by its ID',
        response: userSchema.transform((user) => {
            const avatarUrl = user.avatar_src;
            if (avatarUrl)
                return {
                    ...user,
                    avatar_src: transformPathToUrl(avatarUrl),
                };
            return user;
        }),
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
        response: userSchema.transform((user) => {
            const avatarUrl = user.avatar_src;
            if (avatarUrl)
                return {
                    ...user,
                    avatar_src: transformPathToUrl(avatarUrl),
                };
            return user;
        }),
    },
    {
        method: 'get',
        path: '/me/profileData',
        alias: 'getMe',
        description: 'Get the current user information',
        response: userSchema.transform((user) => {
            const avatarUrl = user.avatar_src;
            if (avatarUrl)
                return {
                    ...user,
                    avatar_src: transformPathToUrl(avatarUrl),
                };
            return user;
        }),
    },
]);
