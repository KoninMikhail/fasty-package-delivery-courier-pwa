import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type React from 'react';

// eslint-disable-next-line react/display-name
export const withNextThemes = (component: () => React.ReactNode) => () => (
    <NextThemesProvider attribute="class" defaultTheme="light">
        {component()}
    </NextThemesProvider>
);
