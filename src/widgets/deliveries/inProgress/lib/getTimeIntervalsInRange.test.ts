function getTimeIntervalsInRange(
    timeStart: string,
    timeEnd: string,
    itemLength: number,
): string[] {
    // Функция перевода времени из строки в минуты
    const timeToMinutes = (time: string): number => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };

    // Функция перевода времени из минут обратно в строковый формат hh:mm
    const minutesToTime = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    };

    const intervals: string[] = [];
    let startMinutes = timeToMinutes(timeStart);
    const endMinutes = timeToMinutes(timeEnd);

    // Генерация временных промежутков
    while (startMinutes + itemLength <= endMinutes) {
        const endInterval = startMinutes + itemLength;
        intervals.push(
            `${minutesToTime(startMinutes)} - ${minutesToTime(endInterval)}`,
        );
        startMinutes += itemLength;
    }

    return intervals;
}

export { getTimeIntervalsInRange };