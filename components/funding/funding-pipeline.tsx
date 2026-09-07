"use client";

import { Banknote, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
import { EmptyState } from "@/components/dashboard/empty-state";
import { ApplicationStatusBadge, FundingTypeBadge } from "./funding-badges";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { useAppStore, selectFundingProgress } from "@/store/use-app-store";
import {
  APPLICATION_STATUS_LABELS,
  APPLICATION_STATUS_ORDER,
  getProgramById,
} from "@/lib/mock-funding";
import { getProvince } from "@/lib/mock-data";
import { formatAmountRange, formatCurrency } from "@/lib/utils";
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
  const applications = useAppStore((s) => s.fundingApplications);
  const { tracked, submitted, awarded } = selectFundingProgress(applications);

  if (tracked === 0) {
    return (
      <div>
        <PageHeader
          title="Application Pipeline"
          description="Every funding programme you are tracking, from first draft through to a decision."
        />
        <EmptyState
          icon={Banknote}
          title="Your pipeline is empty"
          description="Open Funding Matches, review a programme, and choose “Track”. Programmes you track appear here so you can move them through to a decision."
          actionLabel="Browse funding matches"
          actionHref="/dashboard/funding"
        />
      </div>
    );
  }

  // Potential value uses the midpoint of each tracked programme's range.
  const potentialValue = applications.reduce((total, app) => {
    const program = getProgramById(app.programId);
    if (!program) return total;
    return total + (program.minAmount + program.maxAmount) / 2;
  }, 0);

  const awardedValue = applications
    .filter((a) => a.status === "awarded")
    .reduce((total, app) => {
      const program = getProgramById(app.programId);
      if (!program) return total;
      return total + (program.minAmount + program.maxAmount) / 2;
    }, 0);

  const progressPercent = Math.round((submitted / tracked) * 100);

  // Only render lanes that hold something, so the board stays readable.
  const lanes = APPLICATION_STATUS_ORDER.map((status) => ({
    status,
    items: applications.filter((a) => a.status === status),
  })).filter((lane) => lane.items.length > 0);

  return (
    <div>
      <PageHeader
        title="Application Pipeline"
        description="Every funding programme you are tracking, from first draft through to a decision."
      />

      <Card>
        <CardContent className="p-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-slate-600">Potential value</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums text-navy-800">
                {formatCurrency(potentialValue)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Across {tracked} tracked programme{tracked === 1 ? "" : "s"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Submitted or awarded</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums text-navy-800">
                {submitted}
                <span className="text-lg font-normal text-slate-400"> / {tracked}</span>
              </p>
              <Progress
                value={progressPercent}
                className="mt-3"
                aria-label={`${progressPercent} percent of tracked programmes submitted`}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Awarded</p>
              <p className="mt-1 text-3xl font-semibold tabular-nums text-teal-700">
                {awarded > 0 ? formatCurrency(awardedValue) : "—"}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {awarded === 0
                  ? "Nothing awarded yet"
                  : `${awarded} programme${awarded === 1 ? "" : "s"} awarded`}
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
                {APPLICATION_STATUS_LABELS[lane.status]}
              </h2>
              <p className="text-sm text-slate-500">
                {lane.items.length} programme{lane.items.length === 1 ? "" : "s"}
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
  const setStatus = useAppStore((s) => s.setApplicationStatus);
  const untrack = useAppStore((s) => s.untrackProgram);
  const program = getProgramById(application.programId);

  // Defensive: a persisted application could reference a programme that is gone.
  if (!program) return null;

  const selectId = `status-${program.id}`;

  return (
    <li className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <h3 className="font-medium text-navy-800">{program.name}</h3>
          <ApplicationStatusBadge status={application.status} />
        </div>
        <p className="mt-1.5 text-sm text-slate-600">
          {program.provider} ·{" "}
          {program.level === "federal" ? "Federal" : getProvince(program.province!).name}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <FundingTypeBadge type={program.type} />
          <span className="text-sm tabular-nums text-slate-600">
            {formatAmountRange(program.minAmount, program.maxAmount)}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <div className="w-full sm:w-[170px]">
          <label htmlFor={selectId} className="sr-only">
            Application status for {program.name}
          </label>
          <Select
            value={application.status}
            onValueChange={(v) => setStatus(program.id, v as ApplicationStatus)}
          >
            <SelectTrigger id={selectId}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {APPLICATION_STATUS_ORDER.map((status) => (
                <SelectItem key={status} value={status}>
                  {APPLICATION_STATUS_LABELS[status]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <button
          type="button"
          onClick={() => untrack(program.id)}
          className="shrink-0 rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
          aria-label={`Remove ${program.name} from your pipeline`}
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
