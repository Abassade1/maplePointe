"use client";

import { ENTRY_GOALS } from "@/lib/mock-data";
import type { EntryGoal } from "@/lib/types";
import { MultiSelectCard } from "./multi-select-card";
import type { OnboardingDraft } from "./onboarding-wizard";
import { FieldError, StepHeading } from "./step-shared";
import { useT } from "@/lib/i18n/provider";

interface StepProps {
  draft: OnboardingDraft;
  update: (patch: Partial<OnboardingDraft>) => void;
  showErrors: boolean;
}

export function StepGoals({ draft, update, showErrors }: StepProps) {
  const t = useT();
  const s = t.onboarding.step4;

  function toggle(goal: EntryGoal) {
    const next = draft.goals.includes(goal)
      ? draft.goals.filter((g) => g !== goal)
      : [...draft.goals, goal];
    update({ goals: next });
  }

  return (
    <div>
      <StepHeading title={s.title} description={s.description} />

      <fieldset className="mt-8">
        <legend className="sr-only">{s.legend}</legend>
        <div className="grid gap-3">
          {ENTRY_GOALS.map((goal) => (
            <MultiSelectCard
              key={goal.value}
              selected={draft.goals.includes(goal.value)}
              title={t.options.goals[goal.value]}
              description={t.options.goals[`${goal.value}Desc` as keyof typeof t.options.goals]}
              onToggle={() => toggle(goal.value)}
            />
          ))}
        </div>
      </fieldset>

      {showErrors && draft.goals.length === 0 && (
        <div className="mt-3">
          <FieldError>{s.error}</FieldError>
        </div>
      )}
    </div>
  );
}
