"use client";

import { usePathname, useRouter } from "next/navigation";
import { Check, Languages } from "lucide-react";
import { useState } from "react";
import { LOCALES, LOCALE_NAMES, LOCALE_SHORT, stripLocale, withLocale } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

/**
 * Switches locale by rewriting the current path, so the choice is shareable
 * and the page keeps its place.
 */
export function LanguageSwitcher() {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function change(next: string) {
    setOpen(false);
    router.push(withLocale(stripLocale(pathname), next as (typeof LOCALES)[number]));
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.common.changeLanguage}
        className="flex h-9 items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
      >
        <Languages className="h-4 w-4 text-slate-500" aria-hidden="true" />
        {LOCALE_SHORT[locale]}
      </button>

      {open && (
        <>
          {/* Click-away layer */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden="true" />
          <ul
            role="listbox"
            aria-label={t.common.language}
            className="absolute right-0 z-50 mt-1 min-w-[10rem] overflow-hidden rounded-md border border-slate-200 bg-white py-1 shadow-md"
          >
            {LOCALES.map((code) => (
              <li key={code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={code === locale}
                  onClick={() => change(code)}
                  className={cn(
                    "flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-navy-50 focus-visible:outline-none focus-visible:bg-navy-50",
                    code === locale ? "font-medium text-navy-800" : "text-slate-700",
                  )}
                >
                  <span className="w-4 shrink-0">
                    {code === locale && (
                      <Check className="h-4 w-4 text-teal-600" aria-hidden="true" />
                    )}
                  </span>
                  {LOCALE_NAMES[code]}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
