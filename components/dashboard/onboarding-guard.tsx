"use client";

import { ClipboardList } from "lucide-react";
import { useAppStore } from "@/store/use-app-store";
import { EmptyState } from "./empty-state";

/**
 * Every dashboard screen depends on the onboarding profile. Rather than
 * redirecting (which reads badly in a demo), we show a clear route back.
 */
export function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const company = useAppStore((s) => s.company);

  if (!company) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="Complete your assessment first"
        description="We need a few details about your company before we can map your entry into Canada. It takes about two minutes."
        actionLabel="Start your assessment"
        actionHref="/onboarding"
      />
    );
  }

  return <>{children}</>;
}
