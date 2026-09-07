"use client";

import { Info } from "lucide-react";
import { PROVINCES } from "@/lib/mock-data";
import type { ProvinceCode } from "@/lib/types";
import { MultiSelectCard } from "./multi-select-card";
import type { OnboardingDraft } from "./onboarding-wizard";
import { FieldError, StepHeading } from "./step-shared";
import { useI18n, useT } from "@/lib/i18n/provider";
import { localizeProvince } from "@/lib/i18n/localize";

interface StepProps {
  draft: OnboardingDraft;
  update: (patch: Partial<OnboardingDraft>) => void;
  showErrors: boolean;
}

export function StepProvinces({ draft, update, showErrors }: StepProps) {
  const t = useT();
  const { locale } = useI18n();
  const s = t.onboarding.step3;

  function toggle(code: ProvinceCode) {
    const next = draft.targetProvinces.includes(code)
      ? draft.targetProvinces.filter((c) => c !== code)
      : [...draft.targetProvinces, code];
    update({ targetProvinces: next });
  }

  return (
    <div>
      <StepHeading title={s.title} description={s.description} />

      <fieldset className="mt-8">
        <legend className="sr-only">{s.legend}</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {PROVINCES.map((raw) => {
            const province = localizeProvince(raw, locale);
            return (
              <MultiSelectCard
                key={province.code}
                selected={draft.targetProvinces.includes(province.code)}
                title={`${province.name} · ${province.primaryCity}`}
                description={province.tagline}
                onToggle={() => toggle(province.code)}
              />
            );
          })}
        </div>
      </fieldset>

      {showErrors && draft.targetProvinces.length === 0 && (
        <div className="mt-3">
          <FieldError>{s.error}</FieldError>
        </div>
      )}

      <div className="mt-6 flex gap-3 rounded-lg border border-navy-100 bg-navy-50/60 p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-navy-600" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-navy-800">{s.note}</p>
      </div>
    </div>
  );
}
