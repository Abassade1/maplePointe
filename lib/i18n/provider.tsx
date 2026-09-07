"use client";

import { createContext, useContext, useMemo } from "react";
import type { Locale } from "./config";
import { LOCALE_TAGS } from "./config";
import type { Dictionary } from "./dictionaries/en";

interface I18nValue {
  locale: Locale;
  /** BCP 47 tag, for Intl formatting. */
  tag: string;
  t: Dictionary;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  const value = useMemo(
    () => ({ locale, tag: LOCALE_TAGS[locale], t: dictionary }),
    [locale, dictionary],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider");
  return ctx;
}

/** Shorthand for the common case of only needing the strings. */
export function useT(): Dictionary {
  return useI18n().t;
}

/**
 * Fills {placeholders} in a translated string.
 * interpolate("Step {current} of {total}", { current: 1, total: 4 })
 */
export function interpolate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match,
  );
}
