"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { fundingTypeLabel } from "./funding-badges";
import { useT } from "@/lib/i18n/provider";
import type { FundingType } from "@/lib/types";
import type { LevelFilter, TypeFilter } from "./funding-matches";

const FUNDING_TYPES: FundingType[] = [
  "grant", "loan", "tax-credit", "wage-subsidy", "export-financing",
];

interface FundingFiltersProps {
  level: LevelFilter;
  type: TypeFilter;
  onLevelChange: (value: LevelFilter) => void;
  onTypeChange: (value: TypeFilter) => void;
  onReset: () => void;
  showReset: boolean;
}

export function FundingFilters({
  level, type, onLevelChange, onTypeChange, onReset, showReset,
}: FundingFiltersProps) {
  const t = useT();

  return (
    <section aria-label={t.funding.filterLabel} className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="w-full space-y-1.5 sm:max-w-[220px]">
          <Label htmlFor="filter-level">{t.funding.level}</Label>
          <Select value={level} onValueChange={(v) => onLevelChange(v as LevelFilter)}>
            <SelectTrigger id="filter-level"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.funding.allLevels}</SelectItem>
              <SelectItem value="federal">{t.funding.federal}</SelectItem>
              <SelectItem value="provincial">{t.funding.provincial}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full space-y-1.5 sm:max-w-[220px]">
          <Label htmlFor="filter-funding-type">{t.funding.fundingType}</Label>
          <Select value={type} onValueChange={(v) => onTypeChange(v as TypeFilter)}>
            <SelectTrigger id="filter-funding-type"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.common.allTypes}</SelectItem>
              {FUNDING_TYPES.map((key) => (
                <SelectItem key={key} value={key}>{fundingTypeLabel(key, t)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {showReset && (
          <Button variant="ghost" onClick={onReset}>
            <X className="h-4 w-4" aria-hidden="true" />
            {t.common.clearFilters}
          </Button>
        )}
      </div>
    </section>
  );
}
