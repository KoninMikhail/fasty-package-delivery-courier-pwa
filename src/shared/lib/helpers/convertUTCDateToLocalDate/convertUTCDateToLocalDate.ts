export default function convertUTCDateToLocalDate(utcDate: Date): Date {
    // Создаем новый объект Date, который будет нашим локальным временем
    const localDate = new Date(utcDate);

    // Получаем разницу в минутах между временем UTC и локальным временем
    const localTimeOffset = localDate.getTimezoneOffset() * 60000;

    // Корректируем локальное время на основе разницы, полученной выше
    const localAdjustedTime = new Date(localDate.getTime() - localTimeOffset);

    return localAdjustedTime;
}