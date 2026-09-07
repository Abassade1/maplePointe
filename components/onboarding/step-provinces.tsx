"use client";

import { Info } from "lucide-react";
import { PROVINCES } from "@/lib/mock-data";
import type { ProvinceCode } from "@/lib/types";
import { MultiSelectCard } from "./multi-select-card";
import type { OnboardingDraft } from "./onboarding-wizard";
import { FieldError, StepHeading } from "./step-shared";

interface StepProps {
  draft: OnboardingDraft;
  update: (patch: Partial<OnboardingDraft>) => void;
  showErrors: boolean;
}

export function StepProvinces({ draft, update, showErrors }: StepProps) {
  function toggle(code: ProvinceCode) {
    const next = draft.targetProvinces.includes(code)
      ? draft.targetProvinces.filter((c) => c !== code)
      : [...draft.targetProvinces, code];
    update({ targetProvinces: next });
  }

  return (
    <div>
      <StepHeading
        title="Which provinces are you considering?"
        description="Select every province you are evaluating. You can compare them side by side later and narrow down as you go."
      />

      <fieldset className="mt-8">
        <legend className="sr-only">Target provinces</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {PROVINCES.map((province) => (
            <MultiSelectCard
              key={province.code}
              selected={draft.targetProvinces.includes(province.code)}
              title={`${province.name} · ${province.primaryCity}`}
              description={province.tagline}
              onToggle={() => toggle(province.code)}
            />
          ))}
        </div>
      </fieldset>

      {showErrors && draft.targetProvinces.length === 0 && (
        <div className="mt-3">
          <FieldError>Select at least one province.</FieldError>
        </div>
      )}

      <div className="mt-6 flex gap-3 rounded-lg border border-navy-100 bg-navy-50/60 p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-navy-600" aria-hidden="true" />
        <p className="text-sm leading-relaxed text-navy-800">
          Most first-time entrants start with one province and expand. Selecting several here does
          not commit you to anything — it just means we will map all of them.
        </p>
      </div>
    </div>
  );
}
