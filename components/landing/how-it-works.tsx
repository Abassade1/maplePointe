import { Handshake, Map, Search } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Search,
    title: "Assess",
    body:
      "Tell us your product, home market, and where you are considering landing. Northgate builds a profile of your entry position and flags the constraints that will actually shape your timeline.",
  },
  {
    number: "02",
    icon: Map,
    title: "Guide",
    body:
      "Get a province-by-province breakdown of every registration, licence, and tax account you need — with realistic timelines, fees, and the bilingual labelling rules most entrants discover far too late.",
  },
  {
    number: "03",
    icon: Handshake,
    title: "Connect",
    body:
      "Work through a live compliance checklist and get matched with distributors, customs brokers, and legal advisors who have handled entrants in your category before.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-slate-200 py-20 lg:py-24">
      <div className="container">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-navy-800 sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            One guided path instead of a dozen disconnected conversations.
          </p>
        </div>

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step) => (
            <li key={step.title} className="border-t-2 border-navy-600 pt-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-navy-50">
                  <step.icon className="h-5 w-5 text-navy-600" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold tracking-wider text-slate-400">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-navy-800">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-slate-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
