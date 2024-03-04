import { z } from 'zod';

export const contactSchema = z.object({
    id: z.number(),
    client_id: z.number(),
    name: z.string(),
    email: z.string().optional(),
    job: z.string(),
    default: z.boolean(),
    deleted: z.boolean(),
    phone: z.string(),
});

export type Contact = z.infer<typeof contactSchema>;
