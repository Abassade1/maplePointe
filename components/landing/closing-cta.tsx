"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocaleLink } from "@/components/i18n/locale-link";
import { useT } from "@/lib/i18n/provider";

export function ClosingCta() {
  const t = useT();
  return (
    <section className="bg-navy-600">
      <div className="container flex flex-col items-start gap-8 py-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white">
            {t.landing.cta.title}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-navy-100">{t.landing.cta.body}</p>
        </div>
        <Button asChild size="lg" variant="accent" className="shrink-0">
          <LocaleLink href="/onboarding">
            {t.nav.startAssessment}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </LocaleLink>
        </Button>
      </div>
    </section>
  );
}
