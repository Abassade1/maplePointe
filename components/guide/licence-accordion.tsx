"use client";

import { Banknote, Building2, Check, Clock, Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./status-badge";
import { useToast } from "@/components/ui/toast";
import { useAppStore } from "@/store/use-app-store";
import type { LicenceItem } from "@/lib/types";

const CATEGORY_LABELS: Record<LicenceItem["category"], string> = {
  registration: "Registration",
  tax: "Tax",
  permit: "Permit",
  labelling: "Labelling",
  employment: "Employment",
  import: "Import",
};

export function LicenceAccordion({ licences }: { licences: LicenceItem[] }) {
  const checklist = useAppStore((s) => s.checklist);
  const addChecklistItem = useAppStore((s) => s.addChecklistItem);
  const { toast } = useToast();

  function handleReview(licence: LicenceItem) {
    addChecklistItem(licence);
    toast("Added to your checklist", `${licence.name} is now tracked under your compliance checklist.`);
  }

  return (
    <Accordion type="multiple" className="rounded-lg border border-slate-200 bg-white px-5">
      {licences.map((licence) => {
        const tracked = checklist.some((i) => i.licenceId === licence.id);

        return (
          <AccordionItem key={licence.id} value={licence.id} className="last:border-b-0">
            <AccordionTrigger>
              <span className="flex min-w-0 flex-1 flex-col gap-2 pr-2 sm:flex-row sm:items-center sm:gap-3">
                <span className="min-w-0 flex-1 text-base font-medium text-navy-800">
                  {licence.name}
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  {tracked && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-teal-700">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                      Tracked
                    </span>
                  )}
                  <StatusBadge status={licence.status} />
                </span>
              </span>
            </AccordionTrigger>

            <AccordionContent>
              <p className="max-w-3xl leading-relaxed text-slate-600">{licence.description}</p>

              <dl className="mt-5 grid gap-4 sm:grid-cols-3">
                <MetaField icon={Building2} label="Issuing authority" value={licence.authority} />
                <MetaField icon={Clock} label="Typical timeline" value={licence.estimatedTimeline} />
                <MetaField icon={Banknote} label="Estimated cost" value={licence.estimatedCost} />
              </dl>

              <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
                <Button
                  size="sm"
                  variant={tracked ? "secondary" : "accent"}
                  onClick={() => handleReview(licence)}
                  disabled={tracked}
                  aria-label={
                    tracked
                      ? `${licence.name} is already on your checklist`
                      : `Mark ${licence.name} as reviewed and add to checklist`
                  }
                >
                  {tracked ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" />
                      On your checklist
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" aria-hidden="true" />
                      Mark as reviewed
                    </>
                  )}
                </Button>
                <span className="text-xs text-slate-500">
                  {CATEGORY_LABELS[licence.category]}
                </span>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

function MetaField({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
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
