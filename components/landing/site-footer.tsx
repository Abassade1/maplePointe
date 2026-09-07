import Link from "next/link";
import { Logo } from "@/components/layout/logo";

const FOOTER_NAV = [
  {
    heading: "Product",
    links: ["Market-Entry Navigator", "Funding Copilot", "Diaspora Bridge", "Pricing"],
  },
  { heading: "Company", links: ["About", "Careers", "Press", "Contact"] },
  { heading: "Resources", links: ["Guides", "Provincial data", "Help centre", "Status"] },
  { heading: "Legal", links: ["Privacy", "Terms", "Security", "Accessibility"] },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
              AI-guided market entry for companies expanding into Canada.
            </p>
          </div>
          {FOOTER_NAV.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="text-sm font-semibold text-navy-800">{group.heading}</h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="rounded text-sm text-slate-600 transition-colors hover:text-navy-700"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Northgate AI. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Demonstration product. Guidance shown is illustrative, not legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
