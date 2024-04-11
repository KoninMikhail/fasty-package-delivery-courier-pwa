export const generateYandexMapsLink = (query: string): string => {
    const baseUrl = 'https://yandex.ru/maps/?text=';
    return `${baseUrl}${encodeURIComponent(query)}`;
};