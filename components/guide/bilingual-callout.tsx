import { Languages } from "lucide-react";
import type { ProvinceCode } from "@/lib/types";

const QUEBEC_COPY = {
  heading: "French-language requirements apply here",
  body:
    "Quebec's Charter of the French Language governs labelling, packaging, warranties, instructions, public signage, websites, and employment documentation. French must appear at least as prominently as any other language, and a non-French trademark on signage needs a sufficient French descriptor alongside it.",
  action:
    "Budget CA$1,500–CA$8,000 per SKU family and 6–12 weeks for artwork revision. If your headcount is at or above the Law 14 threshold, you must also register with the OQLF and complete a francisation process.",
};

const FEDERAL_COPY = {
  heading: "Bilingual labelling still applies outside Quebec",
  body:
    "The federal Consumer Packaging and Labelling Act requires product identity and net quantity declarations in both English and French on consumer prepackaged goods sold anywhere in Canada — including provinces with no French-language legislation of their own.",
  action:
    "Design bilingual artwork once, up front. Entrants who produce English-only packaging for a first province routinely pay for a second production run when they expand.",
};

export function BilingualCallout({ province }: { province: ProvinceCode }) {
  const copy = province === "QC" ? QUEBEC_COPY : FEDERAL_COPY;
  const emphasis = province === "QC";

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
