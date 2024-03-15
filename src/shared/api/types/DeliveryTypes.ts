import { z } from 'zod';
import {
    deliveryPaginationSchema,
    deliverySchema,
    deliveryTypeSchema,
    GetAvailableDeliveriesParametersSchema,
    GetAvailableDeliveriesResponseSchema,
    PatchDeliveryToCourierParametersSchema,
    PatchDeliveryToCourierResponseSchema,
} from '../schemas';

export type Delivery = z.infer<typeof deliverySchema>;
export type DeliveryType = z.infer<typeof deliveryTypeSchema>;
export type DeliveryPagination = z.infer<typeof deliveryPaginationSchema>;

export type GetAvailableDeliveriesParams = z.infer<
    typeof GetAvailableDeliveriesParametersSchema
>;
export type GetAvailableDeliveriesResponse = z.infer<
    typeof GetAvailableDeliveriesResponseSchema
>;

export type PatchDeliveryToCourierParams = z.infer<
    typeof PatchDeliveryToCourierParametersSchema
>;
export type PatchDeliveryToCourierResponse = z.infer<
    typeof PatchDeliveryToCourierResponseSchema
>;
export type DeliveryStates = Delivery['states'];
