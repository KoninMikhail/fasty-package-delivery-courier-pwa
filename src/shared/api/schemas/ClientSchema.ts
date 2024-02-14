import { z } from 'zod';
import { contactSchema } from '@/shared/api/schemas/ContactSchema';
import { addressSchema } from '@/shared/api/schemas/AddressSchema';

export const clientSchema = z.object({
    id: z.number(),
    client_type: z.string(),
    name: z.string(),
    deleted: z.boolean(),
    created_at: z.string().datetime().nullable(),
    updated_at: z.string().datetime().nullable(),
    contacts: z.array(contactSchema),
    addresses: z.array(addressSchema),
});
