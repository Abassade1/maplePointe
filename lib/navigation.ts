import {
  Banknote,
  Bot,
  CheckSquare,
  Globe2,
  LayoutDashboard,
  Map,
  Sparkles,
  Users,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  description: string;
}

export interface NavGroup {
  /** Undefined for the ungrouped items at the top of the sidebar. */
  label?: string;
  /** Short module descriptor shown on the dashboard module cards. */
  blurb?: string;
  icon?: LucideIcon;
  items: NavItem[];
}

/**
 * Navigation is grouped by product module. Adding a module means adding a
 * group here and a matching folder under app/dashboard/.
 */
export const NAV_GROUPS: NavGroup[] = [
  {
    items: [
      {
        href: "/dashboard",
        label: "Overview",
        icon: LayoutDashboard,
        description: "Readiness, open items, and next steps",
      },
    ],
  },
  {
    label: "Market-Entry Navigator",
    blurb: "Work out where to land, what to register, and who to work with.",
    icon: Map,
    items: [
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
    ],
  },
  {
    label: "Funding Copilot",
    blurb: "Find the grants, credits, and financing you actually qualify for.",
    icon: Banknote,
    items: [
      {
        href: "/dashboard/funding",
        label: "Funding Matches",
        icon: Sparkles,
        description: "Grants, credits, loans, and subsidies",
      },
      {
        href: "/dashboard/funding/pipeline",
        label: "Application Pipeline",
        icon: Banknote,
        description: "Track applications from draft to award",
      },
    ],
  },
  {
    label: "Diaspora Bridge",
    blurb: "Reach your first customers through the community already here.",
    icon: Globe2,
    items: [
      {
        href: "/dashboard/diaspora",
        label: "Community & Networks",
        icon: Globe2,
        description: "Chambers, networks, and where your community is",
      },
      {
        href: "/dashboard/diaspora/mentors",
        label: "Mentors & Advisors",
        icon: UsersRound,
        description: "Operators who have made the same move",
      },
    ],
  },
];

/** Flat list, for anything that needs every destination. */
export const DASHBOARD_NAV: NavItem[] = NAV_GROUPS.flatMap((g) => g.items);

/** Only the module groups — excludes the ungrouped Overview entry. */
export const MODULE_GROUPS: NavGroup[] = NAV_GROUPS.filter((g) => Boolean(g.label));
