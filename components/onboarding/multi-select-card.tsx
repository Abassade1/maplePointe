"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiSelectCardProps {
  selected: boolean;
  title: string;
  description?: string;
  onToggle: () => void;
}

export function MultiSelectCard({ selected, title, description, onToggle }: MultiSelectCardProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      onClick={onToggle}
      className={cn(
        "flex w-full items-start gap-3 rounded-lg border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2",
        selected
          ? "border-teal-500 bg-teal-50/60"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border",
          selected ? "border-teal-500 bg-teal-500 text-white" : "border-slate-300 bg-white",
        )}
        aria-hidden="true"
      >
        {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      </span>
      <span className="min-w-0">
        <span className="block font-medium text-navy-800">{title}</span>
        {description && (
          <span className="mt-1 block text-sm leading-relaxed text-slate-600">{description}</span>
        )}
      </span>
    </button>
  );
}
