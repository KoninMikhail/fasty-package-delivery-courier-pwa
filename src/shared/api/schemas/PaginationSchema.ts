import { z } from 'zod';

export const PaginationSchema = z.object({
    page: z.number(),
    limit: z.number().nullish(),
});

export type Pagination = z.infer<typeof PaginationSchema>;
