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
import { PROVINCES } from "@/lib/mock-data";
import { PARTNER_TYPE_LABELS } from "./partner-card";
import type { ProvinceFilter, TypeFilter } from "./partner-directory";
import type { PartnerType } from "@/lib/types";

interface PartnerFiltersProps {
  province: ProvinceFilter;
  type: TypeFilter;
  onProvinceChange: (value: ProvinceFilter) => void;
  onTypeChange: (value: TypeFilter) => void;
  onReset: () => void;
  showReset: boolean;
}

export function PartnerFilters({
  province,
  type,
  onProvinceChange,
  onTypeChange,
  onReset,
  showReset,
}: PartnerFiltersProps) {
  return (
    <section
      aria-label="Filter partners"
      className="rounded-lg border border-slate-200 bg-white p-4"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="w-full space-y-1.5 sm:max-w-[220px]">
          <Label htmlFor="filter-province">Province</Label>
          <Select
            value={province}
            onValueChange={(v) => onProvinceChange(v as ProvinceFilter)}
          >
            <SelectTrigger id="filter-province">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All provinces</SelectItem>
              {PROVINCES.map((p) => (
                <SelectItem key={p.code} value={p.code}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full space-y-1.5 sm:max-w-[220px]">
          <Label htmlFor="filter-type">Partner type</Label>
          <Select value={type} onValueChange={(v) => onTypeChange(v as TypeFilter)}>
            <SelectTrigger id="filter-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {(Object.keys(PARTNER_TYPE_LABELS) as PartnerType[]).map((key) => (
                <SelectItem key={key} value={key}>
                  {PARTNER_TYPE_LABELS[key]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {showReset && (
          <Button variant="ghost" onClick={onReset} className="sm:mb-0">
            <X className="h-4 w-4" aria-hidden="true" />
            Clear filters
          </Button>
        )}
      </div>
    </section>
  );
}
