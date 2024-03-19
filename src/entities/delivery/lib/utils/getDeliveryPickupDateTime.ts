import { Delivery } from "@/shared/api";
import {format, parse} from "date-fns";

export const getDeliveryPickupDateTime = (delivery: Delivery, timeStart: boolean, timeEnd: boolean) => {
    const date = format(new Date(delivery?.date), 'dd.MM.yyyy');

    if (!delivery.time_start && timeStart) console.error('Time start is not defined');
    if (!delivery.time_end && timeEnd) console.error('Time end is not defined');

    const timeStartFormatted = delivery?.time_start.slice(0, -3);
    const timeEndFormatted = delivery.time_end.slice(0, -3);

    if (timeStart && !timeEnd) return `${date} ${timeStartFormatted}`
    if (!timeStart && timeEnd) return `${date} ${timeEndFormatted}`
    if (timeStart && timeEnd) return `${date} ${timeStartFormatted} - ${timeEndFormatted}`
}