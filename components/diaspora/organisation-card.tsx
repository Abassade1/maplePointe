"use client";

import { Check, MapPin, Send, Users2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { useAppStore } from "@/store/use-app-store";
import { ORG_TYPE_LABELS } from "@/lib/mock-diaspora";
import { getProvince } from "@/lib/mock-data";
import type { DiasporaOrganization } from "@/lib/types";

export function OrganisationCard({ organisation }: { organisation: DiasporaOrganization }) {
  const requested = useAppStore((s) => s.connections.includes(organisation.id));
  const requestConnection = useAppStore((s) => s.requestConnection);
  const { toast } = useToast();

  function handleConnect() {
    requestConnection(organisation.id);
    toast(
      "Introduction requested",
      `We'll introduce you to ${organisation.name} and copy you on the message within two business days.`,
    );
  }

  return (
    <Card className="flex h-full flex-col">
      <CardContent className="flex flex-1 flex-col p-6">
        <h3 className="font-semibold leading-tight text-navy-800">{organisation.name}</h3>

        <p className="mt-1.5 flex items-center gap-1 text-sm text-slate-500">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {organisation.city}, {getProvince(organisation.province).name}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{ORG_TYPE_LABELS[organisation.type]}</Badge>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500">
            <Users2 className="h-3.5 w-3.5" aria-hidden="true" />
            {organisation.memberCount.toLocaleString("en-CA")} members
          </span>
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{organisation.blurb}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {organisation.focusAreas.map((area) => (
            <li
              key={area}
              className="rounded border border-slate-200 px-2 py-0.5 text-xs text-slate-500"
            >
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
              ? `Introduction already requested with ${organisation.name}`
              : `Request an introduction to ${organisation.name}`
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
