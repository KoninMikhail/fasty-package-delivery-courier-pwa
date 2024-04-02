import { createEffect } from 'effector';
import { apiClient, Delivery } from '@/shared/api';
import { z } from 'zod';

interface GetDeliveriesHistoryFxParameters {
    from: string;
    to: string;
}

export const getDeliveriesHistoryFx = createEffect<
    GetDeliveriesHistoryFxParameters,
    Delivery[]
>(async (dates) => {
    try {
        console.log('Fetching deliveries history');
        return await apiClient.getDeliveriesHistory({
            queries: { from: dates.from, to: dates.to },
        });
    } catch (error: unknown) {
        console.log('Error fetching deliveries history', error);
        if (error instanceof z.ZodError) {
            // To loop through and manually log each issue
            for (const issue of error.issues) {
                console.log(`${issue.path.join('.')}: ${issue.message}`);
            }
            throw new Error('Zod validation error');
        } else {
            console.error('Unknown error:', error);
            throw new Error('Unknown error');
        }
    }
});
