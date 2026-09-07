"use client";

import { DEMO_USER } from "@/lib/mock-data";
import { useAppStore } from "@/store/use-app-store";

export function UserMenu() {
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
        aria-label={`Signed in as ${DEMO_USER.name}`}
      >
        {DEMO_USER.initials}
      </span>
    </div>
  );
}
