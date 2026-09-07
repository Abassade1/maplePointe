"use client";

import { ENTRY_GOALS } from "@/lib/mock-data";
import type { EntryGoal } from "@/lib/types";
import { MultiSelectCard } from "./multi-select-card";
import type { OnboardingDraft } from "./onboarding-wizard";
import { FieldError, StepHeading } from "./step-shared";

interface StepProps {
  draft: OnboardingDraft;
  update: (patch: Partial<OnboardingDraft>) => void;
  showErrors: boolean;
}

export function StepGoals({ draft, update, showErrors }: StepProps) {
  function toggle(goal: EntryGoal) {
    const next = draft.goals.includes(goal)
      ? draft.goals.filter((g) => g !== goal)
      : [...draft.goals, goal];
    update({ goals: next });
  }

  return (
    <div>
      <StepHeading
        title="What do you most need help with?"
        description="Select everything that applies. This orders what we surface first on your dashboard."
      />

      <fieldset className="mt-8">
        <legend className="sr-only">Market entry goals</legend>
        <div className="grid gap-3">
          {ENTRY_GOALS.map((goal) => (
            <MultiSelectCard
              key={goal.value}
              selected={draft.goals.includes(goal.value)}
              title={goal.label}
              description={goal.description}
              onToggle={() => toggle(goal.value)}
            />
          ))}
        </div>
      </fieldset>

      {showErrors && draft.goals.length === 0 && (
        <div className="mt-3">
          <FieldError>Select at least one goal.</FieldError>
        </div>
      )}
    </div>
  );
}
