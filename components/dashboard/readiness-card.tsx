"use client";

import { Gauge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function readinessLabel(score: number) {
  if (score >= 80) return { label: "Launch ready", tone: "text-teal-700" };
  if (score >= 60) return { label: "On track", tone: "text-teal-700" };
  if (score >= 40) return { label: "Early progress", tone: "text-amber-700" };
  return { label: "Getting started", tone: "text-slate-600" };
}

export function ReadinessCard({ score }: { score: number }) {
  const { label, tone } = readinessLabel(score);

  // Semi-circular gauge geometry.
  const radius = 52;
  const circumference = Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-navy-600" aria-hidden="true" />
          <CardTitle className="text-base">Readiness score</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-5">
          <svg viewBox="0 0 130 72" className="h-[72px] w-[130px] shrink-0" role="img" aria-label={`Readiness score ${score} out of 100`}>
            <path
              d="M 13 65 A 52 52 0 0 1 117 65"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d="M 13 65 A 52 52 0 0 1 117 65"
              fill="none"
              stroke="#0F6E56"
              strokeWidth="11"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-700"
            />
          </svg>
          <div>
            <p className="text-4xl font-semibold tabular-nums leading-none text-navy-800">{score}%</p>
            <p className={`mt-2 text-sm font-medium ${tone}`}>{label}</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          An illustrative blend of profile completeness and checklist progress. It moves as you
          work through your requirements.
        </p>
      </CardContent>
    </Card>
  );
}
