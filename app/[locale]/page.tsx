import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Modules } from "@/components/landing/modules";
import { SocialProof } from "@/components/landing/social-proof";
import { ClosingCta } from "@/components/landing/closing-cta";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Hero />
        <HowItWorks />
        <Modules />
        <SocialProof />
        <ClosingCta />
      </main>
      <SiteFooter />
    </div>
  );
}
