// eslint-disable-next-line unicorn/prevent-abbreviations
const getEnvironmentVariable = (key: string): string => {
    if (import.meta.env[key] === undefined) {
        throw new Error(`Env variable ${key} is required`);
    }
    return (import.meta.env[key] || '') as string;
};

export const NODE_ENV = getEnvironmentVariable('MODE');
export const isDevelopmentEnvironment = NODE_ENV === 'development';
export const isPreviewEnvironment = NODE_ENV === 'preview';
export const isProductionEnvironment = NODE_ENV === 'production';
