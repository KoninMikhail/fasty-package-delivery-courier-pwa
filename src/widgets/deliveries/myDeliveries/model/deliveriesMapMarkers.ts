import { $deliveriesStore } from './deliveriesStore';

export const $$deliveriesMarkers = $deliveriesStore.map((deliveries) => {
    return deliveries.map((delivery) => {
        const lat = delivery?.address?.latitude;
        const lng = delivery?.address?.longitude;
        console.log(lat, lng);
        if (lat && lng) {
            return { lat, lng };
        }
        return null;
    });
});
