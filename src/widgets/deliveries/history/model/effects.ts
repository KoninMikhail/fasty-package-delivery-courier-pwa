import { createEffect } from 'effector';
import { apiClient, Delivery } from '@/shared/api';
import { z } from 'zod';

interface GetDeliveriesHistoryFxParameters {
    page: Nullable<number>;
    limit: number;
}

export const getDeliveriesHistoryFx = createEffect<
    GetDeliveriesHistoryFxParameters,
    Delivery[]
>(async (queries) => {
    const { page, limit } = queries;
    try {
        return await apiClient.getDeliveriesHistory({
            queries: {
                page,
                limit,
            },
        });
    } catch (error: unknown) {
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
