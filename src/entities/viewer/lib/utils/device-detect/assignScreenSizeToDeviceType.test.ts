import { describe, it, expect } from "vitest";
import { assignScreenSizeToDeviceType } from "./assignScreenSizeToDeviceType";
import { ScreenCode } from "../../../types/device";

describe("assignScreenSizeToDeviceType", () => {
  it("returns `tablet` for tablet screen codes", () => {
    expect(assignScreenSizeToDeviceType("sm")).toBe("tablet");
    expect(assignScreenSizeToDeviceType("md")).toBe("tablet");
    expect(assignScreenSizeToDeviceType("lg")).toBe("tablet");
  });

  it("returns `desktop` for desktop screen codes", () => {
    expect(assignScreenSizeToDeviceType("xl")).toBe("desktop");
    expect(assignScreenSizeToDeviceType("2xl")).toBe("desktop");
  });

  it("returns `mobile` by default for empty string", () => {
    expect(assignScreenSizeToDeviceType("" as ScreenCode)).toBe("mobile");
  });

  it("returns `mobile` for null or undefined screen codes", () => {
    expect(assignScreenSizeToDeviceType(null)).toBe("mobile");
    expect(
      assignScreenSizeToDeviceType(undefined as unknown as ScreenCode),
    ).toBe("mobile");
  });
});
