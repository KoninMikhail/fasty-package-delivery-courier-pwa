import { z } from 'zod';
import {
    deliveryPaginationSchema,
    deliverySchema,
    GetAvailableDeliveriesParametersSchema,
    GetAvailableDeliveriesResponseSchema,
} from '../schemas';

export type Delivery = z.infer<typeof deliverySchema>;
export type DeliveryPagination = z.infer<typeof deliveryPaginationSchema>;

export type GetAvailableDeliveriesParams = z.infer<
    typeof GetAvailableDeliveriesParametersSchema
>;
export type GetAvailableDeliveriesResponse = z.infer<
    typeof GetAvailableDeliveriesResponseSchema
>;

export type DeliveryStates = Delivery['state'];
