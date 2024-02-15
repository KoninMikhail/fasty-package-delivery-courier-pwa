import { z } from 'zod';

export const orderSchema = z.object({
    id: z.number(),
    client_id: z.number(),
    contact_id: z.number(),
    address_id: z.number(),
    description: z.string(),
    cost: z.string(),
    state: z.string(),
    payment: z.string(),
    payment_type: z.string(),
    deleted: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
    submanager: z.null(),
    deadline: z.string(),
});

export type Order = z.infer<typeof orderSchema>;
