import { z } from 'zod';
import {
    AuthResponseSchema,
    AuthByEmailCredentialsSchema,
    ForgotPasswordSchema,
    TokenSchema,
    RefreshAccessTokenRequestSchema,
    AuthTokensSchema,
} from '../schemas';

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type ResetPasswordRequest = z.infer<typeof ForgotPasswordSchema>;
export type RefreshAccessTokenRequest = z.infer<
    typeof RefreshAccessTokenRequestSchema
>;
export type Token = z.infer<typeof TokenSchema>;
export type AuthTokens = z.infer<typeof AuthTokensSchema>;

/**
 * By Email
 */
export type LoginByEmailCredentials = z.infer<
    typeof AuthByEmailCredentialsSchema
>;
