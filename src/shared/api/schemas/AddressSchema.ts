import { z } from 'zod';

export const addressSchema = z.object({
    id: z.number(),
    client_id: z.number(),
    delivery_type: z.string(),
    region: z.any(),
    city: z.any(),
    metro: z.string().nullable(),
    address: z.any(),
    point_id: z.any(),
    cdek_type: z.any(),
    default: z.boolean(),
    deleted: z.boolean(),
});

export type Address = z.infer<typeof addressSchema>;
