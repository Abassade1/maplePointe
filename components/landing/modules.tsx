import { Banknote, Globe2, Map } from "lucide-react";

const MODULES = [
  {
    icon: Map,
    name: "Market-Entry Navigator",
    summary:
      "Work out which province to land in, exactly what you must register, and where bilingual labelling rules apply — then track it all to completion.",
    points: [
      "Province-by-province registration guides",
      "Licence requirements with timelines and fees",
      "Bilingual and Quebec French compliance",
      "Vetted distributors, brokers, and advisors",
    ],
  },
  {
    icon: Banknote,
    name: "Funding Copilot",
    summary:
      "Canada has a dense stack of grants, tax credits, and export financing. Most entrants find out about it far too late, or apply before they are eligible.",
    points: [
      "Federal and provincial programmes matched to you",
      "Plain-language eligibility criteria",
      "Flags where a Canadian entity is prerequisite",
      "An application pipeline from draft to award",
    ],
  },
  {
    icon: Globe2,
    name: "Diaspora Bridge",
    summary:
      "Your community is already here. Diaspora networks are consistently the fastest route to a first Canadian customer and to advice from people who made the same move.",
    points: [
      "Where your community sits, province by province",
      "Chambers, business networks, and incubators",
      "Mentors who have run the same playbook",
      "Showcases, clinics, and buyer roundtables",
    ],
  },
];

export function Modules() {
  return (
    <section id="modules" className="border-b border-slate-200 py-20 lg:py-24">
      <div className="container">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-navy-800 sm:text-4xl">
            Three modules, one entry plan
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Each answers a different question, and they share the same profile — so what you
            complete in one shows up in the next.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {MODULES.map((module) => (
            <li
              key={module.name}
              className="flex flex-col rounded-lg border border-slate-200 bg-white p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-navy-50">
                <module.icon className="h-5 w-5 text-navy-600" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-navy-800">{module.name}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-slate-600">{module.summary}</p>
              <ul className="mt-5 space-y-2 border-t border-slate-100 pt-5">
                {module.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
