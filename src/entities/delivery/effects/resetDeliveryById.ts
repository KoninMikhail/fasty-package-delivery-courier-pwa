import { createEffect } from 'effector';
import { apiClient } from '@/shared/api';
import { addDays, format } from 'date-fns';

export const resetDeliveryById = createEffect(async (id: number) => {
    return apiClient.patchDelivery(
        {
            courier_id: null,
            courier: null,
            states: 'created',
            date: format(addDays(new Date(), 12), 'yyyy-MM-dd'),
        },
        {
            params: {
                deliveryId: id,
            },
        },
    );
});
