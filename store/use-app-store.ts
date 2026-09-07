"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  ChatMessage,
  ChecklistItem,
  Company,
  LicenceItem,
  ProvinceCode,
} from "@/lib/types";
import { createId } from "@/lib/utils";

interface AppState {
  company: Company | null;
  checklist: ChecklistItem[];
  messages: ChatMessage[];
  /** Partner ids the user has requested an introduction to. */
  requestedIntros: string[];
  /** Zustand persist rehydration flag — guards against SSR/client markup mismatch. */
  hasHydrated: boolean;

  setCompany: (company: Company) => void;
  resetCompany: () => void;

  addChecklistItem: (licence: LicenceItem) => void;
  removeChecklistItem: (licenceId: string) => void;
  toggleChecklistItem: (licenceId: string) => void;
  isInChecklist: (licenceId: string) => boolean;
  clearChecklist: () => void;

  addMessage: (role: ChatMessage["role"], content: string) => void;
  clearMessages: () => void;

  requestIntro: (partnerId: string) => void;

  setHasHydrated: (value: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      company: null,
      checklist: [],
      messages: [],
      requestedIntros: [],
      hasHydrated: false,

      setCompany: (company) => set({ company }),
      resetCompany: () =>
        set({ company: null, checklist: [], messages: [], requestedIntros: [] }),

      addChecklistItem: (licence) => {
        if (get().checklist.some((i) => i.licenceId === licence.id)) return;
        set((state) => ({
          checklist: [
            ...state.checklist,
            {
              licenceId: licence.id,
              province: licence.province,
              completed: false,
              addedAt: new Date().toISOString(),
            },
          ],
        }));
      },

      removeChecklistItem: (licenceId) =>
        set((state) => ({
          checklist: state.checklist.filter((i) => i.licenceId !== licenceId),
        })),

      toggleChecklistItem: (licenceId) =>
        set((state) => ({
          checklist: state.checklist.map((i) =>
            i.licenceId === licenceId ? { ...i, completed: !i.completed } : i,
          ),
        })),

      isInChecklist: (licenceId) =>
        get().checklist.some((i) => i.licenceId === licenceId),

      clearChecklist: () => set({ checklist: [] }),

      addMessage: (role, content) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              id: createId("msg"),
              role,
              content,
              timestamp: new Date().toISOString(),
            },
          ],
        })),

      clearMessages: () => set({ messages: [] }),

      requestIntro: (partnerId) =>
        set((state) =>
          state.requestedIntros.includes(partnerId)
            ? state
            : { requestedIntros: [...state.requestedIntros, partnerId] },
        ),

      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "northgate-ai-store",
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
);

/* ------------------------------ selectors ------------------------------- */

export function selectChecklistProgress(items: ChecklistItem[]) {
  const total = items.length;
  const completed = items.filter((i) => i.completed).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { total, completed, percent };
}

export function groupChecklistByProvince(items: ChecklistItem[]) {
  return items.reduce<Record<string, ChecklistItem[]>>((acc, item) => {
    (acc[item.province] ??= []).push(item);
    return acc;
  }, {});
}

/**
 * Mock readiness score. Blends onboarding completeness with checklist progress
 * so the dashboard number moves as the user works — purely illustrative.
 */
export function computeReadinessScore(
  company: Company | null,
  checklist: ChecklistItem[],
): number {
  if (!company) return 0;
  let score = 35;
  if (company.targetProvinces.length > 0) score += 10;
  if (company.goals.length > 0) score += 5;
  if (company.productDescription.length > 40) score += 5;
  if (checklist.length > 0) score += 10;
  const { percent } = selectChecklistProgress(checklist);
  score += Math.round(percent * 0.35);
  return Math.min(score, 100);
}

/** Province codes the user selected, used to scope Guide and Checklist views. */
export function selectTargetProvinces(company: Company | null): ProvinceCode[] {
  return company?.targetProvinces ?? [];
}
