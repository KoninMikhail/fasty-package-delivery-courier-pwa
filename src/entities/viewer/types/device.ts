import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../../tailwind.config';

const { screens } = resolveConfig(tailwindConfig).theme;

export type ScreenCode = keyof typeof screens;

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export type DeviceInfo = {
    userAgent: UserAgentInfo;
    screen: ScreenInfo;
};

export type UserAgentInfo = {
    browser: {
        name?: string;
        version?: string;
    };
    cpu: {
        architecture?: string;
    };
    device: {
        model?: string;
        type?: string;
        vendor?: string;
    };
    os: {
        name?: string;
        version?: string;
    };
};

export type ScreenInfo = {
    width: number;
    height: number;
    currentScreenSize: Nullable<ScreenCode>;
    assignedToDeviceType: Nullable<DeviceType>;
};
