import { z } from 'zod';

export const UserSchema = z.object({
    id: z.number(),
    type_of: z.string(),
    name: z.string(),
    username: z.string(),
    summary: z.string().or(z.null()),
    twitter_username: z.string().or(z.null()),
    github_username: z.string().or(z.null()),
    website_url: z.string().or(z.null()),
    location: z.string().or(z.null()),
    joined_at: z.string(),
    profile_image: z.string(),
    profile_image_90: z.string(),
});

export type User = z.infer<typeof UserSchema>;
