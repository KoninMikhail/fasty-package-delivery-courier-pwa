import { z } from 'zod';
import { userSchema } from './UserSchema';

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
 * Session
 */
export const AuthResponseSchema = z.object({
    user: userSchema,
    token: z.string(),
});
