"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { DashboardNav } from "./dashboard-sidebar";
import { UserMenu } from "./user-menu";
import { LocaleLink } from "@/components/i18n/locale-link";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n/provider";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const t = useT();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label={t.common.openMenu}>
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent title={t.nav.dashboard} closeLabel={t.common.closeMenu}>
              <div className="mb-8">
                <Logo />
              </div>
              <DashboardNav onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>

          <LocaleLink href="/dashboard" className="rounded-md" aria-label={t.common.dashboardLink}>
            <Logo />
          </LocaleLink>

          <div className="ml-auto flex items-center gap-3">
            <LanguageSwitcher />
            <UserMenu />
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-slate-200 bg-white px-4 py-6 lg:block">
          <DashboardNav />
        </aside>

        <main id="main-content" className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
