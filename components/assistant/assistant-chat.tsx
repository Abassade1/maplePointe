"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, RotateCcw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/dashboard/page-header";
import { OnboardingGuard } from "@/components/dashboard/onboarding-guard";
import { MessageBubble } from "./message-bubble";
import { SuggestedQuestions } from "./suggested-questions";
import { useSimulatedLoading } from "@/hooks/use-simulated-loading";
import { useAppStore } from "@/store/use-app-store";
import { getAssistantResponse, getSimulatedLatency } from "@/lib/mock-assistant";

export function AssistantChat() {
  const loading = useSimulatedLoading();

  if (loading) return <AssistantSkeleton />;

  return (
    <OnboardingGuard>
      <ChatContent />
    </OnboardingGuard>
  );
}

function ChatContent() {
  const company = useAppStore((s) => s.company)!;
  const messages = useAppStore((s) => s.messages);
  const addMessage = useAppStore((s) => s.addMessage);
  const clearMessages = useAppStore((s) => s.clearMessages);

  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  function send(text: string) {
    const question = text.trim();
    if (!question || thinking) return;

    addMessage("user", question);
    setInput("");
    setThinking(true);

    // Simulated round trip — the response engine is entirely local.
    setTimeout(() => {
      addMessage("assistant", getAssistantResponse(question));
      setThinking(false);
      inputRef.current?.focus();
    }, getSimulatedLatency());
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <PageHeader
        title="AI Assistant"
        description="Ask anything about entering the Canadian market. Answers draw on your assessment profile."
      >
        {!isEmpty && (
          <Button variant="outline" size="sm" onClick={clearMessages}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            New conversation
          </Button>
        )}
      </PageHeader>

      {/* Message list */}
      <div
        className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-4 sm:p-6"
        role="log"
        aria-live="polite"
        aria-label="Conversation"
      >
        {isEmpty ? (
          <div className="flex h-full flex-col items-center justify-center px-4 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-600">
              <Bot className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-lg font-semibold text-navy-800">
              How can I help {company.name} enter Canada?
            </h2>
            <p className="mt-2 max-w-md leading-relaxed text-slate-600">
              I can walk you through licensing, sales tax, bilingual labelling, partner selection,
              costs, and timelines. Pick a starter question below or ask your own.
            </p>
          </div>
        ) : (
          <ul className="space-y-6">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {thinking && (
              <li className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-600">
                  <Bot className="h-4 w-4 text-white" aria-hidden="true" />
                </span>
                <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-4">
                  <span className="sr-only">Assistant is typing</span>
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                      style={{ animationDelay: `${delay}ms` }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </li>
            )}
            <div ref={endRef} />
          </ul>
        )}
      </div>

      {/* Composer */}
      <div className="mt-4 shrink-0">
        <SuggestedQuestions onSelect={send} disabled={thinking} />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="mt-3 flex items-center gap-2"
        >
          <label htmlFor="assistant-input" className="sr-only">
            Ask a question about entering the Canadian market
          </label>
          <input
            id="assistant-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about licensing, labelling, taxes, partners, costs…"
            autoComplete="off"
            className="h-11 flex-1 rounded-md border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-1"
          />
          <Button type="submit" size="icon" className="h-11 w-11" disabled={!input.trim() || thinking}>
            <Send className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>

        <p className="mt-2 text-xs text-slate-500">
          Demonstration assistant. Responses are pre-written and illustrative, not legal advice.
        </p>
      </div>
    </div>
  );
}

function AssistantSkeleton() {
  return (
    <div>
      <Skeleton className="h-9 w-56" />
      <Skeleton className="mt-3 h-5 w-[26rem] max-w-full" />
      <Skeleton className="mt-8 h-[26rem] w-full rounded-lg" />
      <Skeleton className="mt-4 h-11 w-full rounded-md" />
    </div>
  );
}
