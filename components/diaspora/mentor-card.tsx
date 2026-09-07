"use client";

import { Check, Languages, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { useAppStore } from "@/store/use-app-store";
import { getProvince } from "@/lib/mock-data";
import { useI18n, useT, interpolate } from "@/lib/i18n/provider";
import { localizeMentor, localizeProvince } from "@/lib/i18n/localize";
import { FR_LANGUAGES } from "@/lib/i18n/content/fr-module3";
import type { DiasporaMentor } from "@/lib/types";

function initials(name: string): string {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("");
}

export function MentorCard({ mentor: raw }: { mentor: DiasporaMentor }) {
  const t = useT();
  const { locale } = useI18n();
  const mentor = localizeMentor(raw, locale);
  const requested = useAppStore((s) => s.connections.includes(raw.id));
  const requestConnection = useAppStore((s) => s.requestConnection);
  const { toast } = useToast();

  const languages =
    locale === "fr"
      ? mentor.languages.map((l) => FR_LANGUAGES[l] ?? l)
      : mentor.languages;

  function handleConnect() {
    requestConnection(raw.id);
    toast(t.partners.introToast, interpolate(t.mentors.introToastBody, { name: mentor.name }));
  }

  return (
    <Card className="flex h-full flex-col">
      <CardContent className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 gap-3">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-600 text-sm font-semibold text-white"
              aria-hidden="true"
            >
              {initials(mentor.name)}
            </span>
            <div className="min-w-0">
              <h3 className="font-semibold leading-tight text-navy-800">{mentor.name}</h3>
              <p className="mt-1 text-sm leading-snug text-slate-600">
                {mentor.role}, {mentor.company}
              </p>
            </div>
          </div>
          <span
            className="shrink-0 rounded-md bg-teal-50 px-2 py-1 text-center"
            aria-label={interpolate(t.common.matchScore, { score: mentor.matchScore })}
          >
            <span className="block text-sm font-semibold tabular-nums leading-none text-teal-700">
              {mentor.matchScore}
            </span>
            <span className="mt-0.5 block text-[10px] uppercase tracking-wide text-teal-600">
              {t.common.match}
            </span>
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {mentor.city}, {localizeProvince(getProvince(mentor.province), locale).name}
          </span>
          <span>{interpolate(t.mentors.yearsInCanada, { years: mentor.yearsInCanada })}</span>
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{mentor.blurb}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {mentor.expertise.map((area) => (
            <li key={area} className="rounded border border-slate-200 px-2 py-0.5 text-xs text-slate-500">
              {area}
            </li>
          ))}
        </ul>

        <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
          <Languages className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {languages.join(", ")}
        </p>

        <Button
          onClick={handleConnect}
          disabled={requested}
          variant={requested ? "secondary" : "accent"}
          className="mt-5 w-full"
          aria-label={
            requested
              ? interpolate(t.common.introRequestedAria, { name: mentor.name })
              : interpolate(t.common.requestIntroAria, { name: mentor.name })
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
