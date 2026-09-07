"use client";

import { useEffect, useState } from "react";
import { Map } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/dashboard/page-header";
import { OnboardingGuard } from "@/components/dashboard/onboarding-guard";
import { EmptyState } from "@/components/dashboard/empty-state";
import { LicenceAccordion } from "./licence-accordion";
import { BilingualCallout } from "./bilingual-callout";
import { ProvinceSidebar } from "./province-sidebar";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { useAppStore } from "@/store/use-app-store";
import { PROVINCE_OVERVIEWS, getLicencesForProvince, getProvince } from "@/lib/mock-data";
import type { ProvinceCode } from "@/lib/types";

export function ProvinceGuide() {
  const loading = useSimulatedLoading();

  if (loading) return <GuideSkeleton />;

  return (
    <OnboardingGuard>
      <GuideContent />
    </OnboardingGuard>
  );
}

function GuideContent() {
  const company = useAppStore((s) => s.company)!;
  const targets = company.targetProvinces;
  const [selected, setSelected] = useState<ProvinceCode | null>(targets[0] ?? null);

  // Keep the selection valid if the profile changes underneath us.
  useEffect(() => {
    if (targets.length > 0 && (!selected || !targets.includes(selected))) {
      setSelected(targets[0]);
    }
  }, [targets, selected]);

  if (targets.length === 0 || !selected) {
    return (
      <EmptyState
        icon={Map}
        title="No provinces selected"
        description="Your assessment did not include any target provinces. Run it again to pick where you want to enter."
        actionLabel="Update your assessment"
        actionHref="/onboarding"
      />
    );
  }

  const province = getProvince(selected);
  const licences = getLicencesForProvince(selected);
  const requiredCount = licences.filter((l) => l.status === "required").length;

  return (
    <div>
      <PageHeader
        title="Province Guide"
        description="Registration steps, licences, and compliance obligations for each province you are considering."
      />

      <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <ProvinceSidebar provinces={targets} selected={selected} onSelect={setSelected} />

        <div className="min-w-0">
          {/* Province overview */}
          <Card>
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-semibold tracking-tight text-navy-800">
                  {province.name}
                </h2>
                <Badge variant="outline">{province.primaryCity}</Badge>
                {province.bilingualSensitive && (
                  <Badge variant="required">French-language regime</Badge>
                )}
              </div>
              <p className="mt-2 text-slate-600">{province.tagline}</p>

              <div className="mt-6 space-y-4">
                {PROVINCE_OVERVIEWS[selected].map((paragraph, index) => (
                  <p key={index} className="max-w-3xl leading-relaxed text-slate-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bilingual compliance callout */}
          <div className="mt-6">
            <BilingualCallout province={selected} />
          </div>

          {/* Licence list */}
          <section aria-labelledby="licences-heading" className="mt-8">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 id="licences-heading" className="text-lg font-semibold text-navy-800">
                  Licences &amp; registrations
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  {licences.length} items identified · {requiredCount} required. Expand any item and
                  mark it reviewed to add it to your compliance checklist.
                </p>
              </div>
            </div>

            <LicenceAccordion licences={licences} />
          </section>

          <p className="mt-6 text-xs leading-relaxed text-slate-500">
            Figures shown are illustrative planning estimates for this demonstration and do not
            constitute legal or tax advice. Confirm current fees and timelines with the issuing
            authority before filing.
          </p>
        </div>
      </div>
    </div>
  );
}

function GuideSkeleton() {
  return (
    <div>
      <Skeleton className="h-9 w-64" />
      <Skeleton className="mt-3 h-5 w-[28rem] max-w-full" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
        <div>
          <Skeleton className="h-72 w-full rounded-lg" />
          <Skeleton className="mt-6 h-32 w-full rounded-lg" />
          <Skeleton className="mt-8 h-80 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
