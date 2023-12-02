import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import type { PropsWithChildren, ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

export default function renderWithProviders(
    ui: ReactElement,
    includeRouter = true,
): void {
    render(ui, {
        wrapper: ({ children }: PropsWithChildren): ReactElement => (
            <QueryClientProvider client={queryClient}>
                {includeRouter ? (
                    <BrowserRouter>{children}</BrowserRouter>
                ) : (
                    children
                )}
            </QueryClientProvider>
        ),
    });
}
