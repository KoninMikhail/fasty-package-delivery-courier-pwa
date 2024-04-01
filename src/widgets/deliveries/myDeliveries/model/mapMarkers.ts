import { myDeliveriesModel } from '@/entities/delivery';

export const $$deliveriesMarkers = myDeliveriesModel.$myDeliveriesStore.map(
    (deliveries) => {
        return deliveries.map((delivery) => {
            const lat = delivery?.address?.latitude;
            const lng = delivery?.address?.longitude;
            if (lat && lng) {
                return { lat, lng };
            }
            return null;
        });
    },
);
