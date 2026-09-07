"use client";

import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "@/components/guide/status-badge";
import { useAppStore } from "@/store/use-app-store";
import { getLicenceById } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { ChecklistItem } from "@/lib/types";

export function ChecklistRow({ item }: { item: ChecklistItem }) {
  const toggle = useAppStore((s) => s.toggleChecklistItem);
  const remove = useAppStore((s) => s.removeChecklistItem);
  const licence = getLicenceById(item.licenceId);

  // Defensive: a persisted item could reference a licence no longer in mock data.
  if (!licence) return null;

  const inputId = `checklist-${item.licenceId}`;

  return (
    <li className="flex items-start gap-4 px-5 py-4">
      <Checkbox
        id={inputId}
        checked={item.completed}
        onCheckedChange={() => toggle(item.licenceId)}
        className="mt-0.5"
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <label
            htmlFor={inputId}
            className={cn(
              "cursor-pointer font-medium",
              item.completed ? "text-slate-400 line-through" : "text-navy-800",
            )}
          >
            {licence.name}
          </label>
          <StatusBadge status={licence.status} />
        </div>

        <p
          className={cn(
            "mt-1.5 text-sm leading-relaxed",
            item.completed ? "text-slate-400" : "text-slate-600",
          )}
        >
          {licence.description}
        </p>

        <p className="mt-2 text-xs text-slate-500">
          {licence.authority} · {licence.estimatedTimeline} · {licence.estimatedCost}
        </p>
      </div>

      <button
        type="button"
        onClick={() => remove(item.licenceId)}
        className="shrink-0 rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
        aria-label={`Remove ${licence.name} from your checklist`}
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
      </button>
    </li>
  );
}
