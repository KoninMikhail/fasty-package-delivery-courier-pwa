import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../../tailwind.config';

const { screens } = resolveConfig(tailwindConfig).theme;

export interface DeviceInfo {
    userAgent: UserAgentInfo | null;
    screen: ScreenInfo | null;
}

export interface UserAgentInfo {
    browser: {
        name: string | undefined;
        version: string | undefined;
    };
    cpu: {
        architecture: string | undefined;
    };
    device: {
        model: string | undefined;
        type: string | undefined;
        vendor: string | undefined;
    };
    os: {
        name: string | undefined;
        version: string | undefined;
    };
}

export interface ScreenInfo {
    width: number;
    height: number;
    currentScreenSize: ScreenCode | null;
    assignedToDeviceType: DeviceType | null;
}

export type ScreenCode = keyof typeof screens;

export type DeviceType = 'mobile' | 'tablet' | 'desktop';
