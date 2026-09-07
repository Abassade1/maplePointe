/** Core domain types for the Northgate AI Market-Entry Navigator (Module 1). */

export type ProvinceCode = "ON" | "BC" | "AB" | "QC";

export interface Province {
  code: ProvinceCode;
  name: string;
  /** Largest business hub, shown as the suggested landing city. */
  primaryCity: string;
  /** Short positioning line used in selection cards. */
  tagline: string;
  /** True where French-language obligations materially affect packaging/marketing. */
  bilingualSensitive: boolean;
}

export type LicenceStatus = "required" | "recommended" | "not-applicable";

export type LicenceCategory =
  | "registration"
  | "tax"
  | "permit"
  | "labelling"
  | "employment"
  | "import";

export interface LicenceItem {
  id: string;
  province: ProvinceCode;
  name: string;
  description: string;
  status: LicenceStatus;
  category: LicenceCategory;
  /** Issuing body, e.g. "ServiceOntario". */
  authority: string;
  /** Human-readable estimate, e.g. "2–4 weeks". */
  estimatedTimeline: string;
  /** Human-readable estimate, e.g. "CA$360". */
  estimatedCost: string;
}

export type PartnerType = "distributor" | "legal-advisor" | "logistics" | "local-agent";

export interface Partner {
  id: string;
  name: string;
  type: PartnerType;
  province: ProvinceCode;
  city: string;
  blurb: string;
  /** Sectors this partner focuses on, used for display only in the MVP. */
  focusAreas: string[];
  /** Mock 0–100 fit score against the onboarding profile. */
  matchScore: number;
}

export interface ChecklistItem {
  /** Mirrors the source LicenceItem id, so the checklist stays linked to the guide. */
  licenceId: string;
  province: ProvinceCode;
  completed: boolean;
  /** ISO timestamp of when the item was added from the Guide. */
  addedAt: string;
}

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  /** ISO timestamp. */
  timestamp: string;
}

export type CompanySize = "1-10" | "11-50" | "51-200" | "201-1000" | "1000+";

export type ProductCategory =
  | "packaged-food"
  | "consumer-goods"
  | "industrial-equipment"
  | "software-saas"
  | "professional-services"
  | "medical-devices"
  | "other";

export type EntryGoal =
  | "understand-licensing"
  | "find-distribution-partners"
  | "estimate-costs"
  | "understand-compliance";

export interface Company {
  name: string;
  industry: string;
  homeCountry: string;
  size: CompanySize;
  productDescription: string;
  productCategory: ProductCategory;
  targetProvinces: ProvinceCode[];
  goals: EntryGoal[];
  /** ISO timestamp set when onboarding is submitted. */
  completedAt: string;
}

/* -------------------------------------------------------------------------- */
/*  Module 2 — Funding Copilot                                                 */
/* -------------------------------------------------------------------------- */

export type FundingType =
  | "grant"
  | "loan"
  | "tax-credit"
  | "wage-subsidy"
  | "export-financing";

export type FundingLevel = "federal" | "provincial";

export type Competitiveness = "low" | "moderate" | "high";

export interface FundingProgram {
  id: string;
  name: string;
  provider: string;
  type: FundingType;
  level: FundingLevel;
  /** Present only for provincial programs. */
  province?: ProvinceCode;
  /** Amounts in CAD. */
  minAmount: number;
  maxAmount: number;
  description: string;
  /** Plain-language eligibility criteria shown as a list. */
  eligibility: string[];
  /**
   * Most Canadian programs require a Canadian-incorporated entity, which ties
   * this module back to the registration items in the Module 1 checklist.
   */
  requiresCanadianEntity: boolean;
  applicationWindow: string;
  typicalDecisionTime: string;
  competitiveness: Competitiveness;
  /** Mock 0–100 fit score against the onboarding profile. */
  matchScore: number;
}

export type ApplicationStatus =
  | "not-started"
  | "preparing"
  | "submitted"
  | "awarded"
  | "declined";

export interface FundingApplication {
  /** Mirrors the source FundingProgram id. */
  programId: string;
  status: ApplicationStatus;
  /** ISO timestamps. */
  addedAt: string;
  updatedAt: string;
}

/* -------------------------------------------------------------------------- */
/*  Module 3 — Diaspora Bridge                                                 */
/* -------------------------------------------------------------------------- */

export interface DiasporaProvinceShare {
  province: ProvinceCode;
  /** Percentage of the community living in this province. */
  share: number;
  metro: string;
}

export interface DiasporaCommunity {
  /** Matches Company.homeCountry, or "default" for the generic fallback. */
  country: string;
  populationEstimate: number;
  provinceShares: DiasporaProvinceShare[];
  languages: string[];
  /** 2 paragraphs of market-relevant context. */
  insight: string[];
}

export type DiasporaOrgType =
  | "chamber"
  | "business-network"
  | "cultural-association"
  | "incubator";

export interface DiasporaOrganization {
  id: string;
  name: string;
  type: DiasporaOrgType;
  /** Home country served, or "multi" for pan-diaspora organisations. */
  country: string;
  province: ProvinceCode;
  city: string;
  blurb: string;
  memberCount: number;
  focusAreas: string[];
}

export interface DiasporaMentor {
  id: string;
  name: string;
  role: string;
  company: string;
  homeCountry: string;
  province: ProvinceCode;
  city: string;
  yearsInCanada: number;
  blurb: string;
  expertise: string[];
  languages: string[];
  matchScore: number;
}

export type EventFormat = "in-person" | "virtual" | "hybrid";

export interface DiasporaEvent {
  id: string;
  title: string;
  /** Days from today, so demo dates never go stale. */
  daysFromNow: number;
  city: string;
  province: ProvinceCode;
  format: EventFormat;
  host: string;
  country: string;
  description: string;
}
