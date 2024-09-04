import type React from 'react';

import { withProviders } from './providers';
import { AppRouter } from './routes/router';
import './app.css';
import { AppDeviceStateDetector } from '@/app/device/device';

/**
 * @name App
 * @constructor
 */
const App = (): React.ReactNode => {
    return (
        <>
            <AppDeviceStateDetector />
            <AppRouter />
        </>
    );
};

export default withProviders(App);
