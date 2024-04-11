import { z } from 'zod';
import { clientSchema } from '../schemas';

export type Client = z.infer<typeof clientSchema>;
