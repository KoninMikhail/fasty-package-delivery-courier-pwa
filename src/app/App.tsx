import type React from 'react';
import {
    DeviceDetector,
    NetworkDetector,
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
            <NetworkDetector />
            <DeviceDetector />
        </>
    );
};

export default withProviders(App);
