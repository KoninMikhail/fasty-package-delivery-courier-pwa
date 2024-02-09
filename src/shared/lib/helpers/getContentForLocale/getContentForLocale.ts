export default function getContentForLocale(
  locale: string,
  localesList: Record<string, string>,
): string {
  return localesList[locale] || localesList.en || "";
}
