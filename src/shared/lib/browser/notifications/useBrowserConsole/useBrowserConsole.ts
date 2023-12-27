'use client';

import { useEffect } from 'react';

import { isDeveloperMode } from '@/shared/lib/build';

type BrowserConsoleOptions = {
    type?: 'log' | 'warn' | 'error';
    forceProduction?: boolean;
};

/**
 * @name useBrowserConsole
 * Warns to the console if the app is in development mode.
 * @param componentName
 * @param message
 * @param condition
 * @param options
 */

const useBrowserConsole = (
    componentName: string,
    message: unknown,
    condition?: boolean,
    options?: BrowserConsoleOptions
) => {
    const { forceProduction = false, type = 'log' } = options || {};
    const isEnabled = forceProduction || isDeveloperMode();

    useEffect(() => {
        if (isEnabled && condition) {
            // eslint-disable-next-line no-console
            console[type](`[${componentName}]`, message);
        }
    }, [condition, message]);
};

export default useBrowserConsole;
