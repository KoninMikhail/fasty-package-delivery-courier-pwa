import { App } from 'app';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

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
