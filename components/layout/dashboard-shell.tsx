"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { DashboardNav } from "./dashboard-sidebar";
import { UserMenu } from "./user-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
          {/* Mobile drawer trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation menu">
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent title="Dashboard navigation">
              <div className="mb-8">
                <Logo />
              </div>
              <DashboardNav onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>

          <Link href="/dashboard" className="rounded-md" aria-label="Northgate AI dashboard">
            <Logo />
          </Link>

          <div className="ml-auto">
            <UserMenu />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-slate-200 bg-white px-4 py-6 lg:block">
          <DashboardNav />
          <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Coming soon
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li>Funding Copilot</li>
              <li>Diaspora Bridge</li>
            </ul>
          </div>
        </aside>

        <main id="main-content" className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
