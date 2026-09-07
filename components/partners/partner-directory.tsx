"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/dashboard/page-header";
import { OnboardingGuard } from "@/components/dashboard/onboarding-guard";
import { PartnerCard, PARTNER_TYPE_LABELS } from "./partner-card";
import { PartnerFilters } from "./partner-filters";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { useAppStore } from "@/store/use-app-store";
import { PARTNERS } from "@/lib/mock-data";
import type { PartnerType, ProvinceCode } from "@/lib/types";

export type ProvinceFilter = ProvinceCode | "all";
export type TypeFilter = PartnerType | "all";

export function PartnerDirectory() {
  const loading = useSimulatedLoading();

  if (loading) return <PartnersSkeleton />;

  return (
    <OnboardingGuard>
      <DirectoryContent />
    </OnboardingGuard>
  );
}

function DirectoryContent() {
  const company = useAppStore((s) => s.company)!;
  const [province, setProvince] = useState<ProvinceFilter>("all");
  const [type, setType] = useState<TypeFilter>("all");

  const partners = useMemo(() => {
    return PARTNERS.filter(
      (p) =>
        (province === "all" || p.province === province) && (type === "all" || p.type === type),
    ).sort((a, b) => b.matchScore - a.matchScore);
  }, [province, type]);

  const filtersActive = province !== "all" || type !== "all";

  function reset() {
    setProvince("all");
    setType("all");
  }

  return (
    <div>
      <PageHeader
        title="Partner Matches"
        description={`Distributors, advisors, and logistics providers matched to ${company.name}'s category and target provinces.`}
      />

      <PartnerFilters
        province={province}
        type={type}
        onProvinceChange={setProvince}
        onTypeChange={setType}
        onReset={reset}
        showReset={filtersActive}
      />

      <p className="mt-4 text-sm text-slate-600" aria-live="polite">
        Showing {partners.length} of {PARTNERS.length} partners
        {province !== "all" || type !== "all" ? " matching your filters" : ""}.
      </p>

      {partners.length === 0 ? (
        <Card className="mt-4">
          <CardContent className="flex flex-col items-center px-6 py-16 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <SearchX className="h-6 w-6 text-slate-400" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-lg font-semibold text-navy-800">No partners match those filters</h2>
            <p className="mt-2 max-w-md leading-relaxed text-slate-600">
              We do not yet have a {type === "all" ? "partner" : PARTNER_TYPE_LABELS[type].toLowerCase()} in
              that province. Try widening your search.
            </p>
            <Button onClick={reset} className="mt-6">
              Clear filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {partners.map((partner) => (
            <li key={partner.id}>
              <PartnerCard partner={partner} />
            </li>
          ))}
        </ul>
      )}

      <p className="mt-8 text-xs leading-relaxed text-slate-500">
        All partner organisations shown are fictional and included for demonstration purposes only.
      </p>
    </div>
  );
}

function PartnersSkeleton() {
  return (
    <div>
      <Skeleton className="h-9 w-60" />
      <Skeleton className="mt-3 h-5 w-[30rem] max-w-full" />
      <Skeleton className="mt-8 h-16 w-full rounded-lg" />
      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-64 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}
