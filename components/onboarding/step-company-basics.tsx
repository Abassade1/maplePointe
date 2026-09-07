"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { COMPANY_SIZES, COUNTRIES, INDUSTRIES } from "@/lib/mock-data";
import type { CompanySize } from "@/lib/types";
import type { OnboardingDraft } from "./onboarding-wizard";
import { FieldError, StepHeading } from "./step-shared";
import { useI18n, useT } from "@/lib/i18n/provider";
import { localizeCountry } from "@/lib/i18n/localize";

interface StepProps {
  draft: OnboardingDraft;
  update: (patch: Partial<OnboardingDraft>) => void;
  showErrors: boolean;
}

export function StepCompanyBasics({ draft, update, showErrors }: StepProps) {
  const t = useT();
  const { locale } = useI18n();
  const s = t.onboarding.step1;

  return (
    <div>
      <StepHeading title={s.title} description={s.description} />

      <div className="mt-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="company-name">{s.name}</Label>
          <Input
            id="company-name"
            value={draft.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder={s.namePlaceholder}
            aria-invalid={showErrors && !draft.name.trim()}
            aria-describedby={showErrors && !draft.name.trim() ? "company-name-error" : undefined}
          />
          {showErrors && !draft.name.trim() && (
            <FieldError id="company-name-error">{s.nameError}</FieldError>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="industry">{s.industry}</Label>
            <Select value={draft.industry} onValueChange={(v) => update({ industry: v })}>
              <SelectTrigger id="industry" aria-invalid={showErrors && !draft.industry}>
                <SelectValue placeholder={s.industryPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {INDUSTRIES.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {t.options.industries[industry as keyof typeof t.options.industries] ?? industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {showErrors && !draft.industry && <FieldError>{s.industryError}</FieldError>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="home-country">{s.country}</Label>
            <Select value={draft.homeCountry} onValueChange={(v) => update({ homeCountry: v })}>
              <SelectTrigger id="home-country" aria-invalid={showErrors && !draft.homeCountry}>
                <SelectValue placeholder={s.countryPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country} value={country}>
                    {localizeCountry(country, locale)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {showErrors && !draft.homeCountry && <FieldError>{s.countryError}</FieldError>}
          </div>
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-slate-800">{s.size}</legend>
          <p className="mt-1 text-sm text-slate-500">{s.sizeHint}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {COMPANY_SIZES.map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-colors focus-within:ring-2 focus-within:ring-navy-600 focus-within:ring-offset-2 ${
                  draft.size === option.value
                    ? "border-teal-500 bg-teal-50/60 font-medium text-navy-800"
                    : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name="company-size"
                  value={option.value}
                  checked={draft.size === option.value}
                  onChange={() => update({ size: option.value as CompanySize })}
                  className="h-4 w-4 accent-teal-600"
                />
                {t.options.sizes[option.value]}
              </label>
            ))}
          </div>
          {showErrors && !draft.size && <FieldError>{s.sizeError}</FieldError>}
        </fieldset>
      </div>
    </div>
  );
}
