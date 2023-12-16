import UAParser from 'ua-parser-js';
import { UserAgentInfo } from '../types';

export const parseUserAgent = (userAgentString: string): UserAgentInfo => {
    const parser = new UAParser(userAgentString); // Создаем экземпляр UAParser
    const browser = parser.getBrowser(); // Получаем информацию о браузере
    const cpu = parser.getCPU(); // Получаем информацию о CPU
    const device = parser.getDevice(); // Получаем информацию об устройстве
    const os = parser.getOS(); // Получаем информацию о ОС

    // Возвращаем объект с необходимой информацией
    return {
        browser: {
            name: browser.name,
            version: browser.version,
        },
        cpu: {
            architecture: cpu.architecture,
        },
        device: {
            model: device.model,
            type: device.type,
            vendor: device.vendor,
        },
        os: {
            name: os.name,
            version: os.version,
        },
    };
};
