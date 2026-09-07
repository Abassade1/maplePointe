import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  steps: string[];
  current: number;
}

export function StepIndicator({ steps, current }: StepIndicatorProps) {
  const percent = Math.round(((current + 1) / steps.length) * 100);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-600">
          Step {current + 1} of {steps.length}
        </p>
        <p className="text-sm text-slate-500">{percent}% complete</p>
      </div>

      <div
        className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Onboarding progress"
      >
        <div
          className="h-full rounded-full bg-teal-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ol className="mt-6 hidden items-center gap-2 sm:flex">
        {steps.map((label, index) => {
          const done = index < current;
          const active = index === current;
          return (
            <li key={label} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  done && "bg-teal-500 text-white",
                  active && "bg-navy-600 text-white",
                  !done && !active && "bg-slate-200 text-slate-500",
                )}
                aria-hidden="true"
              >
                {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : index + 1}
              </span>
              <span
                className={cn(
                  "truncate text-xs font-medium",
                  active ? "text-navy-800" : "text-slate-500",
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
