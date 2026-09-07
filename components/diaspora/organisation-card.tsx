"use client";

import { Check, MapPin, Send, Users2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { useAppStore } from "@/store/use-app-store";
import { getProvince } from "@/lib/mock-data";
import { useI18n, useT, interpolate } from "@/lib/i18n/provider";
import { localizeOrganisation, localizeProvince } from "@/lib/i18n/localize";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { DiasporaOrganization, DiasporaOrgType } from "@/lib/types";

export function orgTypeLabel(type: DiasporaOrgType, t: Dictionary): string {
  const map: Record<DiasporaOrgType, string> = {
    chamber: t.diaspora.orgTypes.chamber,
    "business-network": t.diaspora.orgTypes.businessNetwork,
    "cultural-association": t.diaspora.orgTypes.culturalAssociation,
    incubator: t.diaspora.orgTypes.incubator,
  };
  return map[type];
}

export function OrganisationCard({ organisation: raw }: { organisation: DiasporaOrganization }) {
  const t = useT();
  const { locale, tag } = useI18n();
  const organisation = localizeOrganisation(raw, locale);
  const requested = useAppStore((s) => s.connections.includes(raw.id));
  const requestConnection = useAppStore((s) => s.requestConnection);
  const { toast } = useToast();

  function handleConnect() {
    requestConnection(raw.id);
    toast(
      t.partners.introToast,
      interpolate(t.diaspora.introToastBody, { name: organisation.name }),
    );
  }

  return (
    <Card className="flex h-full flex-col">
      <CardContent className="flex flex-1 flex-col p-6">
        <h3 className="font-semibold leading-tight text-navy-800">{organisation.name}</h3>

        <p className="mt-1.5 flex items-center gap-1 text-sm text-slate-500">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {organisation.city}, {localizeProvince(getProvince(organisation.province), locale).name}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{orgTypeLabel(organisation.type, t)}</Badge>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500">
            <Users2 className="h-3.5 w-3.5" aria-hidden="true" />
            {interpolate(t.diaspora.members, {
              count: organisation.memberCount.toLocaleString(tag),
            })}
          </span>
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{organisation.blurb}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {organisation.focusAreas.map((area) => (
            <li key={area} className="rounded border border-slate-200 px-2 py-0.5 text-xs text-slate-500">
              {area}
            </li>
          ))}
        </ul>

        <Button
          onClick={handleConnect}
          disabled={requested}
          variant={requested ? "secondary" : "outline"}
          className="mt-5 w-full"
          aria-label={
            requested
              ? interpolate(t.common.introRequestedAria, { name: organisation.name })
              : interpolate(t.common.requestIntroAria, { name: organisation.name })
          }
        >
          {requested ? (
            <><Check className="h-4 w-4" aria-hidden="true" />{t.common.introRequested}</>
          ) : (
            <><Send className="h-4 w-4" aria-hidden="true" />{t.common.requestIntro}</>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
