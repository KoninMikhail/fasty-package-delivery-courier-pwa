import { z } from 'zod';

export const userRoleSchema = z.object({
    name: z.string(),
    capabilities: z.array(z.string()),
    states: z.array(z.string()),
});

export const userSchema = z.object({
    id: z.number(),
    first_name: z.string(),
    last_name: z.string(),
    gender: z.string(),
    email: z.string().email(),
    email_verified_at: z.null().or(z.string().datetime()),
    deleted: z.boolean(),
    created_at: z.string().datetime().nullable(),
    updated_at: z.string().datetime().nullable(),
    user_role: userRoleSchema,
    avatar_src: z.string().nullable(),
});

export type User = z.infer<typeof userSchema>;
