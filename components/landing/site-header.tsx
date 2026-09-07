import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="rounded-md" aria-label="Northgate AI home">
          <Logo />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          <a href="#how-it-works" className="rounded text-sm font-medium text-slate-600 transition-colors hover:text-navy-700">
            How it works
          </a>
          <a href="#customers" className="rounded text-sm font-medium text-slate-600 transition-colors hover:text-navy-700">
            Customers
          </a>
          <Link href="/dashboard" className="rounded text-sm font-medium text-slate-600 transition-colors hover:text-navy-700">
            Sign in
          </Link>
        </nav>
        <Button asChild size="sm" className="hidden sm:inline-flex">
          <Link href="/onboarding">Start your assessment</Link>
        </Button>
      </div>
    </header>
  );
}
