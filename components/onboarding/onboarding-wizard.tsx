"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StepIndicator } from "./step-indicator";
import { StepCompanyBasics } from "./step-company-basics";
import { StepProduct } from "./step-product";
import { StepProvinces } from "./step-provinces";
import { StepGoals } from "./step-goals";
import { useAppStore } from "@/store/use-app-store";
import { useI18n, useT } from "@/lib/i18n/provider";
import { withLocale } from "@/lib/i18n/config";
import type { CompanySize, EntryGoal, ProductCategory, ProvinceCode } from "@/lib/types";

export interface OnboardingDraft {
  name: string;
  industry: string;
  homeCountry: string;
  size: CompanySize | "";
  productDescription: string;
  productCategory: ProductCategory | "";
  targetProvinces: ProvinceCode[];
  goals: EntryGoal[];
}

const INITIAL_DRAFT: OnboardingDraft = {
  name: "",
  industry: "",
  homeCountry: "",
  size: "",
  productDescription: "",
  productCategory: "",
  targetProvinces: [],
  goals: [],
};

export function OnboardingWizard() {
  const router = useRouter();
  const t = useT();
  const { locale } = useI18n();
  const setCompany = useAppStore((s) => s.setCompany);

  const STEPS = [
    t.onboarding.steps.company,
    t.onboarding.steps.product,
    t.onboarding.steps.provinces,
    t.onboarding.steps.goals,
  ];

  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<OnboardingDraft>(INITIAL_DRAFT);
  const [submitting, setSubmitting] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  function update(patch: Partial<OnboardingDraft>) {
    setDraft((d) => ({ ...d, ...patch }));
  }

  const stepValid = ((): boolean => {
    switch (step) {
      case 0:
        return Boolean(draft.name.trim() && draft.industry && draft.homeCountry && draft.size);
      case 1:
        return Boolean(draft.productDescription.trim().length >= 20 && draft.productCategory);
      case 2:
        return draft.targetProvinces.length > 0;
      case 3:
        return draft.goals.length > 0;
      default:
        return false;
    }
  })();

  function handleNext() {
    if (!stepValid) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    handleSubmit();
  }

  function handleSubmit() {
    setSubmitting(true);
    // Simulated persistence delay so the transition reads as a real submission.
    setTimeout(() => {
      setCompany({
        name: draft.name.trim(),
        industry: draft.industry,
        homeCountry: draft.homeCountry,
        size: draft.size as CompanySize,
        productDescription: draft.productDescription.trim(),
        productCategory: draft.productCategory as ProductCategory,
        targetProvinces: draft.targetProvinces,
        goals: draft.goals,
        completedAt: new Date().toISOString(),
      });
      router.push(withLocale("/dashboard", locale));
    }, 900);
  }

  function handleBack() {
    setShowErrors(false);
    setStep((s) => Math.max(0, s - 1));
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-navy-800">
          {t.onboarding.title}
        </h1>
        <p className="mt-2 text-slate-600">{t.onboarding.subtitle}</p>
      </div>

      <StepIndicator steps={STEPS} current={step} />

      <Card className="mt-8">
        <CardContent className="p-6 sm:p-8">
          {step === 0 && <StepCompanyBasics draft={draft} update={update} showErrors={showErrors} />}
          {step === 1 && <StepProduct draft={draft} update={update} showErrors={showErrors} />}
          {step === 2 && <StepProvinces draft={draft} update={update} showErrors={showErrors} />}
          {step === 3 && <StepGoals draft={draft} update={update} showErrors={showErrors} />}
        </CardContent>
      </Card>

      <div className="mt-6 flex items-center justify-between">
        <Button variant="ghost" onClick={handleBack} disabled={step === 0 || submitting}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t.common.back}
        </Button>

        <Button onClick={handleNext} disabled={submitting} size="lg">
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              {t.onboarding.building}
            </>
          ) : step === STEPS.length - 1 ? (
            <>
              {t.onboarding.generatePlan}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          ) : (
            <>
              {t.common.continue}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
