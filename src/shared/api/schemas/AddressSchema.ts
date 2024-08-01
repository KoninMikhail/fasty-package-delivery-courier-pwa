import { z } from 'zod';
import { subwayStationSchema } from './SubwaySchema';

export const addressSchema = z.object({
    id: z.string(),
    address: z.string(),
    longitude: z.string(),
    latitude: z.string(),
    city: z.string(),
    active: z.boolean(),
    subway: subwayStationSchema.nullish(),
});
