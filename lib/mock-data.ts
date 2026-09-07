import type {
  CompanySize,
  EntryGoal,
  LicenceItem,
  Partner,
  ProductCategory,
  Province,
  ProvinceCode,
} from "./types";

/* -------------------------------------------------------------------------- */
/*  Provinces                                                                  */
/* -------------------------------------------------------------------------- */

export const PROVINCES: Province[] = [
  {
    code: "ON",
    name: "Ontario",
    primaryCity: "Toronto",
    tagline: "Canada's largest consumer market and financial centre.",
    bilingualSensitive: false,
  },
  {
    code: "BC",
    name: "British Columbia",
    primaryCity: "Vancouver",
    tagline: "Pacific gateway with the shortest transit times from Asia.",
    bilingualSensitive: false,
  },
  {
    code: "AB",
    name: "Alberta",
    primaryCity: "Calgary",
    tagline: "No provincial sales tax and the lowest corporate rate in Canada.",
    bilingualSensitive: false,
  },
  {
    code: "QC",
    name: "Quebec",
    primaryCity: "Montreal",
    tagline: "Distinct civil-law and French-language regime; plan for it early.",
    bilingualSensitive: true,
  },
];

export const PROVINCE_MAP: Record<ProvinceCode, Province> = PROVINCES.reduce(
  (acc, p) => ({ ...acc, [p.code]: p }),
  {} as Record<ProvinceCode, Province>,
);

export function getProvince(code: ProvinceCode): Province {
  return PROVINCE_MAP[code];
}

/* -------------------------------------------------------------------------- */
/*  Province overview copy (2–3 paragraphs each)                               */
/* -------------------------------------------------------------------------- */

export const PROVINCE_OVERVIEWS: Record<ProvinceCode, string[]> = {
  ON: [
    "Ontario is the default first stop for most foreign SMEs entering Canada. Roughly 39% of the national population and the largest concentration of head offices sit within a two-hour drive of Toronto, and the Greater Toronto Area alone absorbs more imported consumer goods than any other Canadian metro. For a first landing point, this usually means you can validate demand without building out national distribution on day one.",
    "Your structural choice comes first. Most foreign companies either register an Ontario extra-provincial licence against an existing foreign corporation, or incorporate a federal subsidiary under the CBCA and then register it extra-provincially in Ontario. The federal route costs more up front but travels better if you expect to expand into British Columbia or Alberta within 18 months. Either path requires an Ontario-registered agent for service and filings through the Ontario Business Registry.",
    "Once the entity exists, the sequence is fairly mechanical: obtain a CRA Business Number, register for HST if you expect more than CA$30,000 in taxable supplies over four consecutive quarters, open a Canadian dollar operating account, and register with the WSIB before your first employee starts. Ontario charges a combined 13% HST, which is collected at point of sale rather than at the border for most goods — a cash-flow difference worth modelling before you set landed-cost targets.",
  ],
  BC: [
    "British Columbia is the natural entry point for companies shipping from Asia-Pacific. The Port of Vancouver clears more container volume than every other Canadian port combined, and transit times from Shanghai or Busan run roughly 5–8 days shorter than routing through Eastern Canada. If your supply chain originates in Asia, landing in BC and distributing eastward is usually cheaper than the reverse.",
    "Registration follows the BC Business Corporations Act. Foreign entities register as extraprovincial companies through BC Registries and Services, which requires a BC-resident attorney for service and a name approval before the registration itself is filed. Name approval typically clears in a few business days at standard priority; budget longer if your brand name is close to an existing BC registration.",
    "BC is a Provincial Sales Tax province, which trips up companies used to a single harmonised rate. You will collect 5% federal GST plus 7% PST separately, and PST registration is a distinct process from your CRA Business Number. PST also applies to some business inputs that would be recoverable under an HST regime, so your effective tax cost is not simply 12%. Model this properly before you set wholesale pricing.",
  ],
  AB: [
    "Alberta offers the lightest tax burden of any Canadian province: an 8% general corporate rate and no provincial sales tax at all. For goods businesses, that second point is the material one — you collect only 5% GST, which simplifies point-of-sale systems and makes Alberta an unusually clean market for testing consumer price sensitivity without tax noise.",
    "Extra-provincial registration runs through Alberta Corporate Registries, but unlike Ontario and BC you must file through an authorised private service provider rather than directly with the province. These agents are inexpensive and fast, though it is one more vendor relationship to set up. You will also need an Alberta attorney for service with a physical provincial address; a mailbox will not satisfy the requirement.",
    "Alberta's economy is more concentrated than its population suggests. Energy, agriculture, and logistics dominate, and buying decisions in those sectors run through a comparatively small number of procurement relationships in Calgary and Edmonton. Companies selling industrial or B2B products often find that a single well-chosen local agent outperforms a broad distributor network here.",
  ],
  QC: [
    "Quebec is the highest-friction province for foreign entrants, and also the one most often underestimated. It operates under a civil-law system rather than common law, which changes how contracts, security interests, and distribution agreements are drafted. Agreements that work unmodified across the rest of Canada frequently need Quebec-specific redrafting.",
    "The French-language regime is the dominant compliance factor. Under the Charter of the French Language — significantly expanded by Law 25 and Law 14 — product labelling, packaging, warranties, public signage, websites, and employment documentation must be available in French. French must be at least as prominent as any other language on packaging and signage. Businesses above a headcount threshold must also register with the Office québécois de la langue française and complete a francisation process.",
    "None of this makes Quebec a bad market — it is Canada's second-largest, with Montreal serving as a genuine centre of gravity for aerospace, AI, and food processing. But translation and packaging redesign need to sit in your launch budget from the start, not appear as a surprise six weeks before shipping. Companies that treat Quebec as a phase-two market with a phase-one packaging decision usually end up repackaging.",
  ],
};

/* -------------------------------------------------------------------------- */
/*  Licence & registration requirements                                        */
/* -------------------------------------------------------------------------- */

export const LICENCE_ITEMS: LicenceItem[] = [
  /* ---------------------------- Ontario ---------------------------- */
  {
    id: "on-extra-provincial",
    province: "ON",
    name: "Extra-Provincial Licence (Ontario Business Registry)",
    description:
      "Authorises a foreign or out-of-province corporation to carry on business in Ontario. Requires an Ontario agent for service with a physical provincial address.",
    status: "required",
    category: "registration",
    authority: "Ontario Business Registry (ServiceOntario)",
    estimatedTimeline: "2–4 weeks",
    estimatedCost: "CA$330",
  },
  {
    id: "on-business-number",
    province: "ON",
    name: "CRA Business Number & Import/Export Account",
    description:
      "The federal identifier used for every subsequent tax, payroll, and customs account. The RM import/export program account must be open before your first shipment clears customs.",
    status: "required",
    category: "tax",
    authority: "Canada Revenue Agency",
    estimatedTimeline: "1–3 business days",
    estimatedCost: "No fee",
  },
  {
    id: "on-hst",
    province: "ON",
    name: "HST Registration (13%)",
    description:
      "Mandatory once taxable supplies exceed CA$30,000 across four consecutive calendar quarters. Voluntary registration below the threshold lets you recover input tax credits on setup costs.",
    status: "required",
    category: "tax",
    authority: "Canada Revenue Agency",
    estimatedTimeline: "1–2 business days",
    estimatedCost: "No fee",
  },
  {
    id: "on-wsib",
    province: "ON",
    name: "WSIB Employer Registration",
    description:
      "Workplace safety insurance coverage. Registration is due within 10 days of hiring your first Ontario employee; premium rates vary by classification unit.",
    status: "required",
    category: "employment",
    authority: "Workplace Safety and Insurance Board",
    estimatedTimeline: "1–2 weeks",
    estimatedCost: "Premium-based",
  },
  {
    id: "on-municipal-licence",
    province: "ON",
    name: "Municipal Business Licence (City of Toronto)",
    description:
      "Required for many retail, food service, and trade categories operating within Toronto. Warehousing and pure B2B wholesale are frequently exempt — confirm against your specific category.",
    status: "recommended",
    category: "permit",
    authority: "City of Toronto Municipal Licensing & Standards",
    estimatedTimeline: "2–6 weeks",
    estimatedCost: "CA$100–CA$1,200",
  },
  {
    id: "on-consumer-packaging",
    province: "ON",
    name: "Consumer Packaging & Labelling Act Compliance",
    description:
      "Federal rules governing bilingual product identity and net quantity declarations, dealer name and address, and metric units on consumer prepackaged goods sold anywhere in Canada.",
    status: "required",
    category: "labelling",
    authority: "Competition Bureau Canada",
    estimatedTimeline: "3–8 weeks (artwork revision)",
    estimatedCost: "Varies by SKU count",
  },
  {
    id: "on-employer-health-tax",
    province: "ON",
    name: "Employer Health Tax Account",
    description:
      "Payroll tax on Ontario remuneration above the annual exemption. Not applicable until you have Ontario-based employees on payroll.",
    status: "not-applicable",
    category: "employment",
    authority: "Ontario Ministry of Finance",
    estimatedTimeline: "1 week",
    estimatedCost: "Payroll-based",
  },

  /* ----------------------- British Columbia ------------------------ */
  {
    id: "bc-extraprovincial",
    province: "BC",
    name: "Extraprovincial Company Registration",
    description:
      "Registration under the BC Business Corporations Act, including appointment of a BC-resident attorney for service. Name approval must be obtained before the registration is filed.",
    status: "required",
    category: "registration",
    authority: "BC Registries and Services",
    estimatedTimeline: "3–5 weeks",
    estimatedCost: "CA$350",
  },
  {
    id: "bc-name-approval",
    province: "BC",
    name: "Business Name Approval Request",
    description:
      "Precedes registration. Standard processing runs several business days; priority review is available for an additional fee if your launch date is fixed.",
    status: "required",
    category: "registration",
    authority: "BC Registries and Services",
    estimatedTimeline: "3–10 business days",
    estimatedCost: "CA$30–CA$130",
  },
  {
    id: "bc-pst",
    province: "BC",
    name: "PST Registration (7%)",
    description:
      "Separate from your federal GST account. BC applies PST to some business inputs that are recoverable under an HST regime, so your effective tax cost exceeds the headline 12% combined rate.",
    status: "required",
    category: "tax",
    authority: "BC Ministry of Finance",
    estimatedTimeline: "1–2 weeks",
    estimatedCost: "No fee",
  },
  {
    id: "bc-gst",
    province: "BC",
    name: "GST Registration (5%)",
    description:
      "Federal goods and services tax account, opened against your CRA Business Number. Same CA$30,000 small-supplier threshold applies as elsewhere in Canada.",
    status: "required",
    category: "tax",
    authority: "Canada Revenue Agency",
    estimatedTimeline: "1–2 business days",
    estimatedCost: "No fee",
  },
  {
    id: "bc-worksafe",
    province: "BC",
    name: "WorkSafeBC Employer Account",
    description:
      "Mandatory coverage for BC employees. Classification unit assignment drives your premium rate and is worth reviewing rather than accepting by default.",
    status: "required",
    category: "employment",
    authority: "WorkSafeBC",
    estimatedTimeline: "1–2 weeks",
    estimatedCost: "Premium-based",
  },
  {
    id: "bc-import-permit",
    province: "BC",
    name: "CFIA Import Licence (SFC)",
    description:
      "Safe Food for Canadians licence, required to import or sell food products across provincial or international borders. Applies only to food and food-contact goods.",
    status: "recommended",
    category: "import",
    authority: "Canadian Food Inspection Agency",
    estimatedTimeline: "4–8 weeks",
    estimatedCost: "CA$250",
  },
  {
    id: "bc-municipal-vancouver",
    province: "BC",
    name: "City of Vancouver Business Licence",
    description:
      "Required for any business with a physical presence in Vancouver, including warehouse and office-only operations. Renewed annually.",
    status: "required",
    category: "permit",
    authority: "City of Vancouver",
    estimatedTimeline: "2–4 weeks",
    estimatedCost: "CA$150–CA$800",
  },

  /* ----------------------------- Alberta --------------------------- */
  {
    id: "ab-extra-provincial",
    province: "AB",
    name: "Extra-Provincial Registration",
    description:
      "Filed through an authorised Alberta service provider rather than directly with the province. Requires an Alberta attorney for service with a physical provincial address.",
    status: "required",
    category: "registration",
    authority: "Alberta Corporate Registry (via authorised agent)",
    estimatedTimeline: "1–3 weeks",
    estimatedCost: "CA$275–CA$400",
  },
  {
    id: "ab-gst",
    province: "AB",
    name: "GST Registration (5% only)",
    description:
      "Alberta levies no provincial sales tax, so 5% federal GST is the entire indirect tax burden at point of sale. This materially simplifies POS configuration and pricing tests.",
    status: "required",
    category: "tax",
    authority: "Canada Revenue Agency",
    estimatedTimeline: "1–2 business days",
    estimatedCost: "No fee",
  },
  {
    id: "ab-wcb",
    province: "AB",
    name: "WCB Alberta Account",
    description:
      "Workers' compensation coverage, mandatory for most industries before your first employee begins work. Some professional service categories are exempt.",
    status: "required",
    category: "employment",
    authority: "Workers' Compensation Board – Alberta",
    estimatedTimeline: "1–2 weeks",
    estimatedCost: "Premium-based",
  },
  {
    id: "ab-municipal-calgary",
    province: "AB",
    name: "City of Calgary Business Licence",
    description:
      "Required for most commercial activity within Calgary city limits, with fees varying widely by category. Home-based and warehouse operations have distinct sub-categories.",
    status: "required",
    category: "permit",
    authority: "City of Calgary",
    estimatedTimeline: "2–5 weeks",
    estimatedCost: "CA$100–CA$600",
  },
  {
    id: "ab-import-account",
    province: "AB",
    name: "CBSA Import/Export Program Account",
    description:
      "The RM account extension on your Business Number. Required before your first commercial shipment can clear customs regardless of entry province.",
    status: "required",
    category: "import",
    authority: "Canada Border Services Agency",
    estimatedTimeline: "1–3 business days",
    estimatedCost: "No fee",
  },
  {
    id: "ab-provincial-sales-tax",
    province: "AB",
    name: "Provincial Sales Tax Registration",
    description:
      "Not applicable. Alberta is the only province with no PST or harmonised provincial component, so no separate provincial sales tax account exists to register for.",
    status: "not-applicable",
    category: "tax",
    authority: "N/A",
    estimatedTimeline: "N/A",
    estimatedCost: "No fee",
  },

  /* ----------------------------- Quebec ---------------------------- */
  {
    id: "qc-registraire",
    province: "QC",
    name: "Registraire des entreprises Declaration",
    description:
      "Registration with Quebec's enterprise registrar. Filings and the registered name itself are handled in French, and an updating declaration is due annually.",
    status: "required",
    category: "registration",
    authority: "Registraire des entreprises du Québec",
    estimatedTimeline: "3–6 weeks",
    estimatedCost: "CA$380",
  },
  {
    id: "qc-oqlf-francisation",
    province: "QC",
    name: "OQLF Registration & Francisation Programme",
    description:
      "Businesses at or above the Law 14 headcount threshold in Quebec must register with the Office québécois de la langue française and work through a francisation certification process.",
    status: "required",
    category: "labelling",
    authority: "Office québécois de la langue française",
    estimatedTimeline: "3–6 months",
    estimatedCost: "No filing fee",
  },
  {
    id: "qc-french-labelling",
    province: "QC",
    name: "French Labelling & Packaging Compliance",
    description:
      "All product labelling, packaging, warranties, and instructions must appear in French, displayed at least as prominently as any other language. Usually requires a Quebec-specific artwork revision.",
    status: "required",
    category: "labelling",
    authority: "Office québécois de la langue française",
    estimatedTimeline: "6–12 weeks",
    estimatedCost: "CA$1,500–CA$8,000 per SKU family",
  },
  {
    id: "qc-qst",
    province: "QC",
    name: "QST Registration (9.975%)",
    description:
      "Quebec Sales Tax, administered by Revenu Québec rather than the CRA. You will file provincial returns separately from your federal GST returns.",
    status: "required",
    category: "tax",
    authority: "Revenu Québec",
    estimatedTimeline: "1–2 weeks",
    estimatedCost: "No fee",
  },
  {
    id: "qc-cnesst",
    province: "QC",
    name: "CNESST Employer Registration",
    description:
      "Combined labour standards, pay equity, and occupational health and safety registration. Required before your first Quebec employee starts.",
    status: "required",
    category: "employment",
    authority: "Commission des normes, de l'équité, de la santé et de la sécurité du travail",
    estimatedTimeline: "1–3 weeks",
    estimatedCost: "Premium-based",
  },
  {
    id: "qc-signage",
    province: "QC",
    name: "Public Signage & Trademark Display Review",
    description:
      "Storefront signage carrying a non-French trademark must include a sufficient French descriptor. Applies only if you operate physical retail or branded premises in Quebec.",
    status: "recommended",
    category: "labelling",
    authority: "Office québécois de la langue française",
    estimatedTimeline: "4–8 weeks",
    estimatedCost: "Varies by location count",
  },
];

export function getLicencesForProvince(code: ProvinceCode): LicenceItem[] {
  return LICENCE_ITEMS.filter((l) => l.province === code);
}

export function getLicenceById(id: string): LicenceItem | undefined {
  return LICENCE_ITEMS.find((l) => l.id === id);
}

/* -------------------------------------------------------------------------- */
/*  Partners — fictional, for demonstration only                               */
/* -------------------------------------------------------------------------- */

export const PARTNERS: Partner[] = [
  {
    id: "p-maple-ridge",
    name: "Maple Ridge Distribution",
    type: "distributor",
    province: "ON",
    city: "Mississauga",
    blurb:
      "Mid-market grocery and specialty retail distributor covering roughly 400 doors across southern Ontario. Handles listing negotiations and category reviews on behalf of first-time entrants.",
    focusAreas: ["Packaged food", "Consumer goods"],
    matchScore: 94,
  },
  {
    id: "p-bellweather",
    name: "Bellweather Trade Counsel LLP",
    type: "legal-advisor",
    province: "ON",
    city: "Toronto",
    blurb:
      "Boutique firm focused on inbound market entry: entity structuring, extra-provincial registration, distribution agreements, and Competition Act labelling review.",
    focusAreas: ["Corporate structuring", "Regulatory"],
    matchScore: 91,
  },
  {
    id: "p-harbourline",
    name: "Harbourline Logistics",
    type: "logistics",
    province: "BC",
    city: "Vancouver",
    blurb:
      "Customs brokerage and bonded warehousing at the Port of Vancouver. Strong on Asia-Pacific inbound consolidation and cross-dock into rail for eastern distribution.",
    focusAreas: ["Customs brokerage", "Warehousing"],
    matchScore: 89,
  },
  {
    id: "p-cascadia",
    name: "Cascadia Market Partners",
    type: "local-agent",
    province: "BC",
    city: "Vancouver",
    blurb:
      "Commission-based sales agency representing foreign brands to BC independent retail. Typically carries 8–12 non-competing lines and works on a 90-day validation engagement.",
    focusAreas: ["Retail sales", "Brand representation"],
    matchScore: 86,
  },
  {
    id: "p-bow-valley",
    name: "Bow Valley Industrial Supply",
    type: "distributor",
    province: "AB",
    city: "Calgary",
    blurb:
      "Industrial and energy-sector distributor with established procurement relationships across Calgary and Edmonton. Prefers exclusive territory arrangements.",
    focusAreas: ["Industrial equipment", "Energy services"],
    matchScore: 88,
  },
  {
    id: "p-chinook",
    name: "Chinook Corporate Services",
    type: "legal-advisor",
    province: "AB",
    city: "Calgary",
    blurb:
      "Registered Alberta service provider handling extra-provincial filings and attorney-for-service arrangements. Fast, transactional, and inexpensive for straightforward registrations.",
    focusAreas: ["Registration filings", "Attorney for service"],
    matchScore: 82,
  },
  {
    id: "p-stlaurent",
    name: "Saint-Laurent Conseil Juridique",
    type: "legal-advisor",
    province: "QC",
    city: "Montreal",
    blurb:
      "Civil-law practice advising foreign entrants on Quebec contract redrafting, Law 25 privacy obligations, and OQLF francisation compliance.",
    focusAreas: ["Civil law", "Language compliance"],
    matchScore: 93,
  },
  {
    id: "p-fleuve",
    name: "Fleuve Distribution Québec",
    type: "distributor",
    province: "QC",
    city: "Montreal",
    blurb:
      "Francophone-market distributor with dedicated in-house packaging translation and OQLF pre-review. Useful where Quebec labelling is the gating constraint on national launch.",
    focusAreas: ["Packaged food", "Retail distribution"],
    matchScore: 90,
  },
  {
    id: "p-northstar",
    name: "North Star Freight Solutions",
    type: "logistics",
    province: "ON",
    city: "Toronto",
    blurb:
      "3PL operating fulfilment centres in Toronto and Montreal. Offers a shared-space model that avoids minimum-volume commitments during a pilot launch.",
    focusAreas: ["3PL fulfilment", "Last-mile"],
    matchScore: 85,
  },
  {
    id: "p-prairie-gateway",
    name: "Prairie Gateway Agents",
    type: "local-agent",
    province: "AB",
    city: "Edmonton",
    blurb:
      "Manufacturers' representative covering Alberta and Saskatchewan B2B accounts. Works retainer-plus-commission and reports pipeline monthly.",
    focusAreas: ["B2B sales", "Agriculture"],
    matchScore: 78,
  },
  {
    id: "p-pacific-rim-legal",
    name: "Pacific Rim Legal Group",
    type: "legal-advisor",
    province: "BC",
    city: "Richmond",
    blurb:
      "Advises Asia-Pacific companies on BC entity setup, PST registration, and employment standards. Working languages include Mandarin, Korean, and Japanese.",
    focusAreas: ["Entity setup", "Tax registration"],
    matchScore: 87,
  },
  {
    id: "p-laurentide",
    name: "Laurentide Transport",
    type: "logistics",
    province: "QC",
    city: "Longueuil",
    blurb:
      "Regional carrier and warehouse operator serving the Montreal–Quebec City corridor, with temperature-controlled capacity for food and pharmaceutical goods.",
    focusAreas: ["Cold chain", "Regional freight"],
    matchScore: 80,
  },
];

/* -------------------------------------------------------------------------- */
/*  Onboarding option sets                                                     */
/* -------------------------------------------------------------------------- */

export const INDUSTRIES = [
  "Food & Beverage",
  "Consumer Retail",
  "Manufacturing",
  "Technology & Software",
  "Healthcare & Life Sciences",
  "Professional Services",
  "Logistics & Transportation",
  "Energy & Resources",
  "Agriculture",
  "Other",
];

export const COUNTRIES = [
  "Brazil", "France", "Germany", "Ghana", "India", "Italy", "Japan", "Kenya",
  "Mexico", "Netherlands", "Nigeria", "Poland", "Singapore", "South Africa",
  "South Korea", "Spain", "Sweden", "United Arab Emirates", "United Kingdom",
  "United States", "Vietnam", "Other",
];

export const COMPANY_SIZES: { value: CompanySize; label: string }[] = [
  { value: "1-10", label: "1–10 employees" },
  { value: "11-50", label: "11–50 employees" },
  { value: "51-200", label: "51–200 employees" },
  { value: "201-1000", label: "201–1,000 employees" },
  { value: "1000+", label: "More than 1,000 employees" },
];

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "packaged-food", label: "Packaged food & beverage" },
  { value: "consumer-goods", label: "Consumer goods" },
  { value: "industrial-equipment", label: "Industrial equipment" },
  { value: "software-saas", label: "Software / SaaS" },
  { value: "professional-services", label: "Professional services" },
  { value: "medical-devices", label: "Medical devices" },
  { value: "other", label: "Other" },
];

export const ENTRY_GOALS: { value: EntryGoal; label: string; description: string }[] = [
  {
    value: "understand-licensing",
    label: "Understand licensing",
    description: "Know exactly which registrations and permits apply to us.",
  },
  {
    value: "find-distribution-partners",
    label: "Find distribution partners",
    description: "Identify distributors, agents, and logistics providers.",
  },
  {
    value: "estimate-costs",
    label: "Estimate costs",
    description: "Build a defensible budget for the first 12 months of entry.",
  },
  {
    value: "understand-compliance",
    label: "Understand compliance",
    description: "Labelling, bilingual requirements, and ongoing obligations.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Fake authenticated user                                                    */
/* -------------------------------------------------------------------------- */

export const DEMO_USER = {
  name: "Amara Okonkwo",
  email: "amara@example.com",
  role: "Market Entry Lead",
  initials: "AO",
};

/* -------------------------------------------------------------------------- */
/*  Module 2 & 3 data — kept in their own files, re-exported here so           */
/*  lib/mock-data.ts remains the single import surface for mock content.       */
/* -------------------------------------------------------------------------- */

export * from "./mock-funding";
export * from "./mock-diaspora";
