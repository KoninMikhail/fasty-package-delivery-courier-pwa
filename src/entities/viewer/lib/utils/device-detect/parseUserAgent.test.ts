import { describe, it, expect } from "vitest";
import { parseUserAgent } from "./parseUserAgent"; // Adjust the import path to match your project structure

// Example user agent string for testing
const exampleUserAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36";

describe("parseUserAgent", () => {
  it("should return an object with browser, cpu, device, and os information", () => {
    const result = parseUserAgent(exampleUserAgent);
    expect(result).toHaveProperty("browser");
    expect(result).toHaveProperty("cpu");
    expect(result).toHaveProperty("device");
    expect(result).toHaveProperty("os");
  });

  it("should correctly parse the browser name and version", () => {
    const { browser } = parseUserAgent(exampleUserAgent);
    expect(browser.name).toBe("Chrome");
    expect(browser.version).toMatch(/^\d+(\.\d+)?/); // Check if it's a valid version format
  });

  it("should correctly parse the operating system name and version", () => {
    const { os } = parseUserAgent(exampleUserAgent);
    expect(os.name).toBe("Mac OS");
    expect(os.version).toMatch(/^\d+(\.\d+)+$/); // Check if it's a valid version format
  });

  it("should return an object with undefined properties for an invalid user agent string", () => {
    const invalidUserAgentString = "ThisIsNotAValidUserAgentString";
    const result = parseUserAgent(invalidUserAgentString);
    expect(result).toEqual({
      browser: {
        name: undefined,
        version: undefined,
      },
      cpu: {
        architecture: undefined,
      },
      device: {
        model: undefined,
        type: undefined,
        vendor: undefined,
      },
      os: {
        name: undefined,
        version: undefined,
      },
    });
  });
});
