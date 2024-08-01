import { Delivery } from "@/shared/api";
import {format, parse} from "date-fns";

export const getDeliveryPickupDateTime = (delivery: Delivery, timeStart: boolean, timeEnd: boolean) => {
    const date = format(new Date(delivery?.date), 'dd.MM.yyyy');

    if (!delivery.time_start && timeStart) console.error('Time start is not defined');
    if (!delivery.time_end && timeEnd) console.error('Time end is not defined');

    const timeStartFormatted = format(new Date(delivery.time_start), 'HH:mm');
    const timeEndFormatted = format(new Date(delivery.time_end), 'HH:mm');

    if (!timeStart && !timeEnd) return date;
    if (timeStart && !timeEnd) return `${date} ${timeStartFormatted}`
    if (!timeStart && timeEnd) return `${date} ${timeEndFormatted}`
    if (timeStart && timeEnd) return `${date} ${timeStartFormatted} - ${timeEndFormatted}`
}