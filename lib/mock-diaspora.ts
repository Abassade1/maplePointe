import type {
  DiasporaCommunity,
  DiasporaEvent,
  DiasporaMentor,
  DiasporaOrganization,
  DiasporaOrgType,
} from "./types";

/* -------------------------------------------------------------------------- */
/*  Community profiles                                                         */
/*  Population figures are illustrative demo values, not census data.          */
/* -------------------------------------------------------------------------- */

const DEFAULT_COMMUNITY: DiasporaCommunity = {
  country: "default",
  populationEstimate: 240000,
  provinceShares: [
    { province: "ON", share: 44, metro: "Toronto" },
    { province: "BC", share: 22, metro: "Vancouver" },
    { province: "QC", share: 19, metro: "Montreal" },
    { province: "AB", share: 15, metro: "Calgary" },
  ],
  languages: ["English", "French"],
  insight: [
    "Canada's immigrant-founded businesses account for a disproportionate share of new export activity, and diaspora networks are consistently the fastest route to a first Canadian reference customer. Communities cluster tightly in a handful of metros, which means a targeted launch in one or two neighbourhoods often outperforms a broad national campaign at the same spend.",
    "The practical value here is threefold: early customers who already know your brand from your home market, advisors who have personally navigated the same registration and compliance path, and distribution relationships built on existing trust rather than cold outreach. Treat this as a route to your first twenty customers, not a substitute for mainstream distribution.",
  ],
};

const COMMUNITIES: DiasporaCommunity[] = [
  {
    country: "India",
    populationEstimate: 1860000,
    provinceShares: [
      { province: "ON", share: 51, metro: "Toronto / Brampton" },
      { province: "BC", share: 24, metro: "Vancouver / Surrey" },
      { province: "AB", share: 17, metro: "Calgary / Edmonton" },
      { province: "QC", share: 8, metro: "Montreal" },
    ],
    languages: ["English", "Punjabi", "Hindi", "Gujarati", "Tamil"],
    insight: [
      "The Indo-Canadian community is the largest non-European diaspora in Canada and the most commercially organised. Brampton and Surrey in particular function as dense, self-contained retail ecosystems where a well-known Indian brand can achieve meaningful distribution through independent grocers before approaching a national chain.",
      "For consumer products, the practical sequence is usually independent South Asian grocery first, then a regional banner, then national listing conversations with the volume data those first two produce. For B2B and technology, the community's concentration in engineering and finance in Toronto makes warm introductions unusually productive.",
    ],
  },
  {
    country: "Nigeria",
    populationEstimate: 62000,
    provinceShares: [
      { province: "ON", share: 48, metro: "Toronto / Hamilton" },
      { province: "AB", share: 25, metro: "Calgary / Edmonton" },
      { province: "QC", share: 15, metro: "Montreal" },
      { province: "BC", share: 12, metro: "Vancouver" },
    ],
    languages: ["English", "Yoruba", "Igbo", "Hausa", "French"],
    insight: [
      "The Nigerian-Canadian community is among the fastest growing in the country and skews young, urban, and highly credentialed, with unusual concentration in healthcare, engineering, and financial services. Alberta's share is larger than most entrants expect, driven by a decade of energy-sector and healthcare recruitment.",
      "Community commerce runs heavily through association networks and church and social organisations rather than formal trade bodies, which means introductions matter more than directories. Federal and provincial programmes aimed at Black entrepreneurs are also worth reviewing alongside the general funding stack in the Funding Copilot.",
    ],
  },
  {
    country: "Japan",
    populationEstimate: 130000,
    provinceShares: [
      { province: "BC", share: 42, metro: "Vancouver" },
      { province: "ON", share: 33, metro: "Toronto" },
      { province: "AB", share: 14, metro: "Calgary" },
      { province: "QC", share: 11, metro: "Montreal" },
    ],
    languages: ["Japanese", "English", "French"],
    insight: [
      "The Japanese-Canadian community is comparatively small but unusually well institutionalised, with long-established cultural centres and a dense corporate presence built around Japanese manufacturers and trading houses that have operated in Canada for decades. British Columbia holds the largest share, reflecting both historical settlement and Vancouver's role as the Pacific trade gateway.",
      "For industrial and B2B entrants the corporate layer matters more than the consumer layer: the Canadian subsidiaries of established Japanese firms are a well-trodden route to procurement introductions, technical partnerships, and experienced bilingual operators who already understand both regulatory environments.",
    ],
  },
  {
    country: "United Kingdom",
    populationEstimate: 540000,
    provinceShares: [
      { province: "ON", share: 40, metro: "Toronto" },
      { province: "BC", share: 27, metro: "Vancouver / Victoria" },
      { province: "AB", share: 23, metro: "Calgary" },
      { province: "QC", share: 10, metro: "Montreal" },
    ],
    languages: ["English", "French"],
    insight: [
      "British entrants face the lowest cultural and linguistic friction of any foreign market, which is both the advantage and the trap. Shared language routinely leads companies to underestimate the regulatory differences — particularly bilingual labelling and provincial rather than national registration — because the market feels familiar.",
      "The British-Canadian network is less a distribution channel than an advisory one. Its value is in operators who have made exactly this transition and can tell you which assumptions from the UK market do not carry, especially around retail structure, provincial fragmentation, and distance-driven logistics costs.",
    ],
  },
  {
    country: "Brazil",
    populationEstimate: 46000,
    provinceShares: [
      { province: "ON", share: 46, metro: "Toronto" },
      { province: "QC", share: 24, metro: "Montreal" },
      { province: "BC", share: 20, metro: "Vancouver" },
      { province: "AB", share: 10, metro: "Calgary" },
    ],
    languages: ["Portuguese", "English", "French"],
    insight: [
      "The Brazilian-Canadian community is concentrated in Toronto and Montreal and has grown quickly through student and skilled-worker pathways. It is young, entrepreneurial, and clustered in technology, food service, and creative industries, with active informal business networks that predate any formal trade organisation.",
      "Montreal is worth particular attention: the Portuguese-speaking community there overlaps with long-established Portuguese settlement, creating a larger combined consumer base than the Brazilian population alone suggests — though Quebec's French-language obligations still apply in full.",
    ],
  },
  {
    country: "South Korea",
    populationEstimate: 218000,
    provinceShares: [
      { province: "ON", share: 45, metro: "Toronto / North York" },
      { province: "BC", share: 34, metro: "Vancouver / Coquitlam" },
      { province: "AB", share: 13, metro: "Calgary" },
      { province: "QC", share: 8, metro: "Montreal" },
    ],
    languages: ["Korean", "English", "French"],
    insight: [
      "Korean-Canadian commerce is densely clustered and retail-forward, with well-defined commercial corridors in North York and Coquitlam that function as testbeds for consumer products. Korean grocery and beauty retail in particular have proven to be reliable early distribution for brands later picked up by mainstream banners.",
      "The community's strong small-business ownership rate means partner and franchise conversations tend to move faster than in comparable markets, but expect direct negotiation on margin and exclusivity. Established Korean-Canadian distributors typically want defined territory in exchange for the shelf access they provide.",
    ],
  },
];

export function getCommunity(country: string): DiasporaCommunity {
  return COMMUNITIES.find((c) => c.country === country) ?? DEFAULT_COMMUNITY;
}

export function hasCommunityProfile(country: string): boolean {
  return COMMUNITIES.some((c) => c.country === country);
}

/* -------------------------------------------------------------------------- */
/*  Organisations — fictional, for demonstration only                          */
/* -------------------------------------------------------------------------- */

export const DIASPORA_ORGANISATIONS: DiasporaOrganization[] = [
  {
    id: "org-maple-bharat",
    name: "Maple–Bharat Business Council",
    type: "chamber",
    country: "India",
    province: "ON",
    city: "Toronto",
    blurb:
      "Bilateral trade council running quarterly buyer-supplier matchmaking and a formal market-entry mentoring track for Indian companies establishing Canadian operations.",
    memberCount: 1450,
    focusAreas: ["Trade missions", "Buyer matchmaking", "Policy advocacy"],
  },
  {
    id: "org-punjab-retail",
    name: "Punjab Retail Alliance",
    type: "business-network",
    country: "India",
    province: "ON",
    city: "Brampton",
    blurb:
      "Buying group of roughly 180 independent South Asian grocers across the Greater Toronto Area. Negotiates listings collectively, which lets a new brand reach real shelf volume in a single conversation.",
    memberCount: 180,
    focusAreas: ["Grocery retail", "Collective buying"],
  },
  {
    id: "org-naija-enterprise",
    name: "Naija Enterprise Network Canada",
    type: "business-network",
    country: "Nigeria",
    province: "ON",
    city: "Toronto",
    blurb:
      "Founder network of Nigerian-Canadian business owners with chapters in Toronto, Calgary, and Montreal. Runs a structured introduction programme for companies entering from West Africa.",
    memberCount: 620,
    focusAreas: ["Founder network", "Introductions", "Mentoring"],
  },
  {
    id: "org-lagos-calgary",
    name: "Lagos–Calgary Trade Circle",
    type: "chamber",
    country: "Nigeria",
    province: "AB",
    city: "Calgary",
    blurb:
      "Energy and professional services focused trade body linking Alberta procurement teams with Nigerian suppliers and service firms.",
    memberCount: 310,
    focusAreas: ["Energy services", "Procurement"],
  },
  {
    id: "org-sakura-commerce",
    name: "Sakura Commerce Association",
    type: "chamber",
    country: "Japan",
    province: "BC",
    city: "Vancouver",
    blurb:
      "Long-established association of Japanese-owned businesses and Canadian subsidiaries on the west coast. Hosts a standing introduction programme for industrial entrants seeking procurement contacts.",
    memberCount: 540,
    focusAreas: ["Industrial procurement", "Trade facilitation"],
  },
  {
    id: "org-nikkei-founders",
    name: "Nikkei Founders Collective",
    type: "business-network",
    country: "Japan",
    province: "ON",
    city: "Toronto",
    blurb:
      "Peer network of Japanese-Canadian operators and founders in technology and advanced manufacturing, with a monthly technical roundtable in Toronto.",
    memberCount: 240,
    focusAreas: ["Advanced manufacturing", "Technology"],
  },
  {
    id: "org-thistle-exchange",
    name: "Thistle Exchange",
    type: "business-network",
    country: "United Kingdom",
    province: "ON",
    city: "Toronto",
    blurb:
      "Informal but well-connected network of British founders and executives in Canada. Best used for candid advice on what transfers from the UK market and what does not.",
    memberCount: 890,
    focusAreas: ["Peer advice", "Executive network"],
  },
  {
    id: "org-verde-atlantico",
    name: "Verde Atlântico Business Circle",
    type: "cultural-association",
    country: "Brazil",
    province: "QC",
    city: "Montreal",
    blurb:
      "Portuguese-language business circle spanning the Brazilian and Portuguese communities in Montreal, with practical support on Quebec francisation and French-language compliance.",
    memberCount: 380,
    focusAreas: ["Language compliance", "Community retail"],
  },
  {
    id: "org-hanguk-trade",
    name: "Hanguk Trade Forum",
    type: "chamber",
    country: "South Korea",
    province: "BC",
    city: "Coquitlam",
    blurb:
      "Korean-Canadian trade forum with deep links into Korean grocery and beauty retail in Metro Vancouver. Runs a twice-yearly product showcase for new entrants.",
    memberCount: 470,
    focusAreas: ["Consumer retail", "Beauty & personal care"],
  },
  {
    id: "org-newcomer-founders",
    name: "Newcomer Founders Institute",
    type: "incubator",
    country: "multi",
    province: "ON",
    city: "Toronto",
    blurb:
      "Twelve-week programme for immigrant and foreign founders establishing Canadian operations, covering incorporation, banking, hiring, and a demo day with Canadian buyers.",
    memberCount: 95,
    focusAreas: ["Incubation", "Market entry", "Fundraising"],
  },
  {
    id: "org-pacific-gateway-diaspora",
    name: "Pacific Gateway Diaspora Council",
    type: "chamber",
    country: "multi",
    province: "BC",
    city: "Vancouver",
    blurb:
      "Pan-diaspora chamber coordinating across twelve national business associations in British Columbia, useful when your community has no dedicated body of its own.",
    memberCount: 2100,
    focusAreas: ["Cross-community", "Trade missions"],
  },
  {
    id: "org-prairie-newcomer",
    name: "Prairie Newcomer Business Alliance",
    type: "business-network",
    country: "multi",
    province: "AB",
    city: "Edmonton",
    blurb:
      "Alberta-wide alliance supporting immigrant-owned businesses with procurement access, provincial grant navigation, and a mentor register.",
    memberCount: 730,
    focusAreas: ["Procurement", "Grant navigation"],
  },
];

/* -------------------------------------------------------------------------- */
/*  Mentors — fictional, for demonstration only                                */
/* -------------------------------------------------------------------------- */

export const DIASPORA_MENTORS: DiasporaMentor[] = [
  {
    id: "mentor-priya-raghavan",
    name: "Priya Raghavan",
    role: "VP International",
    company: "Cardinal Foods Canada",
    homeCountry: "India",
    province: "ON",
    city: "Mississauga",
    yearsInCanada: 14,
    blurb:
      "Took a Chennai packaged-food business from first container to national grocery listing over four years. Direct and specific on retail margin structures and what a Canadian buyer actually wants in a listing pitch.",
    expertise: ["Grocery retail", "Distribution", "Packaging compliance"],
    languages: ["English", "Tamil", "Hindi"],
    matchScore: 95,
  },
  {
    id: "mentor-arjun-mehta",
    name: "Arjun Mehta",
    role: "Founder",
    company: "Northbridge Analytics",
    homeCountry: "India",
    province: "ON",
    city: "Toronto",
    yearsInCanada: 9,
    blurb:
      "Built a Bengaluru software company's Canadian subsidiary from zero to forty staff. Useful on SR&ED claims, technical hiring, and structuring a subsidiary that keeps IP where you want it.",
    expertise: ["SaaS", "SR&ED", "Subsidiary structuring"],
    languages: ["English", "Hindi", "Kannada"],
    matchScore: 88,
  },
  {
    id: "mentor-chidi-okafor",
    name: "Chidi Okafor",
    role: "Managing Partner",
    company: "Ridgeway Industrial Partners",
    homeCountry: "Nigeria",
    province: "AB",
    city: "Calgary",
    yearsInCanada: 18,
    blurb:
      "Twenty years in Alberta energy procurement, latterly advising West African suppliers on qualifying for Canadian operator vendor lists. Blunt about how long qualification actually takes.",
    expertise: ["Energy procurement", "Vendor qualification", "B2B sales"],
    languages: ["English", "Igbo"],
    matchScore: 91,
  },
  {
    id: "mentor-amina-bello",
    name: "Amina Bello",
    role: "Director of Operations",
    company: "Harvest Lane Consumer Brands",
    homeCountry: "Nigeria",
    province: "ON",
    city: "Toronto",
    yearsInCanada: 11,
    blurb:
      "Led the Canadian launch of a Lagos personal care brand across independent and ethnic retail before a national banner listing. Strong on CFIA and labelling review cycles.",
    expertise: ["Consumer goods", "CFIA compliance", "Retail launch"],
    languages: ["English", "Yoruba"],
    matchScore: 87,
  },
  {
    id: "mentor-kenji-sato",
    name: "Kenji Sato",
    role: "General Manager, Canada",
    company: "Meridian Automation Systems",
    homeCountry: "Japan",
    province: "BC",
    city: "Vancouver",
    yearsInCanada: 21,
    blurb:
      "Established and ran the Canadian arm of a Japanese industrial controls manufacturer for two decades. Deep on OEM procurement cycles, technical certification, and hiring bilingual field engineers.",
    expertise: ["Industrial equipment", "OEM sales", "Certification"],
    languages: ["Japanese", "English"],
    matchScore: 97,
  },
  {
    id: "mentor-yuki-tanaka",
    name: "Yuki Tanaka",
    role: "Head of Supply Chain",
    company: "Coastline Trading Canada",
    homeCountry: "Japan",
    province: "BC",
    city: "Richmond",
    yearsInCanada: 12,
    blurb:
      "Runs Pacific inbound logistics for a Japanese trading house. Practical on customs brokerage selection, bonded warehousing, and the real cost difference between Vancouver and eastern entry.",
    expertise: ["Logistics", "Customs", "Port operations"],
    languages: ["Japanese", "English"],
    matchScore: 92,
  },
  {
    id: "mentor-eleanor-shaw",
    name: "Eleanor Shaw",
    role: "Chief Commercial Officer",
    company: "Brightpath Retail Group",
    homeCountry: "United Kingdom",
    province: "ON",
    city: "Toronto",
    yearsInCanada: 16,
    blurb:
      "Moved a UK homeware brand into Canadian department store retail. Candid on which British retail assumptions break here — particularly around provincial fragmentation and freight cost.",
    expertise: ["Retail strategy", "Brand positioning", "Buyer negotiation"],
    languages: ["English"],
    matchScore: 84,
  },
  {
    id: "mentor-rafael-costa",
    name: "Rafael Costa",
    role: "Co-founder",
    company: "Atlas Verde Technologies",
    homeCountry: "Brazil",
    province: "QC",
    city: "Montreal",
    yearsInCanada: 8,
    blurb:
      "Built a São Paulo software company's Montreal engineering office. Has been through OQLF francisation twice and will tell you exactly where the time goes.",
    expertise: ["Quebec compliance", "Francisation", "Technical hiring"],
    languages: ["Portuguese", "French", "English"],
    matchScore: 89,
  },
  {
    id: "mentor-jisoo-park",
    name: "Ji-soo Park",
    role: "Founder",
    company: "Hanwoo Provisions",
    homeCountry: "South Korea",
    province: "BC",
    city: "Coquitlam",
    yearsInCanada: 13,
    blurb:
      "Built a Korean food import business from a single storefront to regional distribution. Especially useful on negotiating territory and exclusivity with community distributors.",
    expertise: ["Food import", "Distributor agreements", "Community retail"],
    languages: ["Korean", "English"],
    matchScore: 86,
  },
  {
    id: "mentor-fatima-haddad",
    name: "Fatima Haddad",
    role: "Principal",
    company: "Northgate Advisory Collective",
    homeCountry: "multi",
    province: "ON",
    city: "Toronto",
    yearsInCanada: 20,
    blurb:
      "Advises foreign SMEs across communities on the first eighteen months in Canada. Generalist rather than sector specialist — a good first conversation if you are still choosing a province.",
    expertise: ["Market entry strategy", "Provincial selection", "Fundraising"],
    languages: ["English", "French", "Arabic"],
    matchScore: 80,
  },
  {
    id: "mentor-david-osei",
    name: "David Osei",
    role: "Director",
    company: "Prairie Gateway Ventures",
    homeCountry: "multi",
    province: "AB",
    city: "Edmonton",
    yearsInCanada: 15,
    blurb:
      "Works with immigrant founders on Alberta provincial grant applications and procurement access. Has sat on review panels, so knows what a weak application looks like from the other side.",
    expertise: ["Grant applications", "Public procurement"],
    languages: ["English", "Twi"],
    matchScore: 78,
  },
];

/* -------------------------------------------------------------------------- */
/*  Events — dates are relative so demo content never goes stale               */
/* -------------------------------------------------------------------------- */

export const DIASPORA_EVENTS: DiasporaEvent[] = [
  {
    id: "event-gta-showcase",
    title: "Greater Toronto Importer Showcase",
    daysFromNow: 12,
    city: "Toronto",
    province: "ON",
    format: "in-person",
    host: "Maple–Bharat Business Council",
    country: "multi",
    description:
      "Table-top showcase pairing forty new import brands with independent grocery and specialty retail buyers from across the GTA.",
  },
  {
    id: "event-pacific-roundtable",
    title: "Pacific Industrial Procurement Roundtable",
    daysFromNow: 21,
    city: "Vancouver",
    province: "BC",
    format: "hybrid",
    host: "Sakura Commerce Association",
    country: "Japan",
    description:
      "Closed-door session where procurement leads from four Canadian manufacturers outline upcoming sourcing needs and qualification requirements.",
  },
  {
    id: "event-quebec-compliance",
    title: "Quebec Market Compliance Clinic",
    daysFromNow: 30,
    city: "Montreal",
    province: "QC",
    format: "virtual",
    host: "Verde Atlântico Business Circle",
    country: "multi",
    description:
      "Working session on French labelling, OQLF francisation, and the packaging revision timeline, with a live review of attendee artwork.",
  },
  {
    id: "event-alberta-vendor",
    title: "Alberta Vendor Qualification Workshop",
    daysFromNow: 38,
    city: "Calgary",
    province: "AB",
    format: "in-person",
    host: "Lagos–Calgary Trade Circle",
    country: "Nigeria",
    description:
      "Step-by-step walkthrough of getting onto operator vendor lists in Alberta energy and industrial procurement, including insurance and safety prerequisites.",
  },
  {
    id: "event-founders-dinner",
    title: "Newcomer Founders Dinner",
    daysFromNow: 45,
    city: "Toronto",
    province: "ON",
    format: "in-person",
    host: "Newcomer Founders Institute",
    country: "multi",
    description:
      "Small-format dinner for founders in their first two years of Canadian operations. Twenty seats, deliberately cross-sector.",
  },
  {
    id: "event-grant-clinic",
    title: "Federal Grant Application Clinic",
    daysFromNow: 58,
    city: "Edmonton",
    province: "AB",
    format: "virtual",
    host: "Prairie Newcomer Business Alliance",
    country: "multi",
    description:
      "Line-by-line review of CanExport SME and IRAP applications with former programme reviewers, aimed at first-time applicants.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Labels and helpers                                                         */
/* -------------------------------------------------------------------------- */

export const ORG_TYPE_LABELS: Record<DiasporaOrgType, string> = {
  chamber: "Chamber of commerce",
  "business-network": "Business network",
  "cultural-association": "Cultural association",
  incubator: "Incubator",
};

export const EVENT_FORMAT_LABELS: Record<DiasporaEvent["format"], string> = {
  "in-person": "In person",
  virtual: "Virtual",
  hybrid: "Hybrid",
};

/** Resolves a relative event offset into an absolute date at render time. */
export function getEventDate(daysFromNow: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
}

/** Community matches first, then pan-diaspora bodies, then everything else. */
export function rankByCountry<T extends { country?: string; homeCountry?: string }>(
  items: T[],
  country: string,
): { matched: T[]; broader: T[] } {
  const key = (item: T) => item.country ?? item.homeCountry ?? "multi";
  return {
    matched: items.filter((i) => key(i) === country),
    broader: items.filter((i) => key(i) !== country),
  };
}
