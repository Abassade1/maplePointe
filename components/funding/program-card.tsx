"use client";

import { Building2, Check, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CompetitivenessBadge, FundingTypeBadge } from "./funding-badges";
import { ProgramDetailDialog } from "./program-detail-dialog";
import { useToast } from "@/components/ui/toast";
import { useAppStore } from "@/store/use-app-store";
import { getProvince } from "@/lib/mock-data";
import { formatAmountRange } from "@/lib/utils";
import type { FundingProgram } from "@/lib/types";

export function ProgramCard({ program }: { program: FundingProgram }) {
  const tracked = useAppStore((s) =>
    s.fundingApplications.some((a) => a.programId === program.id),
  );
  const trackProgram = useAppStore((s) => s.trackProgram);
  const { toast } = useToast();

  function handleTrack() {
    trackProgram(program);
    toast(
      "Added to your pipeline",
      `${program.name} is now tracked in your funding pipeline.`,
    );
  }

  return (
    <Card className="flex h-full flex-col">
      <CardContent className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold leading-tight text-navy-800">{program.name}</h3>
            <p className="mt-1.5 flex items-center gap-1 text-sm text-slate-500">
              <Building2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{program.provider}</span>
            </p>
          </div>
          <span
            className="shrink-0 rounded-md bg-teal-50 px-2 py-1 text-center"
            aria-label={`Match score ${program.matchScore} out of 100`}
          >
            <span className="block text-sm font-semibold tabular-nums leading-none text-teal-700">
              {program.matchScore}
            </span>
            <span className="mt-0.5 block text-[10px] uppercase tracking-wide text-teal-600">
              match
            </span>
          </span>
        </div>

        <p className="mt-4 text-2xl font-semibold tabular-nums text-navy-800">
          {formatAmountRange(program.minAmount, program.maxAmount)}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <FundingTypeBadge type={program.type} />
          <span className="rounded-full border border-slate-300 px-2.5 py-0.5 text-xs text-slate-600">
            {program.level === "federal"
              ? "Federal"
              : getProvince(program.province!).name}
          </span>
          <CompetitivenessBadge level={program.competitiveness} />
        </div>

        <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
          {program.description}
        </p>

        <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
          <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {program.applicationWindow}
        </p>

        <div className="mt-5 flex items-center gap-2">
          <ProgramDetailDialog program={program} />
          <Button
            onClick={handleTrack}
            disabled={tracked}
            variant={tracked ? "secondary" : "accent"}
            size="sm"
            className="flex-1"
            aria-label={
              tracked
                ? `${program.name} is already in your pipeline`
                : `Track ${program.name} in your funding pipeline`
            }
          >
            {tracked ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                Tracked
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" aria-hidden="true" />
                Track
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
