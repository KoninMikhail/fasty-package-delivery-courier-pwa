import { addMinutes, format, parse } from "date-fns";

export const getTimesRange = (timeStart: string, timeEnd: string, stepMins: number): string[] => {
  // Corrected the format from "H-mm" to "H:mm"
  const startDate = parse(timeStart, "H:mm", new Date());
  const endDate = parse(timeEnd, "H:mm", new Date());

  let currentTime = startDate;
  const range: string[] = [];

  while (currentTime < endDate) {
    const nextTime = addMinutes(currentTime, stepMins);
    // Ensure that the period doesn't extend beyond the end time
    if (nextTime > endDate) break;
    const period = `${format(currentTime, "H:mm")}-${format(nextTime, "H:mm")}`;
    range.push(period);
    currentTime = nextTime;
  }

  return range;
};