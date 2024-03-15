import { createEffect } from 'effector';
import { apiClient, Delivery } from '@/shared/api';
import { format, subDays } from 'date-fns';
import { z } from 'zod';

interface GetDeliveriesHistoryFxParameters {
    from: string;
    to: string;
}

export const getDeliveriesHistoryFx = createEffect<
    GetDeliveriesHistoryFxParameters,
    Delivery[]
>({
    name: 'getDeliveriesHistoryFx',
    handler: async (data) => {
        try {
            return await apiClient.getDeliveriesHistory({
                queries: {
                    from: format(subDays(new Date(), 10), 'yyyy-MM-dd'),
                    to: format(new Date(), 'yyyy-MM-dd'),
                },
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                // error.format() provides a detailed report of everything that went wrong
                console.error('Zod validation error:', error.format());

                // To loop through and manually log each issue
                for (const issue of error.issues) {
                    console.log(`${issue.path.join('.')}: ${issue.message}`);
                }
            } else {
                // It's some other error, not a Zod validation error
                console.error('Unknown error:', error);
            }
        }
    },
});
