"use client";

import { Languages } from "lucide-react";
import { useT } from "@/lib/i18n/provider";
import type { ProvinceCode } from "@/lib/types";

export function BilingualCallout({ province }: { province: ProvinceCode }) {
  const t = useT();
  const b = t.guide.bilingual;
  const emphasis = province === "QC";

  const copy = emphasis
    ? { heading: b.quebecHeading, body: b.quebecBody, action: b.quebecAction }
    : { heading: b.federalHeading, body: b.federalBody, action: b.federalAction };

  return (
    <aside
      aria-labelledby="bilingual-callout-heading"
      className={`rounded-lg border p-5 ${
        emphasis ? "border-amber-200 bg-amber-50" : "border-navy-100 bg-navy-50/60"
      }`}
    >
      <div className="flex gap-3">
        <Languages
          className={`mt-0.5 h-5 w-5 shrink-0 ${emphasis ? "text-amber-700" : "text-navy-600"}`}
          aria-hidden="true"
        />
        <div>
          <h3
            id="bilingual-callout-heading"
            className={`font-semibold ${emphasis ? "text-amber-900" : "text-navy-800"}`}
          >
            {copy.heading}
          </h3>
          <p className={`mt-2 leading-relaxed ${emphasis ? "text-amber-900/90" : "text-navy-800/90"}`}>
            {copy.body}
          </p>
          <p
            className={`mt-3 border-t pt-3 text-sm leading-relaxed ${
              emphasis ? "border-amber-200 text-amber-900/90" : "border-navy-100 text-navy-800/90"
            }`}
          >
            {copy.action}
          </p>
        </div>
      </div>
    </aside>
  );
}
