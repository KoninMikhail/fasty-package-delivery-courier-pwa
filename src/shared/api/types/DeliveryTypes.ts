import { z } from 'zod';
import {
    deliverySchema,
    GetAvailableDeliveriesResponseSchema,
    GetAvailableDeliveriesParametersSchema,
    PatchDeliveryToCourierParametersSchema,
    PatchDeliveryToCourierResponseSchema,
} from '../schemas';

export type Delivery = z.infer<typeof deliverySchema>;

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
