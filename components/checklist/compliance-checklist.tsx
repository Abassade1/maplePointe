"use client";

import { ArrowRight, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { LocaleLink } from "@/components/i18n/locale-link";
import { PageHeader } from "@/components/dashboard/page-header";
import { OnboardingGuard } from "@/components/dashboard/onboarding-guard";
import { EmptyState } from "@/components/dashboard/empty-state";
import { ChecklistRow } from "./checklist-row";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import {
  useAppStore, groupChecklistByProvince, selectChecklistProgress,
} from "@/store/use-app-store";
import { getProvince } from "@/lib/mock-data";
import { useI18n, useT, interpolate } from "@/lib/i18n/provider";
import { localizeProvince } from "@/lib/i18n/localize";
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
  const t = useT();
  const { locale } = useI18n();
  const checklist = useAppStore((s) => s.checklist);
  const { total, completed, percent } = selectChecklistProgress(checklist);

  if (total === 0) {
    return (
      <div>
        <PageHeader title={t.checklist.title} description={t.checklist.subtitle} />
        <EmptyState
          icon={ClipboardList}
          title={t.checklist.empty.title}
          description={t.checklist.empty.body}
          actionLabel={t.checklist.empty.cta}
          actionHref="/dashboard/guide"
        />
      </div>
    );
  }

  const grouped = groupChecklistByProvince(checklist);
  const provinces = Object.keys(grouped) as ProvinceCode[];

  return (
    <div>
      <PageHeader title={t.checklist.title} description={t.checklist.subtitle}>
        <Button asChild variant="outline">
          <LocaleLink href="/dashboard/guide">
            {t.checklist.addMore}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </LocaleLink>
        </Button>
      </PageHeader>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-600">{t.checklist.overallProgress}</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums text-navy-800">{percent}%</p>
            </div>
            <p className="text-sm text-slate-600">
              {interpolate(t.checklist.itemsComplete, { done: completed, total })}
              {total - completed > 0 &&
                interpolate(t.checklist.remaining, { count: total - completed })}
            </p>
          </div>
          <Progress
            value={percent}
            className="mt-4"
            aria-label={interpolate(t.checklist.progressAria, { percent })}
          />
        </CardContent>
      </Card>

      <div className="mt-8 space-y-8">
        {provinces.map((code) => {
          const items = grouped[code];
          const done = items.filter((i) => i.completed).length;

          return (
            <section key={code} aria-labelledby={`province-${code}-heading`}>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h2 id={`province-${code}-heading`} className="text-lg font-semibold text-navy-800">
                  {localizeProvince(getProvince(code), locale).name}
                </h2>
                <p className="text-sm text-slate-500">
                  {interpolate(t.checklist.completeOf, { done, total: items.length })}
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
