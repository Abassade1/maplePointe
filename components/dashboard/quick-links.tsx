import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MODULE_GROUPS } from "@/lib/navigation";

/** One card per product module, listing that module's destinations. */
export function QuickLinks() {
  return (
    <ul className="grid gap-5 lg:grid-cols-3">
      {MODULE_GROUPS.map((group) => (
        <li
          key={group.label}
          className="flex flex-col rounded-lg border border-slate-200 bg-white p-6"
        >
          <div className="flex items-center gap-3">
            {group.icon && (
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-navy-50">
                <group.icon className="h-4.5 w-4.5 text-navy-600" aria-hidden="true" />
              </span>
            )}
            <h3 className="font-semibold text-navy-800">{group.label}</h3>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-slate-600">{group.blurb}</p>

          <ul className="mt-5 flex-1 space-y-1 border-t border-slate-100 pt-4">
            {group.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-navy-50/60 hover:text-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2"
                >
                  <item.icon className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                  <span className="flex-1">{item.label}</span>
                  <ArrowRight
                    className="h-3.5 w-3.5 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-navy-600"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
