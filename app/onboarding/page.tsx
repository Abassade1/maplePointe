import type { Metadata } from "next";
import Link from "next/link";
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";
import { Logo } from "@/components/layout/logo";

export const metadata: Metadata = {
  title: "Assessment — Northgate AI",
  description: "Tell us about your company so we can map your Canadian market entry.",
};

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="container flex h-16 items-center">
          <Link href="/" className="rounded-md" aria-label="Northgate AI home">
            <Logo />
          </Link>
        </div>
      </header>

      <main id="main-content" className="flex-1 py-10 sm:py-14">
        <div className="container max-w-3xl">
          <OnboardingWizard />
        </div>
      </main>
    </div>
  );
}
