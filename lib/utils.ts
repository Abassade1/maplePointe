import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Stable-enough id for client-only mock records. */
export function createId(prefix = "id"): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/** Compact CAD formatting for funding amounts, e.g. "CA$50K", "CA$3.0M". */
export function formatCurrency(amount: number): string {
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    return `CA$${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1)}M`;
  }
  if (amount >= 1_000) return `CA$${Math.round(amount / 1_000)}K`;
  return `CA$${amount}`;
}

export function formatAmountRange(min: number, max: number): string {
  return `${formatCurrency(min)} – ${formatCurrency(max)}`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-CA", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** e.g. 1860000 -> "1.86M", 62000 -> "62,000" */
export function formatPopulation(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  return value.toLocaleString("en-CA");
}
