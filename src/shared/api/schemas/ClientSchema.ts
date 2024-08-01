import { z } from 'zod';

export const clientTypeSchema = z.union([
    z.literal('organization'),
    z.literal('personal'),
]);

export const clientSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: clientTypeSchema,
    active: z.boolean(),
});
