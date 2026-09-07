"use client";

import { ArrowRight, Banknote, ListTodo, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LocaleLink } from "@/components/i18n/locale-link";
import { PageHeader } from "./page-header";
import { OnboardingGuard } from "./onboarding-guard";
import { ReadinessCard } from "./readiness-card";
import { QuickLinks } from "./quick-links";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import {
  useAppStore, computeReadinessScore, selectChecklistProgress, sumFundingMidpoints,
} from "@/store/use-app-store";
import { getLicencesForProvince, getProvince } from "@/lib/mock-data";
import { getRealisticPrograms } from "@/lib/mock-funding";
import { formatCurrency } from "@/lib/utils";
import { useI18n, useT, interpolate } from "@/lib/i18n/provider";
import { localizeCountry, localizeProvince } from "@/lib/i18n/localize";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export function DashboardOverview() {
  const loading = useSimulatedLoading();
  if (loading) return <DashboardSkeleton />;
  return (
    <OnboardingGuard>
      <DashboardContent />
    </OnboardingGuard>
  );
}

function DashboardContent() {
  const t = useT();
  const { locale } = useI18n();
  const company = useAppStore((s) => s.company)!;
  const checklist = useAppStore((s) => s.checklist);

  const readiness = computeReadinessScore(company, checklist);
  const { total, completed } = selectChecklistProgress(checklist);
  const openItems = total - completed;

  const requiredCount = company.targetProvinces
    .flatMap((code) => getLicencesForProvince(code))
    .filter((l) => l.status === "required").length;

  const relevantPrograms = getRealisticPrograms(company.targetProvinces);
  const fundingIdentified = sumFundingMidpoints(relevantPrograms);

  const provinceNames = company.targetProvinces
    .map((c) => localizeProvince(getProvince(c), locale).name)
    .join(", ");

  const nextStep = determineNextStep(t, { checklistCount: total, openItems });

  return (
    <div>
      <PageHeader
        title={interpolate(t.dashboard.welcome, { name: company.name })}
        description={interpolate(t.dashboard.subtitle, {
          country: localizeCountry(company.homeCountry, locale),
          provinces: provinceNames,
        })}
      >
        <Button asChild>
          <LocaleLink href="/dashboard/guide">
            {t.dashboard.openGuide}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </LocaleLink>
        </Button>
      </PageHeader>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <ReadinessCard score={readiness} />

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <ListTodo className="h-4 w-4 text-navy-600" aria-hidden="true" />
              <CardTitle className="text-base">{t.dashboard.openItems}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold tabular-nums text-navy-800">{openItems}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {total === 0
                ? interpolate(t.dashboard.openItemsEmpty, { count: requiredCount })
                : interpolate(t.dashboard.openItemsProgress, { done: completed, total })}
            </p>
            <Button asChild variant="link" className="mt-3 h-auto p-0">
              <LocaleLink href={total === 0 ? "/dashboard/guide" : "/dashboard/checklist"}>
                {total === 0 ? t.dashboard.reviewRequirements : t.dashboard.openChecklist}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </LocaleLink>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Banknote className="h-4 w-4 text-navy-600" aria-hidden="true" />
              <CardTitle className="text-base">{t.dashboard.fundingIdentified}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold tabular-nums text-navy-800">
              {formatCurrency(fundingIdentified, locale)}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {interpolate(t.dashboard.fundingBody, { count: relevantPrograms.length })}
            </p>
            <Button asChild variant="link" className="mt-3 h-auto p-0">
              <LocaleLink href="/dashboard/funding">
                {t.dashboard.viewFunding}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </LocaleLink>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-teal-600" aria-hidden="true" />
              <CardTitle className="text-base">{t.dashboard.nextStep}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-navy-800">{nextStep.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{nextStep.body}</p>
            <Button asChild variant="link" className="mt-3 h-auto p-0">
              <LocaleLink href={nextStep.href}>
                {nextStep.cta}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </LocaleLink>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{t.dashboard.profile.title}</CardTitle>
          <CardDescription>{t.dashboard.profile.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ProfileField
              label={t.dashboard.profile.industry}
              value={
                t.options.industries[company.industry as keyof typeof t.options.industries] ??
                company.industry
              }
            />
            <ProfileField
              label={t.dashboard.profile.size}
              value={interpolate(t.dashboard.profile.sizeValue, { size: company.size })}
            />
            <ProfileField
              label={t.dashboard.profile.homeMarket}
              value={localizeCountry(company.homeCountry, locale)}
            />
            <ProfileField label={t.dashboard.profile.targetProvinces} value={provinceNames} />
          </dl>

          <div className="mt-6 border-t border-slate-100 pt-6">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t.dashboard.profile.whatYouBring}
            </dt>
            <dd className="mt-2 max-w-3xl leading-relaxed text-slate-700">
              {company.productDescription}
            </dd>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t.dashboard.profile.priorities}
            </span>
            {company.goals.map((goal) => (
              <Badge key={goal} variant="secondary">
                {t.options.goals[goal]}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <h2 className="mb-4 mt-10 text-lg font-semibold text-navy-800">
        {t.dashboard.modulesHeading}
      </h2>
      <QuickLinks />
    </div>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1.5 font-medium text-navy-800">{value}</dd>
    </div>
  );
}

function determineNextStep(
  t: Dictionary,
  { checklistCount, openItems }: { checklistCount: number; openItems: number },
) {
  const n = t.dashboard.nextSteps;
  if (checklistCount === 0) {
    return { title: n.reviewTitle, body: n.reviewBody, cta: n.reviewCta, href: "/dashboard/guide" };
  }
  if (openItems === 0) {
    return { title: n.fundingTitle, body: n.fundingBody, cta: n.fundingCta, href: "/dashboard/funding" };
  }
  return {
    title:
      openItems === 1 ? n.workTitleOne : interpolate(n.workTitle, { count: openItems }),
    body: n.workBody,
    cta: n.workCta,
    href: "/dashboard/checklist",
  };
}

function DashboardSkeleton() {
  return (
    <div>
      <Skeleton className="h-9 w-80" />
      <Skeleton className="mt-3 h-5 w-96" />
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-3"><Skeleton className="h-5 w-40" /></CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-24" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Skeleton className="mt-8 h-64 w-full rounded-lg" />
    </div>
  );
}
