import { calculateTimeDifferenceInMinutes } from "../utils/calculateTimeDifferenceInMinutes";
import {useEffect, useState} from "react";

export const useEstimatedTime = (date: Date) => {
    const [estimatedMinutes, setEstimatedMinutes] = useState(() =>
        calculateTimeDifferenceInMinutes(date),
    );
    useEffect(() => {
        const interval = setInterval(() => {
            setEstimatedMinutes((previous) => (previous <= 0 ? 0 : previous - 1));
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return estimatedMinutes;
};