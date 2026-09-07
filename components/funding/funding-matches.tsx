"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Banknote, SearchX, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LocaleLink } from "@/components/i18n/locale-link";
import { PageHeader } from "@/components/dashboard/page-header";
import { OnboardingGuard } from "@/components/dashboard/onboarding-guard";
import { ProgramCard } from "./program-card";
import { FundingFilters } from "./funding-filters";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { useAppStore, sumFundingMidpoints } from "@/store/use-app-store";
import { REALISTIC_MATCH_THRESHOLD, getRelevantPrograms } from "@/lib/mock-funding";
import { formatCurrency } from "@/lib/utils";
import { useI18n, useT, interpolate } from "@/lib/i18n/provider";
import type { FundingType } from "@/lib/types";

export type LevelFilter = "all" | "federal" | "provincial";
export type TypeFilter = FundingType | "all";

export function FundingMatches() {
  const loading = useSimulatedLoading();
  if (loading) return <FundingSkeleton />;
  return (
    <OnboardingGuard>
      <MatchesContent />
    </OnboardingGuard>
  );
}

function MatchesContent() {
  const t = useT();
  const { locale } = useI18n();
  const company = useAppStore((s) => s.company)!;
  const applications = useAppStore((s) => s.fundingApplications);

  const [level, setLevel] = useState<LevelFilter>("all");
  const [type, setType] = useState<TypeFilter>("all");

  const relevant = useMemo(
    () => getRelevantPrograms(company.targetProvinces),
    [company.targetProvinces],
  );

  const filtered = useMemo(
    () =>
      relevant.filter(
        (p) => (level === "all" || p.level === level) && (type === "all" || p.type === type),
      ),
    [relevant, level, type],
  );

  // Headline excludes programmes this profile does not realistically reach.
  const realistic = relevant.filter((p) => p.matchScore >= REALISTIC_MATCH_THRESHOLD);
  const totalIdentified = sumFundingMidpoints(realistic);
  const strongMatches = relevant.filter((p) => p.matchScore >= 75).length;
  const filtersActive = level !== "all" || type !== "all";

  function reset() {
    setLevel("all");
    setType("all");
  }

  return (
    <div>
      <PageHeader
        title={t.funding.title}
        description={interpolate(t.funding.subtitle, { name: company.name })}
      >
        <Button asChild variant="outline">
          <LocaleLink href="/dashboard/funding/pipeline">
            {t.funding.viewPipeline}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </LocaleLink>
        </Button>
      </PageHeader>

      <div className="grid gap-5 sm:grid-cols-3">
        <SummaryCard
          icon={Banknote}
          label={t.funding.identified}
          value={formatCurrency(totalIdentified, locale)}
          body={interpolate(t.funding.identifiedBody, { count: realistic.length })}
        />
        <SummaryCard
          icon={Target}
          label={t.funding.strongMatches}
          value={String(strongMatches)}
          body={interpolate(t.funding.strongMatchesBody, { total: relevant.length })}
        />
        <SummaryCard
          icon={Sparkles}
          label={t.funding.inPipeline}
          value={String(applications.length)}
          body={applications.length === 0 ? t.funding.inPipelineEmpty : t.funding.inPipelineBody}
        />
      </div>

      <div className="mt-8">
        <FundingFilters
          level={level}
          type={type}
          onLevelChange={setLevel}
          onTypeChange={setType}
          onReset={reset}
          showReset={filtersActive}
        />
      </div>

      <p className="mt-4 text-sm text-slate-600" aria-live="polite">
        {interpolate(t.common.showingOf, {
          shown: filtered.length,
          total: relevant.length,
          noun: t.funding.noun,
        })}
        {filtersActive ? t.common.matchingFilters : ""}.
      </p>

      {filtered.length === 0 ? (
        <Card className="mt-4">
          <CardContent className="flex flex-col items-center px-6 py-16 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <SearchX className="h-6 w-6 text-slate-400" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-lg font-semibold text-navy-800">{t.funding.empty.title}</h2>
            <p className="mt-2 max-w-md leading-relaxed text-slate-600">{t.funding.empty.body}</p>
            <Button onClick={reset} className="mt-6">{t.common.clearFilters}</Button>
          </CardContent>
        </Card>
      ) : (
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((program) => (
            <li key={program.id}><ProgramCard program={program} /></li>
          ))}
        </ul>
      )}

      <p className="mt-8 text-xs leading-relaxed text-slate-500">{t.funding.disclaimer}</p>
    </div>
  );
}

function SummaryCard({
  icon: Icon, label, value, body,
}: { icon: typeof Banknote; label: string; value: string; body: string }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-navy-600" aria-hidden="true" />
          <CardTitle className="text-base">{label}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold tabular-nums text-navy-800">{value}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
      </CardContent>
    </Card>
  );
}

function FundingSkeleton() {
  return (
    <div>
      <Skeleton className="h-9 w-64" />
      <Skeleton className="mt-3 h-5 w-[30rem] max-w-full" />
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {[0, 1, 2].map((i) => <Skeleton key={i} className="h-40 w-full rounded-lg" />)}
      </div>
      <Skeleton className="mt-8 h-20 w-full rounded-lg" />
      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-72 w-full rounded-lg" />)}
      </div>
    </div>
  );
}
