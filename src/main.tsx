import { App } from 'app';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import './index.css';

registerSW({
    onOfflineReady: () => console.log('sw_offline_ready'),
    immediate: true,
});

const container = document.querySelector('#root');

if (container instanceof HTMLElement) {
    const root = createRoot(container);
    root.render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
} else {
    // eslint-disable-next-line no-console
    console.error('Failed to find the root element');
}
