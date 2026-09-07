"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_NAV } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { useAppStore, selectChecklistProgress } from "@/store/use-app-store";

export function DashboardNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const checklist = useAppStore((s) => s.checklist);
  const { total, completed } = selectChecklistProgress(checklist);
  const openItems = total - completed;

  return (
    <nav aria-label="Dashboard" className="space-y-1">
      {DASHBOARD_NAV.map((item) => {
        const active =
          item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href);
        const showBadge = item.href === "/dashboard/checklist" && openItems > 0;

        return (
          <Link
            key={item.href}
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
              className={cn("h-4 w-4 shrink-0", active ? "text-navy-600" : "text-slate-400")}
              aria-hidden="true"
            />
            <span className="flex-1 truncate">{item.label}</span>
            {showBadge && (
              <span className="rounded-full bg-teal-500 px-2 py-0.5 text-xs font-semibold text-white">
                {openItems}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
