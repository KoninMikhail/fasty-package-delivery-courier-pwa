import { createEffect } from 'effector';
import { apiClient, MyDelivery } from '@/shared/api';
import { ZodError } from 'zod';

export const getMyDeliveriesFx = createEffect<{ limit: number }, MyDelivery[]>(
    async ({ limit }) => {
        try {
            return await apiClient.getMyDeliveries({
                queries: {
                    limit,
                },
            });
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                error.issues.map((issue) => console.error(issue));
                throw new TypeError(
                    `Failed to fetch deliveries: ${error.message}`,
                );
            }
            if (error instanceof Error) {
                throw new TypeError(
                    `Failed to fetch deliveries: ${error.message}`,
                );
            }
        }
    },
);
