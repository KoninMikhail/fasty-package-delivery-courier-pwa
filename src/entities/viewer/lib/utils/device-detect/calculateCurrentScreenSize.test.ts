import { describe, it, expect, vi } from "vitest";
import { calculateCurrentScreenSize } from "./calculateCurrentScreenSize";

// Mock tailwind config theme screens
vi.mock("tailwindcss/resolveConfig", () => ({
  __esModule: true,
  default: () => ({
    theme: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1600px",
        "3xl": "1900px",
        "4xl": "2400px",
        "5xl": "3600px",
      },
    },
  }),
}));

describe("calculateCurrentScreenSize", () => {
  it("returns null for a screen width smaller than the smallest breakpoint", () => {
    expect(calculateCurrentScreenSize(639)).toBeNull();
  });

  it('returns "sm" for screen widths within the "sm" breakpoint range', () => {
    expect(calculateCurrentScreenSize(640)).toBe("sm");
    expect(calculateCurrentScreenSize(767)).toBe("sm");
  });

  it('returns "md" for screen widths within the "md" breakpoint range', () => {
    expect(calculateCurrentScreenSize(768)).toBe("md");
    expect(calculateCurrentScreenSize(1023)).toBe("md");
  });

  it('returns "lg" for screen widths within the "lg" breakpoint range', () => {
    expect(calculateCurrentScreenSize(1024)).toBe("lg");
    expect(calculateCurrentScreenSize(1279)).toBe("lg");
  });

  it('returns "xl" for screen widths within the "2xl" breakpoint range', () => {
    expect(calculateCurrentScreenSize(1280)).toBe("xl");
    expect(calculateCurrentScreenSize(1700)).toBe("2xl");
  });
  it('returns "2xl" for screen widths within the "3xl" breakpoint range', () => {
    expect(calculateCurrentScreenSize(1700)).toBe("2xl");
    expect(calculateCurrentScreenSize(1920)).toBe("3xl");
  });
  it('returns "3xl" for screen widths within the "2xl" breakpoint range', () => {
    expect(calculateCurrentScreenSize(1280)).toBe("xl");
    expect(calculateCurrentScreenSize(1920)).toBe("3xl");
  });
  it('returns "4xl" for screen widths within the "3xl" breakpoint range', () => {
    expect(calculateCurrentScreenSize(1920)).toBe("3xl");
    expect(calculateCurrentScreenSize(2450)).toBe("4xl");
  });
  it('returns "5xl" for screen widths within the "4xl" breakpoint range', () => {
    expect(calculateCurrentScreenSize(2450)).toBe("4xl");
    expect(calculateCurrentScreenSize(3750)).toBe("5xl");
  });
});
