"use client";

import { useT } from "@/lib/i18n/provider";
import { useI18n } from "@/lib/i18n/provider";
import { localizeCountry } from "@/lib/i18n/localize";

const COMPANIES = [
  "Nordvik Foods", "Aterra Systems", "Kanto Devices",
  "Solmara Group", "Verdant Labs", "Brightpath Textiles",
];

/** Quotations are content, so they carry their own translations. */
const QUOTES = [
  {
    id: "nordvik",
    en: "We had three law firms giving us three different answers about Quebec labelling. Northgate gave us one sequence, with costs attached, in an afternoon.",
    fr: "Trois cabinets d'avocats nous donnaient trois réponses différentes sur l'étiquetage au Québec. Northgate nous a fourni une seule séquence, chiffrée, en un après-midi.",
    name: "Elena Vargas",
    roleEn: "COO",
    roleFr: "Directrice de l'exploitation",
    company: "Nordvik Foods",
    country: "Spain",
  },
  {
    id: "kanto",
    en: "The province comparison changed our plan. We had assumed Ontario by default and landed in British Columbia instead — six days shorter on every container.",
    fr: "La comparaison des provinces a changé notre plan. Nous présumions l'Ontario par défaut et nous sommes finalement implantés en Colombie-Britannique — six jours de moins par conteneur.",
    name: "Kenji Watanabe",
    roleEn: "Head of International",
    roleFr: "Directeur international",
    company: "Kanto Devices",
    country: "Japan",
  },
  {
    id: "verdant",
    en: "The checklist was the thing. Our board wanted a defensible timeline, and for the first time we could actually show them one.",
    fr: "C'est la liste de conformité qui a tout changé. Notre conseil voulait un échéancier défendable, et pour la première fois nous pouvions lui en présenter un.",
    name: "Adaeze Nwosu",
    roleEn: "Managing Director",
    roleFr: "Directrice générale",
    company: "Verdant Labs",
    country: "Nigeria",
  },
];

export function SocialProof() {
  const t = useT();
  const { locale } = useI18n();

  return (
    <section id="customers" className="border-b border-slate-200 bg-slate-50 py-20 lg:py-24">
      <div className="container">
        <p className="text-center text-sm font-medium uppercase tracking-wider text-slate-500">
          {t.landing.social.eyebrow}
        </p>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {COMPANIES.map((name) => (
            <li key={name} className="text-lg font-semibold tracking-tight text-slate-400">
              {name}
            </li>
          ))}
        </ul>

        <ul className="mt-16 grid gap-6 lg:grid-cols-3">
          {QUOTES.map((item) => (
            <li key={item.id} className="flex flex-col rounded-lg border border-slate-200 bg-white p-6">
              <blockquote className="flex-1">
                <p className="leading-relaxed text-slate-700">
                  &ldquo;{locale === "fr" ? item.fr : item.en}&rdquo;
                </p>
              </blockquote>
              <footer className="mt-6 border-t border-slate-100 pt-4">
                <p className="text-sm font-semibold text-navy-800">{item.name}</p>
                <p className="mt-0.5 text-sm text-slate-500">
                  {locale === "fr" ? item.roleFr : item.roleEn}, {item.company} ·{" "}
                  {localizeCountry(item.country, locale)}
                </p>
              </footer>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-xs text-slate-400">
          {t.landing.social.disclaimer}
        </p>
      </div>
    </section>
  );
}
