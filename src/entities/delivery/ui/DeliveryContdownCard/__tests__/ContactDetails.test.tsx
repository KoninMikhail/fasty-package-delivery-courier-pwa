import { render, screen } from '@testing-library/react';
import { ContactDetails } from '../DeliveryContdownCard';
import { vi } from 'vitest';

// Mocking react-i18next
vi.mock("react-i18next", async () => {
  const originalModule = await vi.importActual<typeof import("react-i18next")>(
    "react-i18next"
  ); // Dynamically import the actual react-i18next module.

  return {
    ...originalModule, // Spread all exports from the original module.
    useTranslation: () => ({
      // Override the useTranslation hook as needed for testing.
      t: (key: string) => {
        if (key === "delivery.client.name.notFound") return "Client not found";
        return key;
      },
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }),
  };
});

// Assuming you have already mocked `IoCall` in a similar fashion if necessary

describe('ContactDetails Component', () => {

  it('renders correctly with name and phone', () => {
    render(<ContactDetails name="John Doe" phone="123-456-7890" />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(screen.getByRole('link', {name: ''})).toHaveAttribute('href', 'tel:1234567890');
  });

  it('renders missing contact info message when name and phone are not provided', () => {
    // Using the translated string directly, as it's now defined in our mock
    render(<ContactDetails />);
    expect(screen.getByText("Client not found")).toBeInTheDocument();
  });

  it('calls the correct phone number when click on call button', () => {
    render(<ContactDetails name="Jane Doe" phone="098-765-4321" />);
    const callButton = screen.getByRole('link');
    expect(callButton).toHaveAttribute('href', 'tel:0987654321');
  });
});