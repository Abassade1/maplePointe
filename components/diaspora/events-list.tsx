"use client";

import { Calendar, MapPin, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getEventDate } from "@/lib/mock-diaspora";
import { getProvince } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { useI18n, useT, interpolate } from "@/lib/i18n/provider";
import { localizeEvent, localizeProvince } from "@/lib/i18n/localize";
import type { DiasporaEvent, EventFormat } from "@/lib/types";

export function EventsList({ events }: { events: DiasporaEvent[] }) {
  const t = useT();
  const { locale, tag } = useI18n();

  const formatLabels: Record<EventFormat, string> = {
    "in-person": t.diaspora.eventFormats.inPerson,
    virtual: t.diaspora.eventFormats.virtual,
    hybrid: t.diaspora.eventFormats.hybrid,
  };

  return (
    <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
      {events.map((raw) => {
        const event = localizeEvent(raw, locale);
        const date = getEventDate(event.daysFromNow);

        return (
          <li key={event.id} className="flex gap-4 px-5 py-4">
            <div
              className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-navy-50"
              aria-hidden="true"
            >
              <span className="text-xs font-medium uppercase tracking-wide text-navy-600">
                {date.toLocaleDateString(tag, { month: "short" })}
              </span>
              <span className="text-lg font-semibold leading-none text-navy-800">
                {date.getDate()}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <h3 className="font-medium text-navy-800">{event.title}</h3>
                <Badge variant="outline">{formatLabels[event.format]}</Badge>
              </div>

              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{event.description}</p>

              <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <time dateTime={date.toISOString()}>{formatDate(date, tag)}</time>
                </span>
                <span className="flex items-center gap-1">
                  {event.format === "virtual" ? (
                    <Video className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  ) : (
                    <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  )}
                  {event.city}, {localizeProvince(getProvince(event.province), locale).name}
                </span>
                <span>{interpolate(t.diaspora.hostedBy, { host: event.host })}</span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
