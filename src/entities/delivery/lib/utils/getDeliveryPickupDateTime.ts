import { Delivery } from "@/shared/api";
import { format } from "date-fns";

export const getDeliveryPickupDateTime = (delivery: Delivery, timeStart: boolean, timeEnd: boolean) => {
    const date = format(new Date(delivery?.date), 'dd.MM.yyyy');

    if (!date) console.error('Date is not defined');
    if (!delivery.time_start && timeStart) console.error('Time start is not defined');
    if (!delivery.time_end && timeEnd) console.error('Time end is not defined');

    if (timeStart && !timeEnd) return `${date} ${delivery.time_start}`
    if (!timeStart && timeEnd) return `${date} ${delivery.time_end}`
    if (timeStart && timeEnd) return `${date} ${delivery.time_start} - ${delivery.time_end}`
}