import { Badge } from "@/components/ui/badge";
import { APPLICATION_STATUS_LABELS, FUNDING_TYPE_LABELS } from "@/lib/mock-funding";
import type { ApplicationStatus, Competitiveness, FundingType } from "@/lib/types";
import { cn } from "@/lib/utils";

export function FundingTypeBadge({ type }: { type: FundingType }) {
  return <Badge variant="secondary">{FUNDING_TYPE_LABELS[type]}</Badge>;
}

const COMPETITIVENESS_STYLES: Record<Competitiveness, string> = {
  low: "border-teal-200 bg-teal-50 text-teal-700",
  moderate: "border-amber-200 bg-amber-50 text-amber-800",
  high: "border-red-200 bg-red-50 text-red-700",
};

const COMPETITIVENESS_LABELS: Record<Competitiveness, string> = {
  low: "Low competition",
  moderate: "Moderate competition",
  high: "Highly competitive",
};

export function CompetitivenessBadge({ level }: { level: Competitiveness }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        COMPETITIVENESS_STYLES[level],
      )}
    >
      {COMPETITIVENESS_LABELS[level]}
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
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        STATUS_STYLES[status],
      )}
    >
      {APPLICATION_STATUS_LABELS[status]}
    </span>
  );
}
