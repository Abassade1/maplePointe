"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { PROVINCES } from "@/lib/mock-data";
import { partnerTypeLabel } from "./partner-card";
import { useI18n, useT } from "@/lib/i18n/provider";
import { localizeProvince } from "@/lib/i18n/localize";
import type { ProvinceFilter, TypeFilter } from "./partner-directory";
import type { PartnerType } from "@/lib/types";

const PARTNER_TYPES: PartnerType[] = ["distributor", "legal-advisor", "logistics", "local-agent"];

interface PartnerFiltersProps {
  province: ProvinceFilter;
  type: TypeFilter;
  onProvinceChange: (value: ProvinceFilter) => void;
  onTypeChange: (value: TypeFilter) => void;
  onReset: () => void;
  showReset: boolean;
}

export function PartnerFilters({
  province, type, onProvinceChange, onTypeChange, onReset, showReset,
}: PartnerFiltersProps) {
  const t = useT();
  const { locale } = useI18n();

  return (
    <section aria-label={t.partners.filterLabel} className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="w-full space-y-1.5 sm:max-w-[220px]">
          <Label htmlFor="filter-province">{t.common.province}</Label>
          <Select value={province} onValueChange={(v) => onProvinceChange(v as ProvinceFilter)}>
            <SelectTrigger id="filter-province"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.common.allProvinces}</SelectItem>
              {PROVINCES.map((p) => (
                <SelectItem key={p.code} value={p.code}>
                  {localizeProvince(p, locale).name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full space-y-1.5 sm:max-w-[220px]">
          <Label htmlFor="filter-type">{t.partners.partnerType}</Label>
          <Select value={type} onValueChange={(v) => onTypeChange(v as TypeFilter)}>
            <SelectTrigger id="filter-type"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.common.allTypes}</SelectItem>
              {PARTNER_TYPES.map((key) => (
                <SelectItem key={key} value={key}>{partnerTypeLabel(key, t)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {showReset && (
          <Button variant="ghost" onClick={onReset} className="sm:mb-0">
            <X className="h-4 w-4" aria-hidden="true" />
            {t.common.clearFilters}
          </Button>
        )}
      </div>
    </section>
  );
}
