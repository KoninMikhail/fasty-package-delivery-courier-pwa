import { makeApi } from '@zodios/core';
import { z } from 'zod';

export const userSchema = z.object({
    id: z.number(),
    first_name: z.string(),
    last_name: z.string(),
    gender: z.string(),
    email: z.string().email(),
    role: z.string(),
    email_verified_at: z.null().or(z.boolean()),
    deleted: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
    user_role: z.object({
        name: z.string(),
        capabilities: z.array(z.string()),
        states: z.array(z.string()),
    }),
    avatar: z.null(),
});

export type User = z.infer<typeof userSchema>;

export const usersApi = makeApi([
    {
        method: 'get',
        path: '/api/me',
        alias: 'getViewer',
        response: userSchema,
    },
]);
