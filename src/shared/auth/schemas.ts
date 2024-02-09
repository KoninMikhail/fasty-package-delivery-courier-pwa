import { z } from 'zod';

/**
 * Sign in
 */
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type LoginRequest = z.infer<typeof loginSchema>;

// Reset passwords
export const resetPasswordSchema = z.object({
    email: z.string().email(),
});

export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>;

/**
 * Seesion
 */
export const sessionSchema = z.object({
    token: z.string(),
});

export type Session = z.infer<typeof sessionSchema>;
