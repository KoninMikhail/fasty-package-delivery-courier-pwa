import { z } from 'zod';
import { userSchema } from '@/shared/api/schemas/UserSchema';
import { contactSchema } from '@/shared/api/schemas/ContactSchema';
import { addressSchema } from '@/shared/api/schemas/AddressSchema';
import { clientSchema } from '@/shared/api/schemas/ClientSchema';
import { orderSchema } from '@/shared/api/schemas/OrderSchema';

const timeSchema = z
    .string()
    .regex(
        /^([01]?\d|2[0-3]):[0-5]\d$/,
        'Invalid time format. Time must be in hh:mm format',
    );

export const delveryTypeSchema = z.union([
    z.literal('car'),
    z.literal('foot'),
    z.literal('unknown'),
]);

export const deliverySchema = z.object({
    id: z.number(),
    car: z.boolean(),
    client_id: z.number(),
    comment: z.string(),
    contact_id: z.number(),
    contents: z.string(),
    deleted: z.boolean(),
    date: z.string(),
    express: z.boolean(),
    manager_id: z.number(),
    order_id: z.number().optional(),
    states: z.union([
        z.literal('created'),
        z.literal('delivering'),
        z.literal('canceled'),
        z.literal('done'),
    ]),
    time_end: timeSchema,
    time_start: timeSchema,
    order: orderSchema.optional(),
    weight: z.string(),
    courier: userSchema.nullable(),
    courier_id: z.number().nullable(),
    contact: contactSchema,
    client: clientSchema,
    address: addressSchema,
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    manager: userSchema,
});

export const GetAvailableDeliveriesParametersSchema = z.void().or(
    z.object({
        fromDate: z.string(),
        toDate: z.string(),
    }),
);
export const GetAvailableDeliveriesResponseSchema = z.array(deliverySchema);

export const PatchDeliveryToCourierParametersSchema = z.object({
    deliveryId: deliverySchema.pick({ id: true }).transform((data) => data.id),
    userId: userSchema.pick({ id: true }).transform((data) => data.id),
});
export const PatchDeliveryToCourierResponseSchema = deliverySchema;
