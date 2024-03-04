import { z } from 'zod';
import { addressSchema } from '../schemas';

export type Address = z.infer<typeof addressSchema>;
