"use client";

import { Banknote, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/dashboard/page-header";
import { OnboardingGuard } from "@/components/dashboard/onboarding-guard";
import { EmptyState } from "@/components/dashboard/empty-state";
import {
  ApplicationStatusBadge, FundingTypeBadge, applicationStatusLabel,
} from "./funding-badges";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { useAppStore, selectFundingProgress } from "@/store/use-app-store";
import { APPLICATION_STATUS_ORDER, getProgramById } from "@/lib/mock-funding";
import { getProvince } from "@/lib/mock-data";
import { formatAmountRange, formatCurrency } from "@/lib/utils";
import { useI18n, useT, interpolate } from "@/lib/i18n/provider";
import { localizeProgram, localizeProvince } from "@/lib/i18n/localize";
import type { ApplicationStatus, FundingApplication } from "@/lib/types";

export function FundingPipeline() {
  const loading = useSimulatedLoading();
  if (loading) return <PipelineSkeleton />;
  return (
    <OnboardingGuard>
      <PipelineContent />
    </OnboardingGuard>
  );
}

function PipelineContent() {
  const t = useT();
  const { locale } = useI18n();
  const applications = useAppStore((s) => s.fundingApplications);
  const { tracked, submitted, awarded } = selectFundingProgress(applications);

  if (tracked === 0) {
    return (
      <div>
        <PageHeader title={t.pipeline.title} description={t.pipeline.subtitle} />
        <EmptyState
          icon={Banknote}
          title={t.pipeline.empty.title}
          description={t.pipeline.empty.body}
          actionLabel={t.pipeline.empty.cta}
          actionHref="/dashboard/funding"
        />
      </div>
    );
  }

  const midpoint = (id: string) => {
    const p = getProgramById(id);
    return p ? (p.minAmount + p.maxAmount) / 2 : 0;
  };

  const potentialValue = applications.reduce((sum, a) => sum + midpoint(a.programId), 0);
  const awardedValue = applications
    .filter((a) => a.status === "awarded")
    .reduce((sum, a) => sum + midpoint(a.programId), 0);

  const progressPercent = Math.round((submitted / tracked) * 100);

  const lanes = APPLICATION_STATUS_ORDER.map((status) => ({
    status,
    items: applications.filter((a) => a.status === status),
  })).filter((lane) => lane.items.length > 0);

  return (
    <div>
      <PageHeader title={t.pipeline.title} description={t.pipeline.subtitle} />

      <Card>
        <CardContent className="p-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-slate-600">{t.pipeline.potentialValue}</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums text-navy-800">
                {formatCurrency(potentialValue, locale)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {tracked === 1
                  ? t.pipeline.acrossTrackedOne
                  : interpolate(t.pipeline.acrossTracked, { count: tracked })}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">{t.pipeline.submittedOrAwarded}</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums text-navy-800">
                {submitted}
                <span className="text-lg font-normal text-slate-400"> / {tracked}</span>
              </p>
              <Progress
                value={progressPercent}
                className="mt-3"
                aria-label={interpolate(t.pipeline.submittedAria, { percent: progressPercent })}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">{t.pipeline.awarded}</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums text-teal-700">
                {awarded > 0 ? formatCurrency(awardedValue, locale) : "—"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {awarded === 0
                  ? t.pipeline.nothingAwarded
                  : awarded === 1
                    ? t.pipeline.programmeAwarded
                    : interpolate(t.pipeline.programmesAwarded, { count: awarded })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-8">
        {lanes.map((lane) => (
          <section key={lane.status} aria-labelledby={`lane-${lane.status}`}>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 id={`lane-${lane.status}`} className="text-lg font-semibold text-navy-800">
                {applicationStatusLabel(lane.status, t)}
              </h2>
              <p className="text-sm text-slate-500">
                {lane.items.length === 1
                  ? t.pipeline.programmeCount
                  : interpolate(t.pipeline.programmesCount, { count: lane.items.length })}
              </p>
            </div>
            <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
              {lane.items.map((app) => (
                <ApplicationRow key={app.programId} application={app} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function ApplicationRow({ application }: { application: FundingApplication }) {
  const t = useT();
  const { locale } = useI18n();
  const setStatus = useAppStore((s) => s.setApplicationStatus);
  const untrack = useAppStore((s) => s.untrackProgram);
  const raw = getProgramById(application.programId);

  // Defensive: a persisted application could reference a programme that is gone.
  if (!raw) return null;
  const program = localizeProgram(raw, locale);
  const selectId = `status-${raw.id}`;

  return (
    <li className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <h3 className="font-medium text-navy-800">{program.name}</h3>
          <ApplicationStatusBadge status={application.status} />
        </div>
        <p className="mt-1.5 text-sm text-slate-600">
          {program.provider} ·{" "}
          {program.level === "federal"
            ? t.funding.federal
            : localizeProvince(getProvince(program.province!), locale).name}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <FundingTypeBadge type={program.type} />
          <span className="text-sm tabular-nums text-slate-600">
            {formatAmountRange(program.minAmount, program.maxAmount, locale)}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <div className="w-full sm:w-[190px]">
          <label htmlFor={selectId} className="sr-only">
            {interpolate(t.pipeline.statusLabelFor, { name: program.name })}
          </label>
          <Select
            value={application.status}
            onValueChange={(v) => setStatus(raw.id, v as ApplicationStatus)}
          >
            <SelectTrigger id={selectId}><SelectValue /></SelectTrigger>
            <SelectContent>
              {APPLICATION_STATUS_ORDER.map((status) => (
                <SelectItem key={status} value={status}>
                  {applicationStatusLabel(status, t)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <button
          type="button"
          onClick={() => untrack(raw.id)}
          className="shrink-0 rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
          aria-label={interpolate(t.pipeline.removeAria, { name: program.name })}
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </li>
  );
}

function PipelineSkeleton() {
  return (
    <div>
      <Skeleton className="h-9 w-72" />
      <Skeleton className="mt-3 h-5 w-[30rem] max-w-full" />
      <Skeleton className="mt-8 h-36 w-full rounded-lg" />
      <Skeleton className="mt-8 h-7 w-40" />
      <Skeleton className="mt-3 h-56 w-full rounded-lg" />
    </div>
  );
}
