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

  it('returns "xl" for screen widths within the "xl" breakpoint range', () => {
    expect(calculateCurrentScreenSize(1280)).toBe("xl");
    expect(calculateCurrentScreenSize(1920)).toBe("2xl");
  });
});
