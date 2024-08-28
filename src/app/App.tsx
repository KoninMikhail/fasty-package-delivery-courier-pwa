import type React from 'react';
import {
    DeviceDetector,
    NetworkStateDetector,
    ScreenBlocker,
} from '@/entities/viewer';
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
            <ScreenBlocker />
            <AppRouter />
            <NetworkStateDetector />
            <DeviceDetector />
        </>
    );
};

export default withProviders(App);
