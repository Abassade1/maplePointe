import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";
import { OnboardingHeader } from "@/components/onboarding/onboarding-header";

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <OnboardingHeader />
      <main id="main-content" className="flex-1 py-10 sm:py-14">
        <div className="container max-w-3xl">
          <OnboardingWizard />
        </div>
      </main>
    </div>
  );
}
