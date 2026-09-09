import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

/* -------------------------------------------------------------------------- */
/*  Reference data — illustrative but realistic. Not legal or tax advice.      */
/* -------------------------------------------------------------------------- */

const PROVINCES = [
  {
    code: "ON",
    name: "Ontario",
    overviewText:
      "Ontario is the default first stop for most foreign SMEs entering Canada. Roughly 39% of the national population and the largest concentration of head offices sit within a two-hour drive of Toronto. Most foreign companies either register an Ontario extra-provincial licence against an existing foreign corporation, or incorporate a federal subsidiary under the CBCA and register it extra-provincially. Either path requires an Ontario agent for service. Ontario charges a combined 13% HST, collected at point of sale rather than at the border for most goods.",
    licences: [
      {
        name: "Extra-Provincial Licence (Ontario Business Registry)",
        description:
          "Authorises a foreign or out-of-province corporation to carry on business in Ontario. Requires an Ontario agent for service with a physical provincial address. Roughly CA$330 and 2–4 weeks.",
        status: "required" as const,
        category: "registration",
      },
      {
        name: "CRA Business Number & Import/Export Account",
        description:
          "The federal identifier behind every subsequent tax, payroll, and customs account. The RM import/export program account must be open before your first shipment clears customs. Usually issued in 1–3 business days, no fee.",
        status: "required" as const,
        category: "tax",
      },
      {
        name: "HST Registration (13%)",
        description:
          "Mandatory once taxable supplies exceed CA$30,000 across four consecutive calendar quarters. Voluntary registration below the threshold lets you recover input tax credits on setup costs.",
        status: "required" as const,
        category: "tax",
      },
      {
        name: "WSIB Employer Registration",
        description:
          "Workplace safety insurance coverage. Registration is due within 10 days of hiring your first Ontario employee; premium rates vary by classification unit.",
        status: "required" as const,
        category: "employment",
      },
      {
        name: "Consumer Packaging & Labelling Act Compliance",
        description:
          "Federal rules governing bilingual product identity and net quantity declarations, dealer name and address, and metric units on consumer prepackaged goods sold anywhere in Canada.",
        status: "required" as const,
        category: "labelling",
      },
      {
        name: "Municipal Business Licence (City of Toronto)",
        description:
          "Required for many retail, food service, and trade categories operating within Toronto. Warehousing and pure B2B wholesale are frequently exempt — confirm against your specific category.",
        status: "recommended" as const,
        category: "permit",
      },
      {
        name: "Employer Health Tax Account",
        description:
          "Payroll tax on Ontario remuneration above the annual exemption. Not applicable until you have Ontario-based employees on payroll.",
        status: "not_applicable" as const,
        category: "employment",
      },
    ],
  },
  {
    code: "BC",
    name: "British Columbia",
    overviewText:
      "British Columbia is the natural entry point for companies shipping from Asia-Pacific. The Port of Vancouver clears more container volume than every other Canadian port combined, and transit times from Shanghai or Busan run roughly 5–8 days shorter than routing through Eastern Canada. BC is a Provincial Sales Tax province: you collect 5% federal GST plus 7% PST separately, and PST applies to some business inputs that would be recoverable under an HST regime.",
    licences: [
      {
        name: "Extraprovincial Company Registration",
        description:
          "Registration under the BC Business Corporations Act, including appointment of a BC-resident attorney for service. Name approval must be obtained first. Roughly CA$350 and 3–5 weeks.",
        status: "required" as const,
        category: "registration",
      },
      {
        name: "Business Name Approval Request",
        description:
          "Precedes registration. Standard processing runs 3–10 business days; priority review is available for an additional fee if your launch date is fixed.",
        status: "required" as const,
        category: "registration",
      },
      {
        name: "PST Registration (7%)",
        description:
          "Separate from your federal GST account. BC applies PST to some business inputs that are recoverable under an HST regime, so your effective tax cost exceeds the headline 12% combined rate.",
        status: "required" as const,
        category: "tax",
      },
      {
        name: "GST Registration (5%)",
        description:
          "Federal goods and services tax account, opened against your CRA Business Number. Same CA$30,000 small-supplier threshold applies as elsewhere in Canada.",
        status: "required" as const,
        category: "tax",
      },
      {
        name: "WorkSafeBC Employer Account",
        description:
          "Mandatory coverage for BC employees. Classification unit assignment drives your premium rate and is worth reviewing rather than accepting by default.",
        status: "required" as const,
        category: "employment",
      },
      {
        name: "City of Vancouver Business Licence",
        description:
          "Required for any business with a physical presence in Vancouver, including warehouse and office-only operations. Renewed annually, CA$150–CA$800.",
        status: "required" as const,
        category: "permit",
      },
      {
        name: "CFIA Import Licence (Safe Food for Canadians)",
        description:
          "Required to import or sell food products across provincial or international borders. Applies only to food and food-contact goods. Roughly CA$250 and 4–8 weeks.",
        status: "recommended" as const,
        category: "import",
      },
    ],
  },
  {
    code: "AB",
    name: "Alberta",
    overviewText:
      "Alberta offers the lightest tax burden of any Canadian province: an 8% general corporate rate and no provincial sales tax at all. For goods businesses that second point is the material one — you collect only 5% GST, which simplifies point-of-sale systems. Extra-provincial registration runs through Alberta Corporate Registries but must be filed through an authorised private service provider rather than directly with the province. Energy, agriculture, and logistics dominate the economy, and B2B buying runs through a comparatively small number of procurement relationships in Calgary and Edmonton.",
    licences: [
      {
        name: "Extra-Provincial Registration",
        description:
          "Filed through an authorised Alberta service provider rather than directly with the province. Requires an Alberta attorney for service with a physical provincial address. CA$275–CA$400, 1–3 weeks.",
        status: "required" as const,
        category: "registration",
      },
      {
        name: "GST Registration (5% only)",
        description:
          "Alberta levies no provincial sales tax, so 5% federal GST is the entire indirect tax burden at point of sale. This simplifies POS configuration and consumer price testing.",
        status: "required" as const,
        category: "tax",
      },
      {
        name: "WCB Alberta Account",
        description:
          "Workers' compensation coverage, mandatory for most industries before your first employee begins work. Some professional service categories are exempt.",
        status: "required" as const,
        category: "employment",
      },
      {
        name: "City of Calgary Business Licence",
        description:
          "Required for most commercial activity within Calgary city limits, with fees varying widely by category. Home-based and warehouse operations have distinct sub-categories.",
        status: "required" as const,
        category: "permit",
      },
      {
        name: "CBSA Import/Export Program Account",
        description:
          "The RM account extension on your Business Number. Required before your first commercial shipment can clear customs regardless of entry province.",
        status: "required" as const,
        category: "import",
      },
      {
        name: "Provincial Sales Tax Registration",
        description:
          "Not applicable. Alberta is the only province with no PST or harmonised provincial component, so no separate provincial sales tax account exists to register for.",
        status: "not_applicable" as const,
        category: "tax",
      },
    ],
  },
];

const PARTNERS = [
  {
    name: "Maple Ridge Distribution",
    type: "distributor" as const,
    province: "ON",
    blurb:
      "Mid-market grocery and specialty retail distributor covering roughly 400 doors across southern Ontario. Handles listing negotiations and category reviews for first-time entrants.",
    contactEmail: "intros@mapleridge.example.com",
  },
  {
    name: "Bellweather Trade Counsel LLP",
    type: "legal_advisor" as const,
    province: "ON",
    blurb:
      "Boutique firm focused on inbound market entry: entity structuring, extra-provincial registration, distribution agreements, and Competition Act labelling review.",
    contactEmail: "newclients@bellweather.example.com",
  },
  {
    name: "North Star Freight Solutions",
    type: "logistics" as const,
    province: "ON",
    blurb:
      "3PL operating fulfilment centres in Toronto and Montreal. Offers a shared-space model that avoids minimum-volume commitments during a pilot launch.",
    contactEmail: "hello@northstarfreight.example.com",
  },
  {
    name: "Harbourline Logistics",
    type: "logistics" as const,
    province: "BC",
    blurb:
      "Customs brokerage and bonded warehousing at the Port of Vancouver. Strong on Asia-Pacific inbound consolidation and cross-dock into rail for eastern distribution.",
    contactEmail: "quotes@harbourline.example.com",
  },
  {
    name: "Cascadia Market Partners",
    type: "local_agent" as const,
    province: "BC",
    blurb:
      "Commission-based sales agency representing foreign brands to BC independent retail. Typically carries 8–12 non-competing lines on a 90-day validation engagement.",
    contactEmail: "partners@cascadiamarket.example.com",
  },
  {
    name: "Pacific Rim Legal Group",
    type: "legal_advisor" as const,
    province: "BC",
    blurb:
      "Advises Asia-Pacific companies on BC entity setup, PST registration, and employment standards. Working languages include Mandarin, Korean, and Japanese.",
    contactEmail: "intake@pacificrimlegal.example.com",
  },
  {
    name: "Bow Valley Industrial Supply",
    type: "distributor" as const,
    province: "AB",
    blurb:
      "Industrial and energy-sector distributor with established procurement relationships across Calgary and Edmonton. Prefers exclusive territory arrangements.",
    contactEmail: "vendors@bowvalleysupply.example.com",
  },
  {
    name: "Chinook Corporate Services",
    type: "legal_advisor" as const,
    province: "AB",
    blurb:
      "Registered Alberta service provider handling extra-provincial filings and attorney-for-service arrangements. Fast and inexpensive for straightforward registrations.",
    contactEmail: "filings@chinookcorp.example.com",
  },
  {
    name: "Prairie Gateway Agents",
    type: "local_agent" as const,
    province: "AB",
    blurb:
      "Manufacturers' representative covering Alberta and Saskatchewan B2B accounts. Works retainer-plus-commission and reports pipeline monthly.",
    contactEmail: "reps@prairiegateway.example.com",
  },
  {
    name: "Great Lakes Customs Brokers",
    type: "logistics" as const,
    province: "ON",
    blurb:
      "Customs brokerage specialising in CUSMA rules-of-origin certification and tariff classification for first-time importers into Ontario.",
    contactEmail: "clearance@greatlakescustoms.example.com",
  },
];

async function main() {
  console.log("Seeding…");

  // Idempotent: wipe reference data so re-running does not duplicate rows.
  // User-owned rows cascade from Province via LicenceItem, so clear them first.
  await prisma.chatMessage.deleteMany();
  await prisma.checklistItem.deleteMany();
  await prisma.partner.deleteMany();
  await prisma.licenceItem.deleteMany();
  await prisma.province.deleteMany();

  for (const p of PROVINCES) {
    const province = await prisma.province.create({
      data: { code: p.code, name: p.name, overviewText: p.overviewText },
    });
    await prisma.licenceItem.createMany({
      data: p.licences.map((l) => ({ ...l, provinceId: province.id })),
    });
    console.log(`  ${p.name}: ${p.licences.length} licence items`);
  }

  const provinceByCode = new Map(
    (await prisma.province.findMany()).map((p) => [p.code, p.id]),
  );

  for (const partner of PARTNERS) {
    const provinceId = provinceByCode.get(partner.province);
    if (!provinceId) throw new Error(`Unknown province code ${partner.province}`);
    await prisma.partner.create({
      data: {
        name: partner.name,
        type: partner.type,
        blurb: partner.blurb,
        contactEmail: partner.contactEmail,
        provinceId,
      },
    });
  }
  console.log(`  ${PARTNERS.length} partners`);

  const [provinces, licences, partners] = await Promise.all([
    prisma.province.count(),
    prisma.licenceItem.count(),
    prisma.partner.count(),
  ]);
  console.log(`Done: ${provinces} provinces, ${licences} licence items, ${partners} partners.`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
