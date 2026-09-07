import { Bot, CheckSquare, LayoutDashboard, Map, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  description: string;
}

/**
 * Module 1 navigation. Modules 2 (Funding Copilot) and 3 (Diaspora Bridge)
 * will slot in as sibling entries under /dashboard.
 */
export const DASHBOARD_NAV: NavItem[] = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
    description: "Readiness, open items, and next steps",
  },
  {
    href: "/dashboard/guide",
    label: "Province Guide",
    icon: Map,
    description: "Registrations and licences by province",
  },
  {
    href: "/dashboard/assistant",
    label: "AI Assistant",
    icon: Bot,
    description: "Ask anything about entering Canada",
  },
  {
    href: "/dashboard/partners",
    label: "Partner Matches",
    icon: Users,
    description: "Distributors, advisors, and logistics",
  },
  {
    href: "/dashboard/checklist",
    label: "Compliance Checklist",
    icon: CheckSquare,
    description: "Track everything you have to file",
  },
];
