"use client";

import { SUGGESTED_QUESTIONS } from "@/lib/mock-assistant";

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
  disabled?: boolean;
}

export function SuggestedQuestions({ onSelect, disabled }: SuggestedQuestionsProps) {
  return (
    <div>
      <h2 className="sr-only">Suggested questions</h2>
      <ul className="flex flex-wrap gap-2">
        {SUGGESTED_QUESTIONS.map((question) => (
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
