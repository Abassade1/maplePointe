"use client";

import { DEMO_USER } from "@/lib/mock-data";
import { useT, interpolate } from "@/lib/i18n/provider";
import { useAppStore } from "@/store/use-app-store";

export function UserMenu() {
  const t = useT();
  const company = useAppStore((s) => s.company);

  return (
    <div className="flex items-center gap-3">
      <div className="hidden text-right sm:block">
        <p className="text-sm font-medium leading-tight text-navy-800">{DEMO_USER.name}</p>
        <p className="text-xs leading-tight text-slate-500">
          {company?.name ?? DEMO_USER.role}
        </p>
      </div>
      <span
        className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-600 text-sm font-semibold text-white"
        aria-label={interpolate(t.common.signedInAs, { name: DEMO_USER.name })}
      >
        {DEMO_USER.initials}
      </span>
    </div>
  );
}
