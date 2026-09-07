"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/use-app-store";

/**
 * Mimics a first-load fetch so every data-driven screen can show a skeleton.
 * Also waits for the persisted store to rehydrate, which avoids rendering an
 * "empty" state for a moment before local storage comes back.
 */
export function useSimulatedLoading(delay = 650): boolean {
  const hasHydrated = useAppStore((s) => s.hasHydrated);
  const [elapsed, setElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setElapsed(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return !elapsed || !hasHydrated;
}
