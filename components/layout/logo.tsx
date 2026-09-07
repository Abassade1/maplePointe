import { cn } from "@/lib/utils";

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md",
          inverted ? "bg-white" : "bg-navy-600",
        )}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className={cn("h-5 w-5", inverted ? "text-navy-600" : "text-white")} fill="none">
          <path d="M5.5 13.5 12 7l6.5 6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 17.5h12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </span>
      <span className={cn("text-lg font-semibold tracking-tight", inverted ? "text-white" : "text-navy-800")}>
        Northgate<span className={inverted ? "text-teal-300" : "text-teal-500"}> AI</span>
      </span>
    </span>
  );
}
