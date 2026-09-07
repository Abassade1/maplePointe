import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Stable-enough id for client-only mock records. */
export function createId(prefix = "id"): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function formatTime(iso: string, tag = "en-CA"): string {
  return new Date(iso).toLocaleTimeString(tag, { hour: "2-digit", minute: "2-digit" });
}

type Loc = "en" | "fr";

/**
 * Compact CAD formatting. French Canadian convention puts the symbol after the
 * number with a non-breaking space: "50 k$ CA" rather than "CA$50K".
 */
export function formatCurrency(amount: number, locale: Loc = "en"): string {
  const fr = locale === "fr";
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000;
    const n = m % 1 === 0 ? m.toFixed(0) : m.toFixed(1);
    return fr ? `${n.replace(".", ",")} M$ CA` : `CA$${n}M`;
  }
  if (amount >= 1_000) {
    const k = Math.round(amount / 1_000);
    return fr ? `${k} k$ CA` : `CA$${k}K`;
  }
  return fr ? `${amount} $ CA` : `CA$${amount}`;
}

export function formatAmountRange(min: number, max: number, locale: Loc = "en"): string {
  return `${formatCurrency(min, locale)} – ${formatCurrency(max, locale)}`;
}

export function formatDate(date: Date, tag = "en-CA"): string {
  return date.toLocaleDateString(tag, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** e.g. 1860000 -> "1.86M" / "1,86 M", 62000 -> "62,000" / "62 000" */
export function formatPopulation(value: number, tag = "en-CA"): string {
  if (value >= 1_000_000) {
    const m = (value / 1_000_000).toFixed(2);
    return tag.startsWith("fr") ? `${m.replace(".", ",")} M` : `${m}M`;
  }
  return value.toLocaleString(tag);
}
