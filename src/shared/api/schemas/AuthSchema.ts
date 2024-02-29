import { z } from 'zod';

/**
 * Sign in
 */
export const AuthByEmailCredentialsSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

// Reset passwords
export const ForgotPasswordSchema = AuthByEmailCredentialsSchema.pick({
    email: true,
});

/**
 * Seesion
 */
export const AuthResponseSchema = z.object({
    token: z.string(),
});
