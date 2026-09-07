import type { ApplicationStatus, FundingProgram, FundingType } from "./types";

/* -------------------------------------------------------------------------- */
/*  Funding programs                                                           */
/*  Illustrative planning data for the demo — amounts, windows, and decision    */
/*  times are representative rather than authoritative.                        */
/* -------------------------------------------------------------------------- */

export const FUNDING_PROGRAMS: FundingProgram[] = [
  /* ------------------------------ Federal ------------------------------ */
  {
    id: "canexport-sme",
    name: "CanExport SME",
    provider: "Global Affairs Canada",
    type: "grant",
    level: "federal",
    minAmount: 10000,
    maxAmount: 50000,
    description:
      "Reimburses up to 50% of eligible costs for developing a new export market — trade shows, market research, adapting marketing materials, and legal advice on distribution agreements. The single most commonly used entry grant for companies establishing a Canadian presence.",
    eligibility: [
      "Incorporated in Canada, or a Canadian resident sole proprietor",
      "Between 1 and 500 full-time equivalent employees",
      "Annual revenue between CA$100,000 and CA$100 million",
      "Targeting a market where you have less than CA$100,000 in annual sales",
    ],
    requiresCanadianEntity: true,
    applicationWindow: "Rolling intake, subject to annual budget",
    typicalDecisionTime: "60–90 days",
    competitiveness: "moderate",
    matchScore: 96,
  },
  {
    id: "nrc-irap",
    name: "NRC IRAP Financial Support",
    provider: "National Research Council of Canada",
    type: "grant",
    level: "federal",
    minAmount: 50000,
    maxAmount: 500000,
    description:
      "Non-repayable contributions toward the salary and contractor costs of technical innovation projects, paired with an assigned Industrial Technology Advisor. Strongly favours companies doing genuine product development in Canada rather than pure distribution.",
    eligibility: [
      "Incorporated, profit-oriented Canadian SME",
      "Fewer than 500 full-time employees",
      "Demonstrable technical innovation with commercial potential",
      "Ability to fund the project portion not covered by the contribution",
    ],
    requiresCanadianEntity: true,
    applicationWindow: "Rolling — begins with an advisor conversation",
    typicalDecisionTime: "3–6 months",
    competitiveness: "high",
    matchScore: 84,
  },
  {
    id: "sred",
    name: "SR&ED Investment Tax Credit",
    provider: "Canada Revenue Agency",
    type: "tax-credit",
    level: "federal",
    minAmount: 20000,
    maxAmount: 3000000,
    description:
      "Canada's largest innovation incentive. Canadian-controlled private corporations can claim a 35% refundable credit on the first CA$3 million of qualifying R&D expenditure; other corporations claim a 15% non-refundable credit. Claimed with your annual tax return rather than applied for.",
    eligibility: [
      "Corporation carrying on business in Canada",
      "Expenditures on experimental development or applied research performed in Canada",
      "Contemporaneous technical documentation of the work",
      "Filed within 18 months of your tax year end",
    ],
    requiresCanadianEntity: true,
    applicationWindow: "Filed with your annual T2 return",
    typicalDecisionTime: "Refund within 120 days of a complete claim",
    competitiveness: "low",
    matchScore: 88,
  },
  {
    id: "bdc-growth",
    name: "BDC Growth & Transition Capital",
    provider: "Business Development Bank of Canada",
    type: "loan",
    level: "federal",
    minAmount: 250000,
    maxAmount: 35000000,
    description:
      "Flexible subordinate financing that does not require hard asset security, structured against cash flow. Frequently used to fund the working capital gap between establishing Canadian operations and the first year of collections.",
    eligibility: [
      "Canadian-based business with a demonstrated revenue history",
      "Positive or near-positive cash flow",
      "A defined growth plan with a credible use of funds",
      "Management team with relevant operating experience",
    ],
    requiresCanadianEntity: true,
    applicationWindow: "Rolling",
    typicalDecisionTime: "6–10 weeks",
    competitiveness: "moderate",
    matchScore: 79,
  },
  {
    id: "edc-export-guarantee",
    name: "EDC Export Guarantee Program",
    provider: "Export Development Canada",
    type: "export-financing",
    level: "federal",
    minAmount: 100000,
    maxAmount: 10000000,
    description:
      "EDC provides a risk-sharing guarantee to your Canadian bank, which increases the operating credit the bank will extend against foreign receivables and inventory. Useful when your Canadian entity has no domestic credit history to lend against.",
    eligibility: [
      "Canadian business with export or international sales activity",
      "An existing or prospective relationship with a Canadian financial institution",
      "Demonstrable foreign receivables or inventory to finance",
    ],
    requiresCanadianEntity: true,
    applicationWindow: "Rolling, arranged through your bank",
    typicalDecisionTime: "4–8 weeks",
    competitiveness: "low",
    matchScore: 82,
  },
  {
    id: "strategic-innovation-fund",
    name: "Strategic Innovation Fund",
    provider: "Innovation, Science and Economic Development Canada",
    type: "grant",
    level: "federal",
    minAmount: 10000000,
    maxAmount: 100000000,
    description:
      "Large-scale contributions for transformative industrial projects. Realistically out of range for an SME first entry — included here so you can see where the ceiling sits and rule it out deliberately.",
    eligibility: [
      "Project costs generally above CA$20 million",
      "For-profit corporation incorporated in Canada",
      "Significant, quantified economic benefit to Canada",
      "Substantial matching private investment",
    ],
    requiresCanadianEntity: true,
    applicationWindow: "By invitation following a statement of interest",
    typicalDecisionTime: "9–18 months",
    competitiveness: "high",
    matchScore: 24,
  },
  {
    id: "canada-job-grant",
    name: "Canada Job Grant",
    provider: "Employment and Social Development Canada (provincially delivered)",
    type: "wage-subsidy",
    level: "federal",
    minAmount: 5000,
    maxAmount: 15000,
    description:
      "Covers up to two thirds of third-party training costs for new and existing employees, to a per-trainee cap. Delivered through each province under its own name, so the application route depends on where your staff are based.",
    eligibility: [
      "Employer with a Canadian payroll account",
      "Training delivered by an eligible third-party provider",
      "Employer contributes the remaining one third of costs",
      "Trainee is a Canadian citizen or permanent resident",
    ],
    requiresCanadianEntity: true,
    applicationWindow: "Rolling until the annual allocation is exhausted",
    typicalDecisionTime: "4–8 weeks",
    competitiveness: "low",
    matchScore: 71,
  },

  /* ------------------------------ Ontario ------------------------------ */
  {
    id: "on-regional-development",
    name: "Regional Development Program",
    provider: "Ontario Ministry of Economic Development",
    type: "grant",
    level: "provincial",
    province: "ON",
    minAmount: 500000,
    maxAmount: 5000000,
    description:
      "Cost-shared funding for projects that create jobs and attract investment in designated Ontario regions. Structured as a conditional grant for smaller projects and a repayable contribution above a threshold.",
    eligibility: [
      "Project located in an eligible Ontario region",
      "Minimum eligible project costs of CA$500,000",
      "Creates or retains a defined number of jobs",
      "At least three years of operating history",
    ],
    requiresCanadianEntity: true,
    applicationWindow: "Continuous intake",
    typicalDecisionTime: "4–6 months",
    competitiveness: "high",
    matchScore: 58,
  },
  {
    id: "on-trade-fund",
    name: "Ontario Together Trade Fund",
    provider: "Government of Ontario",
    type: "grant",
    level: "provincial",
    province: "ON",
    minAmount: 100000,
    maxAmount: 3000000,
    description:
      "Supports manufacturers diversifying supply chains and expanding capacity within Ontario. Weighted toward projects that reduce dependence on a single foreign supply source.",
    eligibility: [
      "Ontario-based manufacturing or processing operation",
      "Minimum project costs of CA$200,000",
      "Demonstrated supply chain or capacity benefit to Ontario",
    ],
    requiresCanadianEntity: true,
    applicationWindow: "Continuous intake",
    typicalDecisionTime: "3–5 months",
    competitiveness: "moderate",
    matchScore: 66,
  },

  /* -------------------------- British Columbia -------------------------- */
  {
    id: "bc-innovate-ignite",
    name: "Innovate BC Ignite Programme",
    provider: "Innovate BC",
    type: "grant",
    level: "provincial",
    province: "BC",
    minAmount: 100000,
    maxAmount: 300000,
    description:
      "Three-year funding for industry and academic partnerships solving a defined technical problem in natural resources, applied science, or engineering. Requires a named research partner in British Columbia.",
    eligibility: [
      "Partnership between a BC company and a BC research institution",
      "Technology at a demonstrable proof-of-concept stage",
      "Matching contribution from the industry partner",
    ],
    requiresCanadianEntity: true,
    applicationWindow: "Two intakes per year",
    typicalDecisionTime: "3–4 months",
    competitiveness: "high",
    matchScore: 52,
  },
  {
    id: "bc-employer-training",
    name: "BC Employer Training Grant",
    provider: "WorkBC",
    type: "wage-subsidy",
    level: "provincial",
    province: "BC",
    minAmount: 2000,
    maxAmount: 10000,
    description:
      "Reimburses up to 80% of training costs per employee, to an annual per-employer maximum. British Columbia's delivery of the Canada Job Grant, with streams for new hires and existing staff.",
    eligibility: [
      "Business operating in British Columbia with a BC payroll",
      "Trainee is a BC resident and Canadian citizen or permanent resident",
      "Training from an eligible third-party provider",
    ],
    requiresCanadianEntity: true,
    applicationWindow: "Rolling until annual funds are exhausted",
    typicalDecisionTime: "4–6 weeks",
    competitiveness: "low",
    matchScore: 74,
  },

  /* ------------------------------ Alberta ------------------------------ */
  {
    id: "ab-export-expansion",
    name: "Alberta Export Expansion Programme",
    provider: "Government of Alberta",
    type: "grant",
    level: "provincial",
    province: "AB",
    minAmount: 5000,
    maxAmount: 50000,
    description:
      "Travel and market development funding for Alberta businesses pursuing new export markets, including inbound buyer visits. Smaller and faster to access than most federal equivalents.",
    eligibility: [
      "Business headquartered or with substantial operations in Alberta",
      "Fewer than 500 employees",
      "Activity targets a market outside Alberta",
    ],
    requiresCanadianEntity: true,
    applicationWindow: "Rolling intake",
    typicalDecisionTime: "4–8 weeks",
    competitiveness: "low",
    matchScore: 69,
  },
  {
    id: "ab-innovates-demonstration",
    name: "Product Demonstration Programme",
    provider: "Alberta Innovates",
    type: "grant",
    level: "provincial",
    province: "AB",
    minAmount: 50000,
    maxAmount: 300000,
    description:
      "Funds a real-world pilot of a near-market technology with an Alberta host site. Designed to close the gap between a working prototype and a first commercial reference customer.",
    eligibility: [
      "Technology at technology readiness level 6 or above",
      "A confirmed Alberta demonstration host",
      "Matching cash and in-kind contribution",
    ],
    requiresCanadianEntity: true,
    applicationWindow: "Scheduled intakes",
    typicalDecisionTime: "3–5 months",
    competitiveness: "moderate",
    matchScore: 63,
  },

  /* ------------------------------- Quebec ------------------------------- */
  {
    id: "qc-essor",
    name: "ESSOR Programme",
    provider: "Investissement Québec",
    type: "loan",
    level: "provincial",
    province: "QC",
    minAmount: 250000,
    maxAmount: 20000000,
    description:
      "Support for investment projects that improve productivity or expand capacity in Quebec, offered as loans, loan guarantees, and in some streams non-repayable contributions. Applications and reporting are conducted in French.",
    eligibility: [
      "Project carried out at an establishment in Quebec",
      "Minimum eligible investment generally CA$250,000",
      "Documented productivity or capacity outcome",
      "Applications submitted in French",
    ],
    requiresCanadianEntity: true,
    applicationWindow: "Continuous intake",
    typicalDecisionTime: "3–6 months",
    competitiveness: "moderate",
    matchScore: 61,
  },
  {
    id: "qc-c3i",
    name: "Tax Credit for Investment and Innovation (C3i)",
    provider: "Revenu Québec",
    type: "tax-credit",
    level: "provincial",
    province: "QC",
    minAmount: 15000,
    maxAmount: 1000000,
    description:
      "Credit on the acquisition of manufacturing and processing equipment, computer hardware, and management software packages used in Quebec. Rates increase in regions designated as lower economic vitality.",
    eligibility: [
      "Corporation with an establishment in Quebec",
      "Qualified property acquired for use primarily in Quebec",
      "Expenditure exceeds the per-asset threshold",
    ],
    requiresCanadianEntity: true,
    applicationWindow: "Claimed with your Quebec corporate return",
    typicalDecisionTime: "Assessed with your annual return",
    competitiveness: "low",
    matchScore: 67,
  },
];

/* -------------------------------------------------------------------------- */
/*  Labels and helpers                                                         */
/* -------------------------------------------------------------------------- */

export const FUNDING_TYPE_LABELS: Record<FundingType, string> = {
  grant: "Grant",
  loan: "Loan",
  "tax-credit": "Tax credit",
  "wage-subsidy": "Wage subsidy",
  "export-financing": "Export financing",
};

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  "not-started": "Not started",
  preparing: "Preparing",
  submitted: "Submitted",
  awarded: "Awarded",
  declined: "Declined",
};

/** Ordered for the pipeline board, left to right. */
export const APPLICATION_STATUS_ORDER: ApplicationStatus[] = [
  "not-started",
  "preparing",
  "submitted",
  "awarded",
  "declined",
];

export function getProgramById(id: string): FundingProgram | undefined {
  return FUNDING_PROGRAMS.find((p) => p.id === id);
}

/** Below this match score a program is shown but excluded from headline totals. */
export const REALISTIC_MATCH_THRESHOLD = 60;

/**
 * Programs relevant to the user: every federal program, plus provincial
 * programs for the provinces they selected during onboarding.
 */
export function getRelevantPrograms(provinces: string[]): FundingProgram[] {
  return FUNDING_PROGRAMS.filter(
    (p) => p.level === "federal" || (p.province && provinces.includes(p.province)),
  ).sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * The subset used for headline funding totals. Programs the profile does not
 * realistically reach — the very large industrial funds in particular — would
 * otherwise dominate the number and overstate what is actually accessible.
 */
export function getRealisticPrograms(provinces: string[]): FundingProgram[] {
  return getRelevantPrograms(provinces).filter(
    (p) => p.matchScore >= REALISTIC_MATCH_THRESHOLD,
  );
}
