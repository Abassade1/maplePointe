"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { LocaleLink } from "@/components/i18n/locale-link";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useT } from "@/lib/i18n/provider";

export function SiteHeader() {
  const t = useT();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <LocaleLink href="/" className="rounded-md" aria-label={t.common.homeLink}>
          <Logo />
        </LocaleLink>

        <nav aria-label={t.nav.primary} className="hidden items-center gap-8 md:flex">
          <a href="#how-it-works" className="rounded text-sm font-medium text-slate-600 transition-colors hover:text-navy-700">
            {t.nav.howItWorks}
          </a>
          <a href="#customers" className="rounded text-sm font-medium text-slate-600 transition-colors hover:text-navy-700">
            {t.nav.customers}
          </a>
          <LocaleLink href="/dashboard" className="rounded text-sm font-medium text-slate-600 transition-colors hover:text-navy-700">
            {t.nav.signIn}
          </LocaleLink>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <LocaleLink href="/onboarding">{t.nav.startAssessment}</LocaleLink>
          </Button>
        </div>
      </div>
    </header>
  );
}
