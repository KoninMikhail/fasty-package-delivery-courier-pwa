import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DeliveryTimer } from '../DeliveryContdownCard';
import * as hooks from '../../../lib/hooks/useEstimatedTime';


beforeEach(() => {
    vi.mock('../../../lib/hooks/useEstimatedTime'); // Update the import path as necessary

    // Setup default mock behavior
    vi.spyOn(hooks, 'useEstimatedTime').mockReturnValue(90); // Default to 90 minutes
});

vi.mock("react-i18next", async () => {
    const originalModule = await vi.importActual<typeof import("react-i18next")>(
      "react-i18next"
    ); // Dynamically import the actual react-i18next module.

    return {
        ...originalModule, // Spread all exports from the original module.
        useTranslation: () => ({
            // Override the useTranslation hook as needed for testing.
            t: (key: string) => {
                if (key === "delivery.chip.expired") return "Expired";
                if (key === "delivery.chip.timeLeft") return "1h 5m";
                return key;
            },
            i18n: {
                changeLanguage: () => new Promise(() => {
                }),
            },
        }),
    };
});

describe('<DeliveryTimer />', () => {
    it('renders expired state', () => {
        vi.spyOn(hooks, 'useEstimatedTime').mockReturnValue(0);
        render(<DeliveryTimer date={new Date()} />);
        expect(screen.getByText(/Expired/i)).toBeInTheDocument();
    });

    it('renders close to expired state', () => {
        vi.spyOn(hooks, 'useEstimatedTime').mockReturnValue(25); // Close to expiry threshold is 30
        render(<DeliveryTimer date={new Date()} />);
        expect(screen.getByText('1h 5m')).toBeInTheDocument();
        expect(screen.getByText('1h 5m').parentNode).toHaveClass('bg-warning');
    });

    it('renders plenty of time left state', () => {
        vi.spyOn(hooks, 'useEstimatedTime').mockReturnValue(90); // Well above 30 minutes
        render(<DeliveryTimer date={new Date()} />);
        const display = screen.getByText('1h 5m');
        expect(display).toBeInTheDocument();
        expect(display.parentNode).toHaveClass('bg-default');
    });
});