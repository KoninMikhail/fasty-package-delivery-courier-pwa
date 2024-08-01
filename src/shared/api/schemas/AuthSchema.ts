import { z } from 'zod';
import { userSchema } from './UserSchema';

/**
 * Token
 */

export const TokenSchema = z.object({
    token: z.string(),
    expires: z.coerce.date(),
});

export const AuthTokensSchema = z.object({
    access: TokenSchema,
    refresh: TokenSchema,
});

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

export const RefreshAccessTokenRequestSchema = z.object({
    refreshToken: z.string(),
});

/**
 * Session
 */
export const AuthResponseSchema = z.object({
    user: userSchema,
    tokens: z.object({
        access: TokenSchema,
        refresh: TokenSchema,
    }),
});
