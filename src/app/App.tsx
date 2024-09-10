import type React from 'react';

import { AppDeviceStateManager } from './device/device';
import { withProviders } from './providers';
import { AppRouter } from './routes/router';
import './app.css';

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
