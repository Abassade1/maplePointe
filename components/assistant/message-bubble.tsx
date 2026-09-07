"use client";

import { Bot } from "lucide-react";
import { DEMO_USER } from "@/lib/mock-data";
import type { ChatMessage } from "@/lib/types";
import { cn, formatTime } from "@/lib/utils";
import { useI18n, useT } from "@/lib/i18n/provider";

/** Renders the mock assistant's lightweight markdown: **bold**, lists, and paragraphs. */
function renderContent(content: string) {
  return content.split("\n\n").map((block, blockIndex) => {
    const lines = block.split("\n");
    const isList = lines.every((l) => /^\s*(?:[-*]|\d+\.)\s+/.test(l));

    if (isList) {
      const ordered = /^\s*\d+\./.test(lines[0]);
      const ListTag = ordered ? "ol" : "ul";
      return (
        <ListTag
          key={blockIndex}
          className={cn(
            "my-2 space-y-1.5 pl-5",
            ordered ? "list-decimal" : "list-disc",
          )}
        >
          {lines.map((line, i) => (
            <li key={i} className="leading-relaxed">
              {renderInline(line.replace(/^\s*(?:[-*]|\d+\.)\s+/, ""))}
            </li>
          ))}
        </ListTag>
      );
    }

    return (
      <p key={blockIndex} className="my-2 leading-relaxed first:mt-0 last:mb-0">
        {renderInline(block)}
      </p>
    );
  });
}

function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-navy-800">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function MessageBubble({ message }: { message: ChatMessage }) {
  const t = useT();
  const { tag } = useI18n();
  const isUser = message.role === "user";

  return (
    <li className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
          isUser ? "bg-slate-200 text-slate-700" : "bg-navy-600 text-white",
        )}
        aria-hidden="true"
      >
        {isUser ? DEMO_USER.initials : <Bot className="h-4 w-4" />}
      </span>

      <div className={cn("min-w-0 max-w-[46rem]", isUser && "flex flex-col items-end")}>
        <span className="sr-only">
          {isUser ? t.assistant.youSaid : t.assistant.assistantReplied}
        </span>
        <div
          className={cn(
            "rounded-lg px-4 py-3 text-sm",
            isUser
              ? "bg-navy-600 text-white"
              : "border border-slate-200 bg-white text-slate-700",
          )}
        >
          {isUser ? (
            <p className="leading-relaxed">{message.content}</p>
          ) : (
            renderContent(message.content)
          )}
        </div>
        <time
          dateTime={message.timestamp}
          className="mt-1.5 block px-1 text-xs text-slate-400"
        >
          {formatTime(message.timestamp, tag)}
        </time>
      </div>
    </li>
  );
}
