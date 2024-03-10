import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AddressDisplay } from "../DeliveryContdownCard";
import "@testing-library/jest-dom";



vi.mock("react-i18next", async () => {
  const originalModule = await vi.importActual<typeof import("react-i18next")>(
    "react-i18next"
  ); // Dynamically import the actual react-i18next module.

  return {
    ...originalModule, // Spread all exports from the original module.
    useTranslation: () => ({
      // Override the useTranslation hook as needed for testing.
      t: (key: string) => {
        if (key === "delivery.label.address") return "Address";
        if (key === "delivery.label.address.notFound") return "Address Not Found";
        return key;
      },
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }),
  };
});

describe("<AddressDisplay />", () => {
  it("renders the component with an address", () => {
    const address = "123 Main St";
    render(<AddressDisplay address={address} />);
    expect(screen.getByText("Address:")).toBeInTheDocument();
    expect(screen.getByText(address)).toBeInTheDocument();
  });

  it("renders the component without an address", () => {
    render(<AddressDisplay />);
    expect(screen.getByText("Address:")).toBeInTheDocument();
    expect(screen.getByText("Address Not Found")).toBeInTheDocument();
  });

  it("matches snapshot with an address", () => {
    const address = "123 Main St";
    const { container } = render(<AddressDisplay address={address} />);
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot without an address", () => {
    const { container } = render(<AddressDisplay />);
    expect(container).toMatchSnapshot();
  });
});