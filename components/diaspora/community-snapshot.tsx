"use client";

import { Globe2, Languages, Users2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getProvince } from "@/lib/mock-data";
import { formatPopulation } from "@/lib/utils";
import { useI18n, useT, interpolate } from "@/lib/i18n/provider";
import { localizeProvince } from "@/lib/i18n/localize";
import type { DiasporaCommunity } from "@/lib/types";

interface CommunitySnapshotProps {
  community: DiasporaCommunity;
  /** Country name, used in the no-profile notice. */
  country: string;
  /** How to name the community in prose — an adjective in French. */
  communityLabel: string;
  /** False when we fell back to the generic profile. */
  hasProfile: boolean;
}

export function CommunitySnapshot({
  community,
  country,
  communityLabel,
  hasProfile,
}: CommunitySnapshotProps) {
  const t = useT();
  const { locale, tag } = useI18n();
  const shares = [...community.provinceShares].sort((a, b) => b.share - a.share);

  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-semibold tracking-tight text-navy-800">
            {hasProfile
              ? interpolate(t.diaspora.communityIn, { community: communityLabel })
              : t.diaspora.communitiesGeneric}
          </h2>
        </div>

        <dl className="mt-6 grid gap-6 sm:grid-cols-3">
          <div>
            <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <Users2 className="h-3.5 w-3.5" aria-hidden="true" />
              {t.diaspora.communitySize}
            </dt>
            <dd className="mt-1.5 text-2xl font-semibold tabular-nums text-navy-800">
              {formatPopulation(community.populationEstimate, tag)}
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <Globe2 className="h-3.5 w-3.5" aria-hidden="true" />
              {t.diaspora.largestConcentration}
            </dt>
            <dd className="mt-1.5 font-medium text-navy-800">
              {shares[0].metro}
              <span className="ml-1.5 text-sm font-normal text-slate-500">{shares[0].share} %</span>
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <Languages className="h-3.5 w-3.5" aria-hidden="true" />
              {t.diaspora.workingLanguages}
            </dt>
            <dd className="mt-1.5 text-sm text-slate-800">{community.languages.join(", ")}</dd>
          </div>
        </dl>

        <section aria-labelledby="distribution-heading" className="mt-8">
          <h3 id="distribution-heading" className="text-sm font-semibold text-navy-800">
            {t.diaspora.whereTheyLive}
          </h3>
          <ul className="mt-4 space-y-3">
            {shares.map((share) => {
              const provinceName = localizeProvince(getProvince(share.province), locale).name;
              return (
                <li key={share.province} className="flex items-center gap-4">
                  <span className="w-36 shrink-0 text-sm font-medium text-slate-700">
                    {provinceName}
                  </span>
                  <span
                    className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100"
                    role="img"
                    aria-label={interpolate(t.diaspora.distributionAria, {
                      province: provinceName,
                      share: share.share,
                      metro: share.metro,
                    })}
                  >
                    <span
                      className="block h-full rounded-full bg-teal-500"
                      style={{ width: `${share.share}%` }}
                    />
                  </span>
                  <span className="w-12 shrink-0 text-right text-sm tabular-nums text-slate-600">
                    {share.share} %
                  </span>
                  <span className="hidden w-44 shrink-0 truncate text-sm text-slate-500 sm:block">
                    {share.metro}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="mt-8 space-y-4 border-t border-slate-100 pt-6">
          {community.insight.map((paragraph, index) => (
            <p key={index} className="max-w-3xl leading-relaxed text-slate-700">{paragraph}</p>
          ))}
        </div>

        {!hasProfile && (
          <p className="mt-6 rounded-lg border border-navy-100 bg-navy-50/60 p-4 text-sm leading-relaxed text-navy-800">
            {interpolate(t.diaspora.noProfile, { country })}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
