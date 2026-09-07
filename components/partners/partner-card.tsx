"use client";

import { Check, MapPin, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { useAppStore } from "@/store/use-app-store";
import { getProvince } from "@/lib/mock-data";
import { useI18n, useT, interpolate } from "@/lib/i18n/provider";
import { localizePartner, localizeProvince } from "@/lib/i18n/localize";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { Partner, PartnerType } from "@/lib/types";

export function partnerTypeLabel(type: PartnerType, t: Dictionary): string {
  const map: Record<PartnerType, string> = {
    distributor: t.partners.types.distributor,
    "legal-advisor": t.partners.types.legalAdvisor,
    logistics: t.partners.types.logistics,
    "local-agent": t.partners.types.localAgent,
  };
  return map[type];
}

export function PartnerCard({ partner: raw }: { partner: Partner }) {
  const t = useT();
  const { locale } = useI18n();
  const partner = localizePartner(raw, locale);
  const requested = useAppStore((s) => s.requestedIntros.includes(raw.id));
  const requestIntro = useAppStore((s) => s.requestIntro);
  const { toast } = useToast();

  function handleRequest() {
    requestIntro(raw.id);
    toast(t.partners.introToast, interpolate(t.partners.introToastBody, { name: partner.name }));
  }

  return (
    <Card className="flex h-full flex-col">
      <CardContent className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold leading-tight text-navy-800">{partner.name}</h3>
            <p className="mt-1.5 flex items-center gap-1 text-sm text-slate-500">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {partner.city}, {localizeProvince(getProvince(partner.province), locale).name}
            </p>
          </div>
          <span
            className="shrink-0 rounded-md bg-teal-50 px-2 py-1 text-center"
            aria-label={interpolate(t.common.matchScore, { score: partner.matchScore })}
          >
            <span className="block text-sm font-semibold tabular-nums leading-none text-teal-700">
              {partner.matchScore}
            </span>
            <span className="mt-0.5 block text-[10px] uppercase tracking-wide text-teal-600">
              {t.common.match}
            </span>
          </span>
        </div>

        <div className="mt-3">
          <Badge variant="secondary">{partnerTypeLabel(partner.type, t)}</Badge>
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{partner.blurb}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {partner.focusAreas.map((area) => (
            <li key={area} className="rounded border border-slate-200 px-2 py-0.5 text-xs text-slate-500">
              {area}
            </li>
          ))}
        </ul>

        <Button
          onClick={handleRequest}
          disabled={requested}
          variant={requested ? "secondary" : "outline"}
          className="mt-5 w-full"
          aria-label={
            requested
              ? interpolate(t.common.introRequestedAria, { name: partner.name })
              : interpolate(t.common.requestIntroAria, { name: partner.name })
          }
        >
          {requested ? (
            <>
              <Check className="h-4 w-4" aria-hidden="true" />
              {t.common.introRequested}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              {t.common.requestIntro}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
