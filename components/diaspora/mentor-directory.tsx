"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/dashboard/page-header";
import { OnboardingGuard } from "@/components/dashboard/onboarding-guard";
import { MentorCard } from "./mentor-card";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { useAppStore } from "@/store/use-app-store";
import { DIASPORA_MENTORS } from "@/lib/mock-diaspora";
import { PROVINCES } from "@/lib/mock-data";
import type { ProvinceCode } from "@/lib/types";

type ProvinceFilter = ProvinceCode | "all";
type OriginFilter = "all" | "home" | "other";

export function MentorDirectory() {
  const loading = useSimulatedLoading();

  if (loading) return <MentorsSkeleton />;

  return (
    <OnboardingGuard>
      <DirectoryContent />
    </OnboardingGuard>
  );
}

function DirectoryContent() {
  const company = useAppStore((s) => s.company)!;
  const country = company.homeCountry;

  const [province, setProvince] = useState<ProvinceFilter>("all");
  const [origin, setOrigin] = useState<OriginFilter>("all");

  const mentors = useMemo(() => {
    return DIASPORA_MENTORS.filter((m) => {
      if (province !== "all" && m.province !== province) return false;
      if (origin === "home" && m.homeCountry !== country) return false;
      if (origin === "other" && m.homeCountry === country) return false;
      return true;
    }).sort((a, b) => {
      // Mentors from the user's home market lead, then by match score.
      const aHome = a.homeCountry === country ? 0 : 1;
      const bHome = b.homeCountry === country ? 0 : 1;
      return aHome - bHome || b.matchScore - a.matchScore;
    });
  }, [province, origin, country]);

  const homeCount = DIASPORA_MENTORS.filter((m) => m.homeCountry === country).length;
  const filtersActive = province !== "all" || origin !== "all";

  function reset() {
    setProvince("all");
    setOrigin("all");
  }

  return (
    <div>
      <PageHeader
        title="Mentors & Advisors"
        description={
          homeCount > 0
            ? `Operators who have made the same move. ${homeCount} of them came from ${country}.`
            : `Operators who have established foreign companies in Canada. We have no ${country} mentors on the register yet, so the full network is shown.`
        }
      />

      <section aria-label="Filter mentors" className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="w-full space-y-1.5 sm:max-w-[220px]">
            <Label htmlFor="filter-mentor-province">Province</Label>
            <Select value={province} onValueChange={(v) => setProvince(v as ProvinceFilter)}>
              <SelectTrigger id="filter-mentor-province">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All provinces</SelectItem>
                {PROVINCES.map((p) => (
                  <SelectItem key={p.code} value={p.code}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full space-y-1.5 sm:max-w-[240px]">
            <Label htmlFor="filter-origin">Home market</Label>
            <Select value={origin} onValueChange={(v) => setOrigin(v as OriginFilter)}>
              <SelectTrigger id="filter-origin">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All mentors</SelectItem>
                <SelectItem value="home">From {country}</SelectItem>
                <SelectItem value="other">Other markets</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filtersActive && (
            <Button variant="ghost" onClick={reset}>
              Clear filters
            </Button>
          )}
        </div>
      </section>

      <p className="mt-4 text-sm text-slate-600" aria-live="polite">
        Showing {mentors.length} of {DIASPORA_MENTORS.length} mentors
        {filtersActive ? " matching your filters" : ""}.
      </p>

      {mentors.length === 0 ? (
        <Card className="mt-4">
          <CardContent className="flex flex-col items-center px-6 py-16 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <SearchX className="h-6 w-6 text-slate-400" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-lg font-semibold text-navy-800">
              No mentors match those filters
            </h2>
            <p className="mt-2 max-w-md leading-relaxed text-slate-600">
              We do not have a mentor meeting both of those criteria yet. Try widening your search.
            </p>
            <Button onClick={reset} className="mt-6">
              Clear filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {mentors.map((mentor) => (
            <li key={mentor.id}>
              <MentorCard mentor={mentor} />
            </li>
          ))}
        </ul>
      )}

      <p className="mt-8 text-xs leading-relaxed text-slate-500">
        All mentors shown are fictional and included for demonstration purposes only.
      </p>
    </div>
  );
}

function MentorsSkeleton() {
  return (
    <div>
      <Skeleton className="h-9 w-64" />
      <Skeleton className="mt-3 h-5 w-[28rem] max-w-full" />
      <Skeleton className="mt-8 h-20 w-full rounded-lg" />
      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-72 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}
