import { makeApi } from '@zodios/core';
import { z } from 'zod';
import { ForgotPasswordSchema } from '../schemas';

export const forgotPasswordApi = makeApi([
    {
        method: 'post',
        path: '/',
        alias: 'forgotPassword',
        description: 'Send a password reset email',
        parameters: [
            {
                name: 'body',
                type: 'Body',
                schema: ForgotPasswordSchema,
            },
        ],
        response: z.any(),
    },
]);
