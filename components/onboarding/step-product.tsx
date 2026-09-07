"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { PRODUCT_CATEGORIES } from "@/lib/mock-data";
import type { ProductCategory } from "@/lib/types";
import type { OnboardingDraft } from "./onboarding-wizard";
import { FieldError, StepHeading } from "./step-shared";
import { useT, interpolate } from "@/lib/i18n/provider";

interface StepProps {
  draft: OnboardingDraft;
  update: (patch: Partial<OnboardingDraft>) => void;
  showErrors: boolean;
}

const MIN_DESCRIPTION = 20;

export function StepProduct({ draft, update, showErrors }: StepProps) {
  const t = useT();
  const s = t.onboarding.step2;
  const tooShort = draft.productDescription.trim().length < MIN_DESCRIPTION;

  return (
    <div>
      <StepHeading title={s.title} description={s.description} />

      <div className="mt-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="product-category">{s.category}</Label>
          <Select
            value={draft.productCategory}
            onValueChange={(v) => update({ productCategory: v as ProductCategory })}
          >
            <SelectTrigger id="product-category" aria-invalid={showErrors && !draft.productCategory}>
              <SelectValue placeholder={s.categoryPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {t.options.categories[category.value]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {showErrors && !draft.productCategory && <FieldError>{s.categoryError}</FieldError>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="product-description">{s.description_}</Label>
          <Textarea
            id="product-description"
            value={draft.productDescription}
            onChange={(e) => update({ productDescription: e.target.value })}
            placeholder={s.descriptionPlaceholder}
            className="min-h-[140px]"
            aria-invalid={showErrors && tooShort}
            aria-describedby="product-description-hint"
          />
          <div className="flex items-center justify-between">
            <p id="product-description-hint" className="text-sm text-slate-500">
              {s.descriptionHint}
            </p>
            <p className="shrink-0 pl-4 text-sm tabular-nums text-slate-400">
              {draft.productDescription.trim().length}/{MIN_DESCRIPTION}
            </p>
          </div>
          {showErrors && tooShort && (
            <FieldError>{interpolate(s.descriptionError, { min: MIN_DESCRIPTION })}</FieldError>
          )}
        </div>
      </div>
    </div>
  );
}
