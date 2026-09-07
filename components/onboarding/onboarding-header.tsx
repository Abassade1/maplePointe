"use client";

import { Logo } from "@/components/layout/logo";
import { LocaleLink } from "@/components/i18n/locale-link";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useT } from "@/lib/i18n/provider";

export function OnboardingHeader() {
  const t = useT();
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="container flex h-16 items-center justify-between">
        <LocaleLink href="/" className="rounded-md" aria-label={t.common.homeLink}>
          <Logo />
        </LocaleLink>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
