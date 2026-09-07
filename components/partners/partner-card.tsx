"use client";

import { Check, MapPin, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { useAppStore } from "@/store/use-app-store";
import { getProvince } from "@/lib/mock-data";
import type { Partner, PartnerType } from "@/lib/types";

export const PARTNER_TYPE_LABELS: Record<PartnerType, string> = {
  distributor: "Distributor",
  "legal-advisor": "Legal advisor",
  logistics: "Logistics",
  "local-agent": "Local agent",
};

export function PartnerCard({ partner }: { partner: Partner }) {
  const requested = useAppStore((s) => s.requestedIntros.includes(partner.id));
  const requestIntro = useAppStore((s) => s.requestIntro);
  const { toast } = useToast();

  function handleRequest() {
    requestIntro(partner.id);
    toast(
      "Introduction requested",
      `We'll reach out to ${partner.name} and copy you on the introduction within two business days.`,
    );
  }

  return (
    <Card className="flex h-full flex-col">
      <CardContent className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold leading-tight text-navy-800">{partner.name}</h3>
            <p className="mt-1.5 flex items-center gap-1 text-sm text-slate-500">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {partner.city}, {getProvince(partner.province).name}
            </p>
          </div>
          <span
            className="shrink-0 rounded-md bg-teal-50 px-2 py-1 text-center"
            aria-label={`Match score ${partner.matchScore} out of 100`}
          >
            <span className="block text-sm font-semibold tabular-nums leading-none text-teal-700">
              {partner.matchScore}
            </span>
            <span className="mt-0.5 block text-[10px] uppercase tracking-wide text-teal-600">
              match
            </span>
          </span>
        </div>

        <div className="mt-3">
          <Badge variant="secondary">{PARTNER_TYPE_LABELS[partner.type]}</Badge>
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{partner.blurb}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {partner.focusAreas.map((area) => (
            <li
              key={area}
              className="rounded border border-slate-200 px-2 py-0.5 text-xs text-slate-500"
            >
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
              ? `Introduction already requested with ${partner.name}`
              : `Request an introduction to ${partner.name}`
          }
        >
          {requested ? (
            <>
              <Check className="h-4 w-4" aria-hidden="true" />
              Intro requested
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Request intro
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
