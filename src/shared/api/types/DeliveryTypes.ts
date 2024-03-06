import { z } from 'zod';
import { deliverySchema } from '../schemas';

export type Delivery = z.infer<typeof deliverySchema>;
export type DeliveryStates = Delivery['states'];
