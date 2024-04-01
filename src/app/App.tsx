import type React from 'react';
import { withProviders } from './providers';
import { AppRouter } from './routes/router';
import './app.css';

/**
 * @name App
 * @constructor
 */
const App = (): React.ReactNode => {
    return <AppRouter />;
};

export default withProviders(App);
