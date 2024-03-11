import { z } from 'zod';

export const addressSchema = z.object({
    id: z.number(),
    address_type: z.string().optional().nullable(),
    client_id: z.number(),
    delivery_type: z.string().nullable(),
    region: z.any(),
    longitude: z.string().nullable(),
    latitude: z.string().nullable(),
    city: z.any(),
    metro: z.string().nullable(),
    address: z.string().nullable().or(z.undefined()),
    point_id: z.any(),
    cdek_type: z.any(),
    default: z.boolean(),
    deleted: z.boolean(),
});
