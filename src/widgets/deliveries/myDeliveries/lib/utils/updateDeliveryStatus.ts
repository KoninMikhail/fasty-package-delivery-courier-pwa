import { Delivery } from "@/shared/api";

export const updateDeliveryStatus = (
  deliveries: Delivery[],
  updatedDelivery: Delivery,
): Delivery[] => {
  const shouldRemove = ['done', 'canceled'].includes(updatedDelivery.state);

  if (shouldRemove) {
    return deliveries.filter(
      (delivery) => delivery.id !== updatedDelivery.id,
    );
  }

  const index = deliveries.findIndex(
    (delivery) => delivery.id === updatedDelivery.id,
  );
  if (index !== -1) {
    const updatedDeliveries = [...deliveries];
    updatedDeliveries[index] = updatedDelivery;
    return updatedDeliveries;
  }
  return [...deliveries, updatedDelivery];
};