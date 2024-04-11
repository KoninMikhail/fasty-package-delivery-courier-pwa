import {differenceInMinutes, isPast} from "date-fns";

export function calculateTimeDifferenceInMinutes(deadline: Date | string) {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    if (isPast(deadlineDate)) return 0; // Deadline has passed
    return differenceInMinutes(deadlineDate, now);
}