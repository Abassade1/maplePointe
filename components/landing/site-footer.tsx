"use client";

import { Logo } from "@/components/layout/logo";
import { LocaleLink } from "@/components/i18n/locale-link";
import { useT } from "@/lib/i18n/provider";
import { interpolate } from "@/lib/i18n/provider";

export function SiteFooter() {
  const t = useT();
  const f = t.landing.footer;
  const l = f.links;

  const groups = [
    { heading: f.product, links: [l.navigator, l.funding, l.diaspora, l.pricing] },
    { heading: f.company, links: [l.about, l.careers, l.press, l.contact] },
    { heading: f.resources, links: [l.guides, l.provincialData, l.help, l.status] },
    { heading: f.legal, links: [l.privacy, l.terms, l.security, l.accessibility] },
  ];

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">{f.tagline}</p>
          </div>
          {groups.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="text-sm font-semibold text-navy-800">{group.heading}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <LocaleLink
                      href="/"
                      className="rounded text-sm text-slate-600 transition-colors hover:text-navy-700"
                    >
                      {link}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            {interpolate(f.rights, { year: new Date().getFullYear() })}
          </p>
          <p className="text-sm text-slate-500">{t.common.demoDisclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
