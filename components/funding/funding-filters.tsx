"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FUNDING_TYPE_LABELS } from "@/lib/mock-funding";
import type { FundingType } from "@/lib/types";
import type { LevelFilter, TypeFilter } from "./funding-matches";

interface FundingFiltersProps {
  level: LevelFilter;
  type: TypeFilter;
  onLevelChange: (value: LevelFilter) => void;
  onTypeChange: (value: TypeFilter) => void;
  onReset: () => void;
  showReset: boolean;
}

export function FundingFilters({
  level,
  type,
  onLevelChange,
  onTypeChange,
  onReset,
  showReset,
}: FundingFiltersProps) {
  return (
    <section aria-label="Filter funding programmes" className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="w-full space-y-1.5 sm:max-w-[220px]">
          <Label htmlFor="filter-level">Level of government</Label>
          <Select value={level} onValueChange={(v) => onLevelChange(v as LevelFilter)}>
            <SelectTrigger id="filter-level">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              <SelectItem value="federal">Federal</SelectItem>
              <SelectItem value="provincial">Provincial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full space-y-1.5 sm:max-w-[220px]">
          <Label htmlFor="filter-funding-type">Funding type</Label>
          <Select value={type} onValueChange={(v) => onTypeChange(v as TypeFilter)}>
            <SelectTrigger id="filter-funding-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {(Object.keys(FUNDING_TYPE_LABELS) as FundingType[]).map((key) => (
                <SelectItem key={key} value={key}>
                  {FUNDING_TYPE_LABELS[key]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {showReset && (
          <Button variant="ghost" onClick={onReset}>
            <X className="h-4 w-4" aria-hidden="true" />
            Clear filters
          </Button>
        )}
      </div>
    </section>
  );
}
