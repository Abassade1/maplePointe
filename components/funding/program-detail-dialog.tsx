"use client";

import { AlertTriangle, Check, Info } from "lucide-react";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LocaleLink } from "@/components/i18n/locale-link";
import { CompetitivenessBadge, FundingTypeBadge } from "./funding-badges";
import { useAppStore } from "@/store/use-app-store";
import { getProvince } from "@/lib/mock-data";
import { formatAmountRange } from "@/lib/utils";
import { useI18n, useT } from "@/lib/i18n/provider";
import { localizeProgram, localizeProvince } from "@/lib/i18n/localize";
import type { FundingProgram } from "@/lib/types";

export function ProgramDetailDialog({ program: raw }: { program: FundingProgram }) {
  const t = useT();
  const { locale } = useI18n();
  const program = localizeProgram(raw, locale);
  const checklist = useAppStore((s) => s.checklist);

  // Cross-module link: most programmes need a Canadian entity, which is the
  // registration item the user tracks in the Module 1 checklist.
  const registrationTracked = checklist.some(
    (i) => i.completed && i.licenceId.includes("extra-provincial"),
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex-1">{t.funding.viewDetails}</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{program.name}</DialogTitle>
          <DialogDescription>
            {program.provider} ·{" "}
            {program.level === "federal"
              ? t.funding.federal
              : localizeProvince(getProvince(program.province!), locale).name}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <FundingTypeBadge type={program.type} />
          <CompetitivenessBadge level={program.competitiveness} />
        </div>

        <p className="mt-5 leading-relaxed text-slate-700">{program.description}</p>

        <dl className="mt-6 grid gap-4 border-y border-slate-100 py-5 sm:grid-cols-3">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t.funding.fundingRange}
            </dt>
            <dd className="mt-1.5 font-medium tabular-nums text-navy-800">
              {formatAmountRange(program.minAmount, program.maxAmount, locale)}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t.funding.intake}
            </dt>
            <dd className="mt-1.5 text-sm text-slate-800">{program.applicationWindow}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t.funding.decisionTime}
            </dt>
            <dd className="mt-1.5 text-sm text-slate-800">{program.typicalDecisionTime}</dd>
          </div>
        </dl>

        <section aria-labelledby={`eligibility-${raw.id}`} className="mt-6">
          <h3 id={`eligibility-${raw.id}`} className="text-sm font-semibold text-navy-800">
            {t.funding.eligibility}
          </h3>
          <ul className="mt-3 space-y-2.5">
            {program.eligibility.map((criterion) => (
              <li key={criterion} className="flex gap-2.5 text-sm leading-relaxed text-slate-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" strokeWidth={2.5} aria-hidden="true" />
                {criterion}
              </li>
            ))}
          </ul>
        </section>

        {program.requiresCanadianEntity && (
          <div
            className={`mt-6 flex gap-3 rounded-lg border p-4 ${
              registrationTracked ? "border-teal-200 bg-teal-50" : "border-amber-200 bg-amber-50"
            }`}
          >
            {registrationTracked ? (
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />
            ) : (
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
            )}
            <div className="text-sm leading-relaxed">
              {registrationTracked ? (
                <p className="text-teal-900">{t.funding.entityRequiredOk}</p>
              ) : (
                <>
                  <p className="text-amber-900">{t.funding.entityRequiredWarning}</p>
                  <Button asChild variant="link" className="mt-1 h-auto p-0 text-amber-900">
                    <LocaleLink href="/dashboard/guide">{t.funding.openGuideLink}</LocaleLink>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}

        <p className="mt-6 flex gap-2 text-xs leading-relaxed text-slate-500">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {t.funding.detailDisclaimer}
        </p>
      </DialogContent>
    </Dialog>
  );
}
