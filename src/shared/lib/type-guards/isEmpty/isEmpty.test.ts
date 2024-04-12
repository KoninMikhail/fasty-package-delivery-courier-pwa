import { describe, it, expect } from "vitest";
import { isEmpty } from "./isEmpty";

describe("isEmpty function", () => {
  it("should return true for null or undefined", () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  it("should handle strings correctly", () => {
    expect(isEmpty("")).toBe(true);
    expect(isEmpty(" ")).toBe(false); // depends on expected behavior, this could be another case
    expect(isEmpty("hello")).toBe(false);
  });

  it("should handle arrays correctly", () => {
    expect(isEmpty([])).toBe(true);
    expect(isEmpty([""])).toBe(false);
    expect(isEmpty([0])).toBe(false);
  });

  it("should handle objects correctly", () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({ key: "value" })).toBe(false);
  });

  it("should return false for other types", () => {
    expect(isEmpty(0)).toBe(false); // Number type check
    expect(isEmpty(false)).toBe(false); // Boolean type check
  });
});
