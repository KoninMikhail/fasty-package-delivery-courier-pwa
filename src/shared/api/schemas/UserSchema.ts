import { z } from 'zod';

export const userRoleSchema = z.enum(['COURIER', 'MANAGER']);

export const userSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    gender: z.string(),
    email: z.string().email(),
    role: userRoleSchema,
    active: z.boolean(),
    createdAt: z.coerce.date().nullish(),
    updatedAt: z.coerce.date().nullish(),
    avatar_src: z.string().nullable(),
    phone: z.string().optional(),
});

export type UserRole = z.infer<typeof userRoleSchema>;
export type User = z.infer<typeof userSchema>;
