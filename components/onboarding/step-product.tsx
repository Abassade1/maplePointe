"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRODUCT_CATEGORIES } from "@/lib/mock-data";
import type { ProductCategory } from "@/lib/types";
import type { OnboardingDraft } from "./onboarding-wizard";
import { FieldError, StepHeading } from "./step-shared";

interface StepProps {
  draft: OnboardingDraft;
  update: (patch: Partial<OnboardingDraft>) => void;
  showErrors: boolean;
}

const MIN_DESCRIPTION = 20;

export function StepProduct({ draft, update, showErrors }: StepProps) {
  const tooShort = draft.productDescription.trim().length < MIN_DESCRIPTION;

  return (
    <div>
      <StepHeading
        title="What are you bringing to market?"
        description="Product type drives most of the compliance picture — packaged goods carry labelling obligations that software does not."
      />

      <div className="mt-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="product-category">Product category</Label>
          <Select
            value={draft.productCategory}
            onValueChange={(v) => update({ productCategory: v as ProductCategory })}
          >
            <SelectTrigger id="product-category" aria-invalid={showErrors && !draft.productCategory}>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {showErrors && !draft.productCategory && <FieldError>Select a product category.</FieldError>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="product-description">Product or service description</Label>
          <Textarea
            id="product-description"
            value={draft.productDescription}
            onChange={(e) => update({ productDescription: e.target.value })}
            placeholder="We produce shelf-stable organic soups in recyclable cartons, currently sold through grocery retail across Scandinavia."
            className="min-h-[140px]"
            aria-invalid={showErrors && tooShort}
            aria-describedby="product-description-hint"
          />
          <div className="flex items-center justify-between">
            <p id="product-description-hint" className="text-sm text-slate-500">
              A sentence or two is enough. Mention packaging or regulated ingredients if relevant.
            </p>
            <p className="shrink-0 pl-4 text-sm tabular-nums text-slate-400">
              {draft.productDescription.trim().length}/{MIN_DESCRIPTION}
            </p>
          </div>
          {showErrors && tooShort && (
            <FieldError>Add at least {MIN_DESCRIPTION} characters so we can tailor the guidance.</FieldError>
          )}
        </div>
      </div>
    </div>
  );
}
