import { describe, it, expect } from "vitest";
import isString from "./isString";

describe("isString", () => {
  it("should return true if the value is a string", () => {
    expect(isString("hello")).toBeTruthy();
    expect(isString("")).toBeTruthy(); // Empty string test case
    expect(isString(String("casted string"))).toBeTruthy(); // Explicitly casted string
  });

  it("should return false if the value is not a string", () => {
    expect(isString(123)).toBeFalsy();
    expect(isString({})).toBeFalsy();
    expect(isString([])).toBeFalsy();
    expect(isString(undefined)).toBeFalsy();
    expect(isString(null)).toBeFalsy();
    expect(isString(() => {})).toBeFalsy();
    expect(isString(Symbol("symbol"))).toBeFalsy();
    expect(isString(true)).toBeFalsy();
    expect(isString(false)).toBeFalsy();
  });
});
