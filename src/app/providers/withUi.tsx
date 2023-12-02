import { NextUIProvider } from '@nextui-org/react';
import type React from 'react';

// eslint-disable-next-line react/display-name
export const withUi = (component: () => React.ReactNode) => () => (
    <NextUIProvider>{component()}</NextUIProvider>
);
