import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { I18nProvider } from "@/lib/i18n/provider";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { LOCALES, LOCALE_TAGS, isLocale } from "@/lib/i18n/config";
import { SkipLink } from "@/components/layout/skip-link";
import { ToastProvider } from "@/components/ui/toast";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const METADATA: Record<string, { title: string; description: string }> = {
  en: {
    title: "Northgate AI — Market-Entry Navigator",
    description:
      "AI-guided market entry for foreign SMEs expanding into Canada. Understand licensing, bilingual compliance, funding, and find vetted local partners.",
  },
  fr: {
    title: "Northgate AI — Navigateur d'entrée sur le marché",
    description:
      "Entrée sur le marché guidée par l'IA pour les PME étrangères qui s'implantent au Canada. Licences, conformité bilingue, financement et partenaires locaux évalués.",
  },
};

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const meta = METADATA[params.locale] ?? METADATA.en;
  return { title: meta.title, description: meta.description };
}

/**
 * This is the root layout. It lives under [locale] so the html lang attribute
 * can reflect the active locale — a root layout at app/ never receives the
 * child segment's params.
 */
export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();

  const dictionary = getDictionary(params.locale);

  return (
    <html lang={LOCALE_TAGS[params.locale]} className={inter.variable}>
      <body className="font-sans">
        <I18nProvider locale={params.locale} dictionary={dictionary}>
          <SkipLink />
          <ToastProvider>{children}</ToastProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
