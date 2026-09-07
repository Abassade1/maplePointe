"use client";

import { Banknote, Building2, Check, Clock, Plus } from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./status-badge";
import { useToast } from "@/components/ui/toast";
import { useAppStore } from "@/store/use-app-store";
import { useI18n, useT, interpolate } from "@/lib/i18n/provider";
import { localizeLicence } from "@/lib/i18n/localize";
import type { LicenceItem } from "@/lib/types";

export function LicenceAccordion({ licences }: { licences: LicenceItem[] }) {
  const t = useT();
  const { locale } = useI18n();
  const checklist = useAppStore((s) => s.checklist);
  const addChecklistItem = useAppStore((s) => s.addChecklistItem);
  const { toast } = useToast();

  const categoryLabels: Record<LicenceItem["category"], string> = {
    registration: t.guide.categories.registration,
    tax: t.guide.categories.tax,
    permit: t.guide.categories.permit,
    labelling: t.guide.categories.labelling,
    employment: t.guide.categories.employment,
    import: t.guide.categories.import,
  };

  function handleReview(licence: LicenceItem, displayName: string) {
    // Store the canonical record; display names come from the overlay at render.
    addChecklistItem(licence);
    toast(t.guide.addedToast, interpolate(t.guide.addedToastBody, { name: displayName }));
  }

  return (
    <Accordion type="multiple" className="rounded-lg border border-slate-200 bg-white px-5">
      {licences.map((raw) => {
        const licence = localizeLicence(raw, locale);
        const tracked = checklist.some((i) => i.licenceId === raw.id);

        return (
          <AccordionItem key={raw.id} value={raw.id} className="last:border-b-0">
            <AccordionTrigger>
              <span className="flex min-w-0 flex-1 flex-col gap-2 pr-2 sm:flex-row sm:items-center sm:gap-3">
                <span className="min-w-0 flex-1 text-base font-medium text-navy-800">
                  {licence.name}
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  {tracked && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-teal-700">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                      {t.guide.trackedLabel}
                    </span>
                  )}
                  <StatusBadge status={licence.status} />
                </span>
              </span>
            </AccordionTrigger>

            <AccordionContent>
              <p className="max-w-3xl leading-relaxed text-slate-600">{licence.description}</p>

              <dl className="mt-5 grid gap-4 sm:grid-cols-3">
                <MetaField icon={Building2} label={t.guide.authority} value={licence.authority} />
                <MetaField icon={Clock} label={t.guide.timeline} value={licence.estimatedTimeline} />
                <MetaField icon={Banknote} label={t.guide.cost} value={licence.estimatedCost} />
              </dl>

              <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
                <Button
                  size="sm"
                  variant={tracked ? "secondary" : "accent"}
                  onClick={() => handleReview(raw, licence.name)}
                  disabled={tracked}
                  aria-label={
                    tracked
                      ? interpolate(t.guide.alreadyOnChecklist, { name: licence.name })
                      : interpolate(t.guide.markReviewedAria, { name: licence.name })
                  }
                >
                  {tracked ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" />
                      {t.guide.onChecklist}
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" aria-hidden="true" />
                      {t.guide.markReviewed}
                    </>
                  )}
                </Button>
                <span className="text-xs text-slate-500">{categoryLabels[licence.category]}</span>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

function MetaField({
  icon: Icon, label, value,
}: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        {label}
      </dt>
      <dd className="mt-1.5 text-sm text-slate-800">{value}</dd>
    </div>
  );
}
