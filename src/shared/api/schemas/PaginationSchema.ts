import { z, ZodSchema } from 'zod';

const linkSchema = z.object({
    url: z.string().nullable(),
    label: z.string(),
    active: z.boolean(),
});

// Function to generate a schema with a generic `data` field
export function createPaginationSchema<T>(
    dataSchema: z.ZodType<T, z.ZodTypeDef, any>,
): ZodSchema {
    return z.object({
        current_page: z.number(),
        data: z.array(dataSchema),
        first_page_url: z.string(),
        from: z.number(),
        last_page: z.number(),
        last_page_url: z.string(),
        links: z.array(linkSchema),
        next_page_url: z.string().nullable(),
        path: z.string(),
        per_page: z.number(),
        prev_page_url: z.string().nullable(),
        to: z.number().nullable(),
        total: z.number(),
    });
}
