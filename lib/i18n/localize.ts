/**
 * Merges the canonical English mock data with a locale overlay.
 * English records stay the source of truth; overlays only supply prose.
 */
import type { Locale } from "./config";
import type {
  DiasporaCommunity,
  DiasporaEvent,
  DiasporaMentor,
  DiasporaOrganization,
  FundingProgram,
  LicenceItem,
  Partner,
  Province,
  ProvinceCode,
} from "@/lib/types";
import { PROVINCE_OVERVIEWS } from "@/lib/mock-data";
import {
  FR_LICENCES,
  FR_PARTNERS,
  FR_PROVINCE_CITIES,
  FR_PROVINCE_NAMES,
  FR_PROVINCE_OVERVIEWS,
  FR_PROVINCE_TAGLINES,
} from "./content/fr-module1";
import { FR_PROGRAMS } from "./content/fr-module2";
import {
  FR_COMMUNITY_ADJECTIVES,
  FR_COMMUNITY_INSIGHTS,
  FR_COUNTRIES,
  FR_EVENTS,
  FR_LANGUAGES,
  FR_MENTORS,
  FR_ORGANISATIONS,
} from "./content/fr-module3";

const isFr = (locale: Locale) => locale === "fr";

export function localizeProvince(province: Province, locale: Locale): Province {
  if (!isFr(locale)) return province;
  return {
    ...province,
    name: FR_PROVINCE_NAMES[province.code] ?? province.name,
    primaryCity: FR_PROVINCE_CITIES[province.code] ?? province.primaryCity,
    tagline: FR_PROVINCE_TAGLINES[province.code] ?? province.tagline,
  };
}

export function getProvinceOverview(code: ProvinceCode, locale: Locale): string[] {
  if (isFr(locale)) return FR_PROVINCE_OVERVIEWS[code] ?? PROVINCE_OVERVIEWS[code];
  return PROVINCE_OVERVIEWS[code];
}

export function localizeLicence(licence: LicenceItem, locale: Locale): LicenceItem {
  if (!isFr(locale)) return licence;
  const overlay = FR_LICENCES[licence.id];
  return overlay ? { ...licence, ...overlay } : licence;
}

export function localizePartner(partner: Partner, locale: Locale): Partner {
  if (!isFr(locale)) return partner;
  const overlay = FR_PARTNERS[partner.id];
  return overlay ? { ...partner, ...overlay } : partner;
}

export function localizeProgram(program: FundingProgram, locale: Locale): FundingProgram {
  if (!isFr(locale)) return program;
  const overlay = FR_PROGRAMS[program.id];
  return overlay ? { ...program, ...overlay } : program;
}

export function localizeOrganisation(
  org: DiasporaOrganization,
  locale: Locale,
): DiasporaOrganization {
  if (!isFr(locale)) return org;
  const overlay = FR_ORGANISATIONS[org.id];
  return overlay ? { ...org, ...overlay } : org;
}

export function localizeMentor(mentor: DiasporaMentor, locale: Locale): DiasporaMentor {
  if (!isFr(locale)) return mentor;
  const overlay = FR_MENTORS[mentor.id];
  return overlay ? { ...mentor, ...overlay } : mentor;
}

export function localizeEvent(event: DiasporaEvent, locale: Locale): DiasporaEvent {
  if (!isFr(locale)) return event;
  const overlay = FR_EVENTS[event.id];
  return overlay ? { ...event, ...overlay } : event;
}

export function localizeCommunity(
  community: DiasporaCommunity,
  locale: Locale,
): DiasporaCommunity {
  if (!isFr(locale)) return community;
  return {
    ...community,
    insight: FR_COMMUNITY_INSIGHTS[community.country] ?? community.insight,
    languages: community.languages.map((l) => FR_LANGUAGES[l] ?? l),
    provinceShares: community.provinceShares.map((share) => ({
      ...share,
      metro: share.metro.replace("Montreal", "Montréal").replace("Quebec", "Québec"),
    })),
  };
}

/** Country names appear in onboarding, the dashboard, and the diaspora module. */
export function localizeCountry(country: string, locale: Locale): string {
  if (!isFr(locale)) return country;
  return FR_COUNTRIES[country] ?? country;
}

/**
 * How to refer to a community in prose. English uses the country name
 * attributively ("the Japan community" reads wrong, so English uses the country
 * name directly); French needs an agreeing adjective ("la communauté japonaise").
 * Falls back to the country name when we have no adjective on file.
 */
export function communityLabel(country: string, locale: Locale): string {
  if (!isFr(locale)) return country;
  return FR_COMMUNITY_ADJECTIVES[country] ?? FR_COUNTRIES[country] ?? country;
}
