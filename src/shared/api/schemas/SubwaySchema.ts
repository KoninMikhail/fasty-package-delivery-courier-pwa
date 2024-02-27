import { z } from 'zod';

export const subwayStationSchema = z.object({
    id: z.string(),
    line_id: z.string(),
    line_name: z.string(),
    line_color: z.string(),
    name: z.string(),
});
