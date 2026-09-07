"use client";

import Link from "next/link";
import { ArrowRight, Banknote, ListTodo, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "./page-header";
import { OnboardingGuard } from "./onboarding-guard";
import { ReadinessCard } from "./readiness-card";
import { QuickLinks } from "./quick-links";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import {
  useAppStore,
  computeReadinessScore,
  selectChecklistProgress,
  sumFundingMidpoints,
} from "@/store/use-app-store";
import { getLicencesForProvince, getProvince } from "@/lib/mock-data";
import { getRealisticPrograms } from "@/lib/mock-funding";
import { formatCurrency } from "@/lib/utils";

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
  const company = useAppStore((s) => s.company)!;
  const checklist = useAppStore((s) => s.checklist);

  const readiness = computeReadinessScore(company, checklist);
  const { total, completed } = selectChecklistProgress(checklist);
  const openItems = total - completed;

  // Total required items across the user's selected provinces, for context.
  const requiredCount = company.targetProvinces
    .flatMap((code) => getLicencesForProvince(code))
    .filter((l) => l.status === "required").length;

  // Module 2 headline. Uses the realistic subset — the very large industrial
  // funds would otherwise dominate and overstate what this profile can reach.
  const relevantPrograms = getRealisticPrograms(company.targetProvinces);
  const fundingIdentified = sumFundingMidpoints(relevantPrograms);

  const nextStep = determineNextStep({ checklistCount: total, openItems });

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${company.name}`}
        description={`Entering Canada from ${company.homeCountry} · ${company.targetProvinces
          .map((c) => getProvince(c).name)
          .join(", ")}`}
      >
        <Button asChild>
          <Link href="/dashboard/guide">
            Open Province Guide
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </PageHeader>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <ReadinessCard score={readiness} />

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <ListTodo className="h-4 w-4 text-navy-600" aria-hidden="true" />
              <CardTitle className="text-base">Open checklist items</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold tabular-nums text-navy-800">{openItems}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {total === 0
                ? `${requiredCount} required registrations identified across your provinces. Add them from the Guide to start tracking.`
                : `${completed} of ${total} tracked items complete.`}
            </p>
            <Button asChild variant="link" className="mt-3 h-auto p-0">
              <Link href={total === 0 ? "/dashboard/guide" : "/dashboard/checklist"}>
                {total === 0 ? "Review requirements" : "Open checklist"}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Banknote className="h-4 w-4 text-navy-600" aria-hidden="true" />
              <CardTitle className="text-base">Funding identified</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold tabular-nums text-navy-800">
              {formatCurrency(fundingIdentified)}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Across {relevantPrograms.length} federal and provincial programmes realistically
              open to your profile.
            </p>
            <Button asChild variant="link" className="mt-3 h-auto p-0">
              <Link href="/dashboard/funding">
                View funding matches
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-teal-600" aria-hidden="true" />
              <CardTitle className="text-base">Suggested next step</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-navy-800">{nextStep.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{nextStep.body}</p>
            <Button asChild variant="link" className="mt-3 h-auto p-0">
              <Link href={nextStep.href}>
                {nextStep.cta}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Profile summary */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Your entry profile</CardTitle>
          <CardDescription>Captured during your assessment. Drives every recommendation.</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ProfileField label="Industry" value={company.industry} />
            <ProfileField label="Company size" value={`${company.size} employees`} />
            <ProfileField label="Home market" value={company.homeCountry} />
            <ProfileField
              label="Target provinces"
              value={company.targetProvinces.map((c) => getProvince(c).name).join(", ")}
            />
          </dl>

          <div className="mt-6 border-t border-slate-100 pt-6">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              What you are bringing to market
            </dt>
            <dd className="mt-2 max-w-3xl leading-relaxed text-slate-700">
              {company.productDescription}
            </dd>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Priorities
            </span>
            {company.goals.map((goal) => (
              <Badge key={goal} variant="secondary">
                {goal.split("-").join(" ")}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <h2 className="mb-4 mt-10 text-lg font-semibold text-navy-800">Your modules</h2>
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

function determineNextStep({
  checklistCount,
  openItems,
}: {
  checklistCount: number;
  openItems: number;
}) {
  if (checklistCount === 0) {
    return {
      title: "Review your provincial requirements",
      body: "Open the Province Guide and mark the registrations that apply to you. They will flow into your compliance checklist automatically.",
      cta: "Go to Province Guide",
      href: "/dashboard/guide",
    };
  }
  if (openItems === 0) {
    return {
      title: "Line up your funding",
      body: "Your tracked compliance items are complete, which means you now meet the Canadian-entity test most programmes require. Review the grants and credits open to you.",
      cta: "View funding matches",
      href: "/dashboard/funding",
    };
  }
  return {
    title: `Work through your ${openItems} open item${openItems === 1 ? "" : "s"}`,
    body: "Registration and labelling items tend to sit on the critical path. Clearing them early keeps your launch date credible.",
    cta: "Open checklist",
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
            <CardHeader className="pb-3">
              <Skeleton className="h-5 w-40" />
            </CardHeader>
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
