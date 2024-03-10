export const getDeliveryAdress = (delivery: Delivery) => {
  return delivery.address || DEFAULT_STATION_PLACEHOLDER;
}