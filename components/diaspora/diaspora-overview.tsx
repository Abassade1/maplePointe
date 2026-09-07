"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LocaleLink } from "@/components/i18n/locale-link";
import { PageHeader } from "@/components/dashboard/page-header";
import { OnboardingGuard } from "@/components/dashboard/onboarding-guard";
import { CommunitySnapshot } from "./community-snapshot";
import { OrganisationCard } from "./organisation-card";
import { EventsList } from "./events-list";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { useAppStore } from "@/store/use-app-store";
import {
  DIASPORA_EVENTS, DIASPORA_ORGANISATIONS, getCommunity, hasCommunityProfile, rankByCountry,
} from "@/lib/mock-diaspora";
import { useI18n, useT, interpolate } from "@/lib/i18n/provider";
import { communityLabel, localizeCommunity, localizeCountry } from "@/lib/i18n/localize";

export function DiasporaOverview() {
  const loading = useSimulatedLoading();
  if (loading) return <DiasporaSkeleton />;
  return (
    <OnboardingGuard>
      <OverviewContent />
    </OnboardingGuard>
  );
}

function OverviewContent() {
  const t = useT();
  const { locale } = useI18n();
  const company = useAppStore((s) => s.company)!;
  const country = company.homeCountry;
  const countryLabel = localizeCountry(country, locale);
  // French needs an agreeing adjective ("communauté japonaise"), English the noun.
  const community_ = communityLabel(country, locale);

  const community = localizeCommunity(getCommunity(country), locale);
  const hasProfile = hasCommunityProfile(country);

  const { matched, broader } = rankByCountry(DIASPORA_ORGANISATIONS, country);
  const broaderSorted = [...broader].sort(
    (a, b) => (a.country === "multi" ? 0 : 1) - (b.country === "multi" ? 0 : 1),
  );

  const events = [...DIASPORA_EVENTS].sort((a, b) => {
    const score = (e: (typeof DIASPORA_EVENTS)[number]) =>
      e.country === country ? 0 : e.country === "multi" ? 1 : 2;
    return score(a) - score(b) || a.daysFromNow - b.daysFromNow;
  });

  return (
    <div>
      <PageHeader
        title={t.diaspora.title}
        description={interpolate(t.diaspora.subtitle, {
          community: community_,
          name: company.name,
        })}
      >
        <Button asChild variant="outline">
          <LocaleLink href="/dashboard/diaspora/mentors">
            {t.diaspora.browseMentors}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </LocaleLink>
        </Button>
      </PageHeader>

      <CommunitySnapshot
        community={community}
        country={countryLabel}
        communityLabel={community_}
        hasProfile={hasProfile}
      />

      {matched.length > 0 && (
        <section aria-labelledby="matched-orgs-heading" className="mt-10">
          <h2 id="matched-orgs-heading" className="text-lg font-semibold text-navy-800">
            {interpolate(t.diaspora.countryOrgs, { community: community_ })}
          </h2>
          <p className="mt-1 text-sm text-slate-600">{t.diaspora.countryOrgsBody}</p>
          <ul className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {matched.map((org) => (
              <li key={org.id}><OrganisationCard organisation={org} /></li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="broader-orgs-heading" className="mt-10">
        <h2 id="broader-orgs-heading" className="text-lg font-semibold text-navy-800">
          {matched.length > 0 ? t.diaspora.broaderNetwork : t.diaspora.organisations}
        </h2>
        <p className="mt-1 text-sm text-slate-600">{t.diaspora.broaderBody}</p>
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {broaderSorted.map((org) => (
            <li key={org.id}><OrganisationCard organisation={org} /></li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="events-heading" className="mt-10">
        <h2 id="events-heading" className="text-lg font-semibold text-navy-800">
          {t.diaspora.events}
        </h2>
        <p className="mb-4 mt-1 text-sm text-slate-600">{t.diaspora.eventsBody}</p>
        <EventsList events={events} />
      </section>

      <p className="mt-8 text-xs leading-relaxed text-slate-500">{t.diaspora.disclaimer}</p>
    </div>
  );
}

function DiasporaSkeleton() {
  return (
    <div>
      <Skeleton className="h-9 w-72" />
      <Skeleton className="mt-3 h-5 w-[30rem] max-w-full" />
      <Skeleton className="mt-8 h-96 w-full rounded-lg" />
      <Skeleton className="mt-10 h-7 w-48" />
      <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2].map((i) => <Skeleton key={i} className="h-64 w-full rounded-lg" />)}
      </div>
    </div>
  );
}
