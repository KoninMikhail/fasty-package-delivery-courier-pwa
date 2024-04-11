import { describe } from "vitest";
import getContentForLocale from "./getContentForLocale";

describe("getContentForLocale", () => {
  it("returns the appropriate content for a given locale.ts", () => {
    const localesList = {
      en: "Hello",
      fr: "Bonjour",
      es: "Hola",
    };
    const content = getContentForLocale("es", localesList);
    expect(content).toBe("Hola");
  });

  it("defaults to English when the requested locale.ts is not available", () => {
    const localesList = {
      en: "Hello",
      fr: "Bonjour",
    };
    const content = getContentForLocale("de", localesList);
    expect(content).toBe("Hello");
  });

  it("returns an empty string when neither the requested locale.ts nor English are available", () => {
    const localesList = {
      fr: "Bonjour",
      es: "Hola",
    };
    const content = getContentForLocale("de", localesList);
    expect(content).toBe("");
  });

  it("returns an empty string when the localesList is empty", () => {
    const localesList: Record<string, string> = {};
    const content = getContentForLocale("en", localesList);
    expect(content).toBe("");
  });

  it("returns the content for English locale.ts when requested specifically", () => {
    const localesList = {
      en: "Hello",
      fr: "Bonjour",
    };
    const content = getContentForLocale("en", localesList);
    expect(content).toBe("Hello");
  });
});
