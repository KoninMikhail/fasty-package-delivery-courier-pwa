import type React from 'react';

import { withProviders } from './providers';
import { AppRouter } from './routes/router';
import './app.css';
import { AppDeviceStateManager } from '@/app/device/device';

/**
 * @name App
 * @constructor
 */
const App = (): React.ReactNode => {
    return (
        <>
            <AppDeviceStateManager />
            <AppRouter />
        </>
    );
};

export default withProviders(App);
