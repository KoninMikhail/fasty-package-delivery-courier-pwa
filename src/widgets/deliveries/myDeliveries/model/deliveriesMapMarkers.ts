import { $deliveriesStore } from './deliveriesStore';

export const $$deliveriesMarkers = $deliveriesStore.map((deliveries) => {
    return deliveries.map((delivery) => {
        const lat = delivery?.address?.latitude;
        const lng = delivery?.address?.longitude;
        if (lat && lng) {
            return { lat, lng };
        }
        return null;
    });
});
