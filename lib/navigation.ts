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
import type { Dictionary } from "./i18n/dictionaries/en";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  description: string;
}

export interface NavGroup {
  label?: string;
  blurb?: string;
  icon?: LucideIcon;
  items: NavItem[];
}

/**
 * Navigation is grouped by product module and built from the active
 * dictionary. Adding a module means adding a group here, the matching strings,
 * and a folder under app/[locale]/dashboard/.
 */
export function getNavGroups(t: Dictionary): NavGroup[] {
  const i = t.nav.items;
  return [
    {
      items: [
        {
          href: "/dashboard",
          label: i.overview,
          icon: LayoutDashboard,
          description: i.overviewDesc,
        },
      ],
    },
    {
      label: t.nav.groups.marketEntry,
      blurb: t.nav.moduleBlurbs.marketEntry,
      icon: Map,
      items: [
        { href: "/dashboard/guide", label: i.guide, icon: Map, description: i.guideDesc },
        { href: "/dashboard/assistant", label: i.assistant, icon: Bot, description: i.assistantDesc },
        { href: "/dashboard/partners", label: i.partners, icon: Users, description: i.partnersDesc },
        { href: "/dashboard/checklist", label: i.checklist, icon: CheckSquare, description: i.checklistDesc },
      ],
    },
    {
      label: t.nav.groups.funding,
      blurb: t.nav.moduleBlurbs.funding,
      icon: Banknote,
      items: [
        { href: "/dashboard/funding", label: i.funding, icon: Sparkles, description: i.fundingDesc },
        { href: "/dashboard/funding/pipeline", label: i.pipeline, icon: Banknote, description: i.pipelineDesc },
      ],
    },
    {
      label: t.nav.groups.diaspora,
      blurb: t.nav.moduleBlurbs.diaspora,
      icon: Globe2,
      items: [
        { href: "/dashboard/diaspora", label: i.diaspora, icon: Globe2, description: i.diasporaDesc },
        { href: "/dashboard/diaspora/mentors", label: i.mentors, icon: UsersRound, description: i.mentorsDesc },
      ],
    },
  ];
}

export function getModuleGroups(t: Dictionary): NavGroup[] {
  return getNavGroups(t).filter((g) => Boolean(g.label));
}
