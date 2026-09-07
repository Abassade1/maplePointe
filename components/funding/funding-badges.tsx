"use client";

import { Badge } from "@/components/ui/badge";
import { useT } from "@/lib/i18n/provider";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { ApplicationStatus, Competitiveness, FundingType } from "@/lib/types";
import { cn } from "@/lib/utils";

export function fundingTypeLabel(type: FundingType, t: Dictionary): string {
  const map: Record<FundingType, string> = {
    grant: t.funding.types.grant,
    loan: t.funding.types.loan,
    "tax-credit": t.funding.types.taxCredit,
    "wage-subsidy": t.funding.types.wageSubsidy,
    "export-financing": t.funding.types.exportFinancing,
  };
  return map[type];
}

export function applicationStatusLabel(status: ApplicationStatus, t: Dictionary): string {
  const map: Record<ApplicationStatus, string> = {
    "not-started": t.pipeline.status.notStarted,
    preparing: t.pipeline.status.preparing,
    submitted: t.pipeline.status.submitted,
    awarded: t.pipeline.status.awarded,
    declined: t.pipeline.status.declined,
  };
  return map[status];
}

export function FundingTypeBadge({ type }: { type: FundingType }) {
  const t = useT();
  return <Badge variant="secondary">{fundingTypeLabel(type, t)}</Badge>;
}

const COMPETITIVENESS_STYLES: Record<Competitiveness, string> = {
  low: "border-teal-200 bg-teal-50 text-teal-700",
  moderate: "border-amber-200 bg-amber-50 text-amber-800",
  high: "border-red-200 bg-red-50 text-red-700",
};

export function CompetitivenessBadge({ level }: { level: Competitiveness }) {
  const t = useT();
  const labels: Record<Competitiveness, string> = {
    low: t.funding.competitiveness.low,
    moderate: t.funding.competitiveness.moderate,
    high: t.funding.competitiveness.high,
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        COMPETITIVENESS_STYLES[level],
      )}
    >
      {labels[level]}
    </span>
  );
}

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  "not-started": "border-slate-200 bg-slate-50 text-slate-600",
  preparing: "border-navy-200 bg-navy-50 text-navy-700",
  submitted: "border-amber-200 bg-amber-50 text-amber-800",
  awarded: "border-teal-200 bg-teal-50 text-teal-700",
  declined: "border-slate-200 bg-slate-100 text-slate-500",
};

export function ApplicationStatusBadge({ status }: { status: ApplicationStatus }) {
  const t = useT();
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        STATUS_STYLES[status],
      )}
    >
      {applicationStatusLabel(status, t)}
    </span>
  );
}
