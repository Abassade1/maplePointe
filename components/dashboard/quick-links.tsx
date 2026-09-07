import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DASHBOARD_NAV } from "@/lib/navigation";

export function QuickLinks() {
  const links = DASHBOARD_NAV.filter((item) => item.href !== "/dashboard");

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {links.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 transition-colors hover:border-navy-300 hover:bg-navy-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-navy-50">
              <item.icon className="h-4.5 w-4.5 text-navy-600" aria-hidden="true" />
            </span>
            <span className="mt-4 font-medium text-navy-800">{item.label}</span>
            <span className="mt-1 flex-1 text-sm leading-relaxed text-slate-600">
              {item.description}
            </span>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-navy-600">
              Open
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
