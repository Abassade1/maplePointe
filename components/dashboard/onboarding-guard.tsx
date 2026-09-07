"use client";

import { ClipboardList } from "lucide-react";
import { useAppStore } from "@/store/use-app-store";
import { useT } from "@/lib/i18n/provider";
import { EmptyState } from "./empty-state";

export function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const t = useT();
  const company = useAppStore((s) => s.company);

  if (!company) {
    return (
      <EmptyState
        icon={ClipboardList}
        title={t.dashboard.guard.title}
        description={t.dashboard.guard.body}
        actionLabel={t.dashboard.guard.cta}
        actionHref="/onboarding"
      />
    );
  }

  return <>{children}</>;
}
