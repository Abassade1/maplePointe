"use client";

import { Banknote, Globe2, Map } from "lucide-react";
import { useT } from "@/lib/i18n/provider";

export function Modules() {
  const t = useT();
  const m = t.landing.modules;

  const modules = [
    { icon: Map, name: m.m1, summary: m.m1Summary, points: m.m1Points },
    { icon: Banknote, name: m.m2, summary: m.m2Summary, points: m.m2Points },
    { icon: Globe2, name: m.m3, summary: m.m3Summary, points: m.m3Points },
  ];

  return (
    <section id="modules" className="border-b border-slate-200 py-20 lg:py-24">
      <div className="container">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-navy-800 sm:text-4xl">
            {m.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{m.subtitle}</p>
        </div>

        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {modules.map((module) => (
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
