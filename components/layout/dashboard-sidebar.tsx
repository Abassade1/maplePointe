"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_GROUPS } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { useAppStore, selectChecklistProgress } from "@/store/use-app-store";

export function DashboardNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const checklist = useAppStore((s) => s.checklist);
  const applications = useAppStore((s) => s.fundingApplications);

  const { total, completed } = selectChecklistProgress(checklist);
  const openItems = total - completed;

  function badgeFor(href: string): number | null {
    if (href === "/dashboard/checklist" && openItems > 0) return openItems;
    if (href === "/dashboard/funding/pipeline" && applications.length > 0) {
      return applications.length;
    }
    return null;
  }

  return (
    <nav aria-label="Dashboard" className="space-y-6">
      {NAV_GROUPS.map((group, groupIndex) => (
        <div key={group.label ?? `group-${groupIndex}`}>
          {group.label && (
            <h2 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
              {group.label}
            </h2>
          )}
          <ul className="space-y-1">
            {group.items.map((item) => {
              // Exact match for index routes so a child route does not light up its parent.
              const isIndex = item.href === "/dashboard" || item.href === "/dashboard/funding" || item.href === "/dashboard/diaspora";
              const active = isIndex
                ? pathname === item.href
                : pathname.startsWith(item.href);
              const badge = badgeFor(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2",
                      active
                        ? "bg-navy-50 text-navy-800"
                        : "text-slate-600 hover:bg-slate-100 hover:text-navy-800",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        active ? "text-navy-600" : "text-slate-400",
                      )}
                      aria-hidden="true"
                    />
                    <span className="flex-1 truncate">{item.label}</span>
                    {badge !== null && (
                      <span className="rounded-full bg-teal-500 px-2 py-0.5 text-xs font-semibold text-white">
                        {badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
