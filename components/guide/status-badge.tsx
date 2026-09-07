import { Badge } from "@/components/ui/badge";
import type { LicenceStatus } from "@/lib/types";

const STATUS_CONFIG: Record<LicenceStatus, { label: string; variant: "required" | "recommended" | "notApplicable" }> = {
  required: { label: "Required", variant: "required" },
  recommended: { label: "Recommended", variant: "recommended" },
  "not-applicable": { label: "Not applicable", variant: "notApplicable" },
};

export function StatusBadge({ status }: { status: LicenceStatus }) {
  const config = STATUS_CONFIG[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
