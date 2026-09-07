"use client";

import { getSuggestedQuestions } from "@/lib/mock-assistant";
import { useI18n, useT } from "@/lib/i18n/provider";

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
  disabled?: boolean;
}

export function SuggestedQuestions({ onSelect, disabled }: SuggestedQuestionsProps) {
  const t = useT();
  const { locale } = useI18n();

  return (
    <div>
      <h2 className="sr-only">{t.assistant.suggested}</h2>
      <ul className="flex flex-wrap gap-2">
        {getSuggestedQuestions(locale).map((question) => (
          <li key={question}>
            <button
              type="button"
              onClick={() => onSelect(question)}
              disabled={disabled}
              className="rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-sm text-slate-700 transition-colors hover:border-navy-300 hover:bg-navy-50 hover:text-navy-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2 disabled:opacity-50"
            >
              {question}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
