"use client";

import Link from "next/link";
import { ArrowRight, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/dashboard/page-header";
import { OnboardingGuard } from "@/components/dashboard/onboarding-guard";
import { EmptyState } from "@/components/dashboard/empty-state";
import { ChecklistRow } from "./checklist-row";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import {
  useAppStore,
  groupChecklistByProvince,
  selectChecklistProgress,
} from "@/store/use-app-store";
import { getProvince } from "@/lib/mock-data";
import type { ProvinceCode } from "@/lib/types";

export function ComplianceChecklist() {
  const loading = useSimulatedLoading();

  if (loading) return <ChecklistSkeleton />;

  return (
    <OnboardingGuard>
      <ChecklistContent />
    </OnboardingGuard>
  );
}

function ChecklistContent() {
  const checklist = useAppStore((s) => s.checklist);
  const { total, completed, percent } = selectChecklistProgress(checklist);

  if (total === 0) {
    return (
      <div>
        <PageHeader
          title="Compliance Checklist"
          description="Everything you have marked as reviewed, grouped by province and tracked to completion."
        />
        <EmptyState
          icon={ClipboardList}
          title="Your checklist is empty"
          description="Open the Province Guide, expand any licence or registration, and choose “Mark as reviewed”. Items you mark will appear here so you can track them to completion."
          actionLabel="Go to Province Guide"
          actionHref="/dashboard/guide"
        />
      </div>
    );
  }

  const grouped = groupChecklistByProvince(checklist);
  const provinces = Object.keys(grouped) as ProvinceCode[];

  return (
    <div>
      <PageHeader
        title="Compliance Checklist"
        description="Everything you have marked as reviewed, grouped by province and tracked to completion."
      >
        <Button asChild variant="outline">
          <Link href="/dashboard/guide">
            Add more from the Guide
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </PageHeader>

      {/* Overall progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-600">Overall progress</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums text-navy-800">{percent}%</p>
            </div>
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-navy-800">{completed}</span> of{" "}
              <span className="font-semibold text-navy-800">{total}</span> items complete
              {total - completed > 0 && ` · ${total - completed} remaining`}
            </p>
          </div>
          <Progress
            value={percent}
            className="mt-4"
            aria-label={`Checklist ${percent} percent complete`}
          />
        </CardContent>
      </Card>

      {/* Grouped items */}
      <div className="mt-8 space-y-8">
        {provinces.map((code) => {
          const items = grouped[code];
          const done = items.filter((i) => i.completed).length;

          return (
            <section key={code} aria-labelledby={`province-${code}-heading`}>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h2 id={`province-${code}-heading`} className="text-lg font-semibold text-navy-800">
                  {getProvince(code).name}
                </h2>
                <p className="text-sm text-slate-500">
                  {done} of {items.length} complete
                </p>
              </div>

              <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
                {items.map((item) => (
                  <ChecklistRow key={item.licenceId} item={item} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function ChecklistSkeleton() {
  return (
    <div>
      <Skeleton className="h-9 w-72" />
      <Skeleton className="mt-3 h-5 w-[30rem] max-w-full" />
      <Skeleton className="mt-8 h-32 w-full rounded-lg" />
      <Skeleton className="mt-8 h-7 w-40" />
      <Skeleton className="mt-3 h-64 w-full rounded-lg" />
    </div>
  );
}
