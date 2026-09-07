/** Supported locales. Adding one means adding a dictionary and a content overlay. */
export const LOCALES = ["en", "fr"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

/** Short label for the switcher trigger. */
export const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
};

/** BCP 47 tags for the html lang attribute and Intl formatting. */
export const LOCALE_TAGS: Record<Locale, string> = {
  en: "en-CA",
  fr: "fr-CA",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Strips a leading locale segment from a pathname.
 * "/fr/dashboard/guide" -> "/dashboard/guide"
 */
export function stripLocale(pathname: string): string {
  const segments = pathname.split("/");
  if (segments.length > 1 && isLocale(segments[1])) {
    const rest = "/" + segments.slice(2).join("/");
    return rest === "/" ? "/" : rest.replace(/\/$/, "");
  }
  return pathname;
}

/** Prefixes an app-relative path with a locale: "/dashboard" -> "/fr/dashboard" */
export function withLocale(pathname: string, locale: Locale): string {
  const clean = stripLocale(pathname);
  return clean === "/" ? `/${locale}` : `/${locale}${clean}`;
}
