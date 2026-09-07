"use client";

import Link from "next/link";
import { ArrowRight, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/dashboard/page-header";
import { OnboardingGuard } from "@/components/dashboard/onboarding-guard";
import { CommunitySnapshot } from "./community-snapshot";
import { OrganisationCard } from "./organisation-card";
import { EventsList } from "./events-list";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { useAppStore } from "@/store/use-app-store";
import {
  DIASPORA_EVENTS,
  DIASPORA_ORGANISATIONS,
  getCommunity,
  hasCommunityProfile,
  rankByCountry,
} from "@/lib/mock-diaspora";

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
  const company = useAppStore((s) => s.company)!;
  const country = company.homeCountry;

  const community = getCommunity(country);
  const hasProfile = hasCommunityProfile(country);

  const { matched, broader } = rankByCountry(DIASPORA_ORGANISATIONS, country);
  // Pan-diaspora bodies are useful to everyone, so they lead the broader list.
  // Keyed comparator so the ordering is stable rather than implementation-defined.
  const broaderSorted = [...broader].sort(
    (a, b) => (a.country === "multi" ? 0 : 1) - (b.country === "multi" ? 0 : 1),
  );

  // Events matching the user's community first, then everything open to all.
  const events = [...DIASPORA_EVENTS].sort((a, b) => {
    const score = (e: (typeof DIASPORA_EVENTS)[number]) =>
      e.country === country ? 0 : e.country === "multi" ? 1 : 2;
    return score(a) - score(b) || a.daysFromNow - b.daysFromNow;
  });

  return (
    <div>
      <PageHeader
        title="Community & Networks"
        description={`Where the ${country} community sits in Canada, and the chambers and networks that can open doors for ${company.name}.`}
      >
        <Button asChild variant="outline">
          <Link href="/dashboard/diaspora/mentors">
            Browse mentors
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </PageHeader>

      <CommunitySnapshot community={community} country={country} hasProfile={hasProfile} />

      {matched.length > 0 && (
        <section aria-labelledby="matched-orgs-heading" className="mt-10">
          <h2 id="matched-orgs-heading" className="text-lg font-semibold text-navy-800">
            {country} organisations
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Bodies serving your home market directly. These are usually the fastest route to a
            warm introduction.
          </p>
          <ul className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {matched.map((org) => (
              <li key={org.id}>
                <OrganisationCard organisation={org} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="broader-orgs-heading" className="mt-10">
        <h2 id="broader-orgs-heading" className="text-lg font-semibold text-navy-800">
          {matched.length > 0 ? "Broader network" : "Organisations"}
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Pan-diaspora chambers and networks that work across communities, plus bodies serving
          other markets.
        </p>
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {broaderSorted.map((org) => (
            <li key={org.id}>
              <OrganisationCard organisation={org} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="events-heading" className="mt-10">
        <h2 id="events-heading" className="text-lg font-semibold text-navy-800">
          Upcoming events
        </h2>
        <p className="mb-4 mt-1 text-sm text-slate-600">
          Showcases, clinics, and roundtables where entrants meet buyers and advisors in person.
        </p>
        <EventsList events={events} />
      </section>

      <p className="mt-8 text-xs leading-relaxed text-slate-500">
        All organisations, mentors, events, and community figures shown are fictional or
        illustrative and included for demonstration purposes only.
      </p>
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
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-64 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}
