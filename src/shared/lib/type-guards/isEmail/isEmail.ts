import {z} from 'zod';

const email = z.string().email();

export type Email = z.infer<typeof email & { kind: Email}>;

/**
 * @name isEmail
 * @description Email type guard
 * @param source
 */
export function isEmail(source: string): source is Email {
  return email.safeParse(source).success
}
