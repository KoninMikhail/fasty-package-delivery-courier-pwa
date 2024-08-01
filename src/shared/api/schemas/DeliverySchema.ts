import { z } from 'zod';
import { contactSchema } from './ContactSchema';
import { clientSchema } from './ClientSchema';
import { userSchema } from './UserSchema';
import { addressSchema } from './AddressSchema';
import { createPaginationSchema } from './PaginationSchema';

export const deliveryStateSchema = z.union([
    z.literal('created'),
    z.literal('delivering'),
    z.literal('canceled'),
    z.literal('done'),
]);

export const deliverySchema = z.object({
    id: z.string(),
    deliveryId: z.number(),
    car: z.boolean(),
    comment: z.string(),
    contents: z.string(),
    date: z.coerce.date(),
    express: z.boolean(),
    time_end: z.coerce.date(),
    time_start: z.coerce.date(),
    weight: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date().nullish(),
    state: deliveryStateSchema,
    courier: userSchema.nullable(),
    manager: userSchema,
    client: clientSchema,
    contact: contactSchema,
    address: addressSchema,
});

export const deliveryPaginationSchema = createPaginationSchema(deliverySchema);
export const GetAvailableDeliveriesParametersSchema = z.void().or(
    z.object({
        fromDate: z.string(),
        toDate: z.string(),
        car: z.boolean().optional(),
        express: z.boolean().optional(),
        weightFrom: z.number().optional(),
        weightTo: z.number().optional(),
    }),
);

export const PatchDeliveryToCourierParametersSchema = z.object({
    deliveryId: deliverySchema.pick({ id: true }).transform((data) => data.id),
    userId: userSchema.pick({ id: true }).transform((data) => data.id),
});
