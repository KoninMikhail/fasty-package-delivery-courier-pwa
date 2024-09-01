import { SubwayStation } from "@/shared/api";

export const findSubwayLineByName = (
  haystack: SubwayStation[],
  needle: string,
  lax = false
) => {
  const [searchLine, searchTerm = ""] = needle.includes(":")
    ? needle.split(":")
    : [null, needle];

  return haystack.find((item) =>
    // eslint-disable-next-line no-nested-ternary
    searchLine
      ? item.line_id === searchLine &&
      (lax
        ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
        : item.name.toLowerCase() === searchTerm.toLowerCase())
      : lax
        ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
        : item.name.toLowerCase() === searchTerm.toLowerCase()
  );
};
