import { z } from 'zod';

export const contactSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().optional(),
    job: z.string(),
    active: z.boolean(),
    phone: z.string(),
});

export type Contact = z.infer<typeof contactSchema>;
