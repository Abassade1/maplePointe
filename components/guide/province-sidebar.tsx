"use client";

import { getLicencesForProvince, getProvince } from "@/lib/mock-data";
import type { ProvinceCode } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/use-app-store";

interface ProvinceSidebarProps {
  provinces: ProvinceCode[];
  selected: ProvinceCode;
  onSelect: (code: ProvinceCode) => void;
}

export function ProvinceSidebar({ provinces, selected, onSelect }: ProvinceSidebarProps) {
  const checklist = useAppStore((s) => s.checklist);

  return (
    <nav aria-label="Provinces" className="lg:sticky lg:top-24 lg:self-start">
      <h2 className="mb-3 px-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Your provinces
      </h2>
      <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {provinces.map((code) => {
          const province = getProvince(code);
          const total = getLicencesForProvince(code).length;
          const tracked = checklist.filter((i) => i.province === code).length;
          const active = code === selected;

          return (
            <li key={code} className="shrink-0 lg:shrink">
              <button
                type="button"
                onClick={() => onSelect(code)}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "w-full min-w-[180px] rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 lg:min-w-0",
                  active
                    ? "border-navy-600 bg-navy-50"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
                )}
              >
                <span
                  className={cn(
                    "block font-medium",
                    active ? "text-navy-800" : "text-slate-700",
                  )}
                >
                  {province.name}
                </span>
                <span className="mt-0.5 block text-xs text-slate-500">
                  {tracked > 0 ? `${tracked} of ${total} tracked` : `${total} requirements`}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
