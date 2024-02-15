import { z } from 'zod';
import { userSchema } from '@/shared/api/schemas/UserSchema';
import { contactSchema } from '@/shared/api/schemas/ContactSchema';
import { addressSchema } from '@/shared/api/schemas/AddressSchema';
import { clientSchema } from '@/shared/api/schemas/ClientSchema';
import { orderSchema } from '@/shared/api/schemas/OrderSchema';

export const deliverySchema = z.object({
    car: z.boolean(),
    client_id: z.number(),
    comment: z.string(),
    contact_id: z.number(),
    contents: z.string(),
    deleted: z.boolean(),
    date: z.string(),
    express: z.boolean(),
    id: z.number(),
    manager_id: z.number(),
    order_id: z.number(),
    states: z.string(),
    time_end: z.string(),
    time_start: z.string(),
    order: orderSchema,
    weight: z.string(),
    courier: userSchema,
    courier_id: z.number(),
    contact: contactSchema,
    client: clientSchema,
    address: addressSchema,
    manager: userSchema,
});

export type Delivery = z.infer<typeof deliverySchema>;
