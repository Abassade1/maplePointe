import { Globe2, Languages, Users2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getProvince } from "@/lib/mock-data";
import { formatPopulation } from "@/lib/utils";
import type { DiasporaCommunity } from "@/lib/types";

interface CommunitySnapshotProps {
  community: DiasporaCommunity;
  country: string;
  /** False when we fell back to the generic profile. */
  hasProfile: boolean;
}

export function CommunitySnapshot({ community, country, hasProfile }: CommunitySnapshotProps) {
  const shares = [...community.provinceShares].sort((a, b) => b.share - a.share);

  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-semibold tracking-tight text-navy-800">
            {hasProfile ? `${country} community in Canada` : "Diaspora communities in Canada"}
          </h2>
        </div>

        <dl className="mt-6 grid gap-6 sm:grid-cols-3">
          <div>
            <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <Users2 className="h-3.5 w-3.5" aria-hidden="true" />
              Community size
            </dt>
            <dd className="mt-1.5 text-2xl font-semibold tabular-nums text-navy-800">
              {formatPopulation(community.populationEstimate)}
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <Globe2 className="h-3.5 w-3.5" aria-hidden="true" />
              Largest concentration
            </dt>
            <dd className="mt-1.5 font-medium text-navy-800">
              {shares[0].metro}
              <span className="ml-1.5 text-sm font-normal text-slate-500">
                {shares[0].share}%
              </span>
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <Languages className="h-3.5 w-3.5" aria-hidden="true" />
              Working languages
            </dt>
            <dd className="mt-1.5 text-sm text-slate-800">{community.languages.join(", ")}</dd>
          </div>
        </dl>

        {/* Provincial distribution */}
        <section aria-labelledby="distribution-heading" className="mt-8">
          <h3 id="distribution-heading" className="text-sm font-semibold text-navy-800">
            Where the community lives
          </h3>
          <ul className="mt-4 space-y-3">
            {shares.map((share) => (
              <li key={share.province} className="flex items-center gap-4">
                <span className="w-32 shrink-0 text-sm font-medium text-slate-700">
                  {getProvince(share.province).name}
                </span>
                <span
                  className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100"
                  role="img"
                  aria-label={`${getProvince(share.province).name}: ${share.share} percent, concentrated in ${share.metro}`}
                >
                  <span
                    className="block h-full rounded-full bg-teal-500"
                    style={{ width: `${share.share}%` }}
                  />
                </span>
                <span className="w-10 shrink-0 text-right text-sm tabular-nums text-slate-600">
                  {share.share}%
                </span>
                <span className="hidden w-44 shrink-0 truncate text-sm text-slate-500 sm:block">
                  {share.metro}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-8 space-y-4 border-t border-slate-100 pt-6">
          {community.insight.map((paragraph, index) => (
            <p key={index} className="max-w-3xl leading-relaxed text-slate-700">
              {paragraph}
            </p>
          ))}
        </div>

        {!hasProfile && (
          <p className="mt-6 rounded-lg border border-navy-100 bg-navy-50/60 p-4 text-sm leading-relaxed text-navy-800">
            We do not yet have a dedicated community profile for {country}. The figures above are a
            cross-community baseline — the organisations and mentors below still apply, and
            pan-diaspora bodies are a good first point of contact.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
