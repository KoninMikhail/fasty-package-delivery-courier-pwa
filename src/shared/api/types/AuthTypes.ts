import { z } from 'zod';
import {
    AuthResponseSchema,
    AuthByEmailCredentialsSchema,
    ForgotPasswordSchema,
} from '../schemas';

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type ResetPasswordRequest = z.infer<typeof ForgotPasswordSchema>;

/**
 * By Email
 */
export type LoginByEmailCredentials = z.infer<
    typeof AuthByEmailCredentialsSchema
>;
