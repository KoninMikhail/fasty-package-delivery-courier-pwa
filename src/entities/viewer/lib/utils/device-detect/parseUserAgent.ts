import UAParser from 'ua-parser-js';
import { UserAgentInfo } from '../../../model/parts/deviceInfo';

/** Parses the user agent string to extract detailed information.
 * @param {string} userAgentString - The raw user agent string from the browser or client.
 * @returns {UserAgentInfo} An object containing categorized information about the user agent.
 */
export const parseUserAgent = (userAgentString: string): UserAgentInfo => {
    const parser = new UAParser(userAgentString); // Create an instance of UAParser
    const browser = parser.getBrowser(); // Retrieve information about the browser
    const cpu = parser.getCPU(); // Retrieve information about the CPU
    const device = parser.getDevice(); // Retrieve information about the device
    const os = parser.getOS(); // Retrieve information about the OS

    // Return an object with the relevant information
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
