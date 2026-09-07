"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useI18n } from "@/lib/i18n/provider";
import { withLocale } from "@/lib/i18n/config";

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/**
 * next/link that prefixes app-relative hrefs with the active locale, so
 * navigation code can keep writing "/dashboard/guide".
 */
export function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const { locale } = useI18n();
  const localized = href.startsWith("/") ? withLocale(href, locale) : href;
  return <Link href={localized} {...props} />;
}
