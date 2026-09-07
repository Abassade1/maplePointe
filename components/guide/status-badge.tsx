"use client";

import { Badge } from "@/components/ui/badge";
import { useT } from "@/lib/i18n/provider";
import type { LicenceStatus } from "@/lib/types";

const VARIANTS: Record<LicenceStatus, "required" | "recommended" | "notApplicable"> = {
  required: "required",
  recommended: "recommended",
  "not-applicable": "notApplicable",
};

export function StatusBadge({ status }: { status: LicenceStatus }) {
  const t = useT();
  const labels: Record<LicenceStatus, string> = {
    required: t.guide.status.required,
    recommended: t.guide.status.recommended,
    "not-applicable": t.guide.status.notApplicable,
  };
  return <Badge variant={VARIANTS[status]}>{labels[status]}</Badge>;
}
