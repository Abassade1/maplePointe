import Link from "next/link";
import { ArrowRight, ClipboardCheck, Compass, Handshake, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { HowItWorks } from "@/components/landing/how-it-works";
import { SocialProof } from "@/components/landing/social-proof";

const HERO_STATS = [
  { value: "4", label: "Provinces mapped" },
  { value: "24", label: "Licences & registrations tracked" },
  { value: "12", label: "Vetted local partners" },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="container grid gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500" aria-hidden="true" />
                Module 1 · Market-Entry Navigator
              </p>
              <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-navy-800 sm:text-5xl lg:text-6xl">
                Entering Canada should not take six consultants and nine months.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                Market-entry advice is scattered across federal agencies, four provincial
                registries, municipal bylaws, and a dozen advisors who each see one slice.
                Northgate assembles it into a single guided path — which province to land in,
                what you must register, where bilingual rules bite, and who to work with locally.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg">
                  <Link href="/onboarding">
                    Start your assessment
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <p className="text-sm text-slate-500 sm:ml-2">
                  Four questions. No account required.
                </p>
              </div>

              <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-slate-200 pt-8">
                {HERO_STATS.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block text-2xl font-semibold text-navy-700">{stat.value}</span>
                      <span className="mt-1 block text-xs leading-snug text-slate-500">{stat.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Illustrative product preview */}
            <div className="lg:col-span-5">
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="text-sm font-semibold text-navy-800">Readiness snapshot</h2>
                  <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700">
                    Ontario
                  </span>
                </div>
                <ul className="mt-4 space-y-4">
                  {[
                    { icon: Compass, title: "Recommended landing point", body: "Toronto, Ontario — 39% of national demand within two hours." },
                    { icon: ClipboardCheck, title: "Registrations identified", body: "7 items · CA$330 filing fees · 2–4 week timeline." },
                    { icon: ShieldCheck, title: "Compliance flag", body: "Federal bilingual labelling applies even outside Quebec." },
                    { icon: Handshake, title: "Partner matches", body: "3 distributors and 2 advisors matched to your category." },
                  ].map((row) => (
                    <li key={row.title} className="flex gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-navy-50">
                        <row.icon className="h-4 w-4 text-navy-600" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-medium text-navy-800">{row.title}</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{row.body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <HowItWorks />
        <SocialProof />

        {/* Closing CTA */}
        <section className="bg-navy-600">
          <div className="container flex flex-col items-start gap-8 py-16 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-white">
                Map your entry into Canada in the next ten minutes.
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-navy-100">
                Answer four questions about your company and get a province-by-province plan you
                can take to your board.
              </p>
            </div>
            <Button asChild size="lg" variant="accent" className="shrink-0">
              <Link href="/onboarding">
                Start your assessment
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
