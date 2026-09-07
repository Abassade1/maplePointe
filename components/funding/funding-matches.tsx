"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Banknote, SearchX, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/dashboard/page-header";
import { OnboardingGuard } from "@/components/dashboard/onboarding-guard";
import { ProgramCard } from "./program-card";
import { FundingFilters } from "./funding-filters";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { useAppStore, sumFundingMidpoints } from "@/store/use-app-store";
import { REALISTIC_MATCH_THRESHOLD, getRelevantPrograms } from "@/lib/mock-funding";
import { formatCurrency } from "@/lib/utils";
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
        (p) =>
          (level === "all" || p.level === level) && (type === "all" || p.type === type),
      ),
    [relevant, level, type],
  );

  // Headline excludes programmes this profile does not realistically reach, so a
  // single very large industrial fund cannot inflate the number.
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
        title="Funding Matches"
        description={`Grants, tax credits, loans, and subsidies open to ${company.name} across the federal government and your target provinces.`}
      >
        <Button asChild variant="outline">
          <Link href="/dashboard/funding/pipeline">
            View pipeline
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </PageHeader>

      {/* Summary */}
      <div className="grid gap-5 sm:grid-cols-3">
        <SummaryCard
          icon={Banknote}
          label="Funding identified"
          value={formatCurrency(totalIdentified)}
          body={`Midpoint of the ${realistic.length} programmes you realistically reach. Long-shot programmes are listed but excluded.`}
        />
        <SummaryCard
          icon={Target}
          label="Strong matches"
          value={String(strongMatches)}
          body={`Of ${relevant.length} programmes open to you, scoring 75 or above against your profile.`}
        />
        <SummaryCard
          icon={Sparkles}
          label="In your pipeline"
          value={String(applications.length)}
          body={
            applications.length === 0
              ? "Track a programme to start building your application pipeline."
              : "Applications you are currently tracking to a decision."
          }
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
        Showing {filtered.length} of {relevant.length} matched programmes
        {filtersActive ? " matching your filters" : ""}.
      </p>

      {filtered.length === 0 ? (
        <Card className="mt-4">
          <CardContent className="flex flex-col items-center px-6 py-16 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <SearchX className="h-6 w-6 text-slate-400" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-lg font-semibold text-navy-800">
              No programmes match those filters
            </h2>
            <p className="mt-2 max-w-md leading-relaxed text-slate-600">
              There is no programme of that type at that level for your selected provinces. Try
              widening your search.
            </p>
            <Button onClick={reset} className="mt-6">
              Clear filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((program) => (
            <li key={program.id}>
              <ProgramCard program={program} />
            </li>
          ))}
        </ul>
      )}

      <p className="mt-8 text-xs leading-relaxed text-slate-500">
        Programme amounts, intake windows, and decision times are illustrative planning estimates
        for this demonstration and do not constitute financial or legal advice.
      </p>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  body,
}: {
  icon: typeof Banknote;
  label: string;
  value: string;
  body: string;
}) {
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
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-40 w-full rounded-lg" />
        ))}
      </div>
      <Skeleton className="mt-8 h-20 w-full rounded-lg" />
      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-72 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}
