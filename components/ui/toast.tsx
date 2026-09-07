"use client";

import * as React from "react";
import { CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { createId } from "@/lib/utils";

interface Toast {
  id: string;
  title: string;
  description?: string;
}

interface ToastContextValue {
  toast: (title: string, description?: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const toast = React.useCallback(
    (title: string, description?: string) => {
      const id = createId("toast");
      setToasts((t) => [...t, { id, title, description }]);
      setTimeout(() => dismiss(id), 4500);
    },
    [dismiss],
  );

  const value = React.useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        role="region"
        aria-label="Notifications"
        aria-live="polite"
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 px-4 sm:px-0"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-lg animate-fade-in",
            )}
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-500" aria-hidden="true" />
            <div className="flex-1">
              <p className="text-sm font-medium text-navy-800">{t.title}</p>
              {t.description && <p className="mt-0.5 text-sm text-slate-600">{t.description}</p>}
            </div>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="rounded p-0.5 text-slate-400 transition-colors hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-navy-600"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Dismiss notification</span>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
