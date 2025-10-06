import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { StudioStep, ComposeSlotId, ComposeSlot } from "./types";

interface FlowState {
  // Studio flow state
  step: StudioStep;
  draftId: string | null;

  // Compose state (V2: replaces Script + Make)
  slots: Record<ComposeSlotId, ComposeSlot>;
  selectedVariantId: string | null;

  // Caption settings (shared across slots)
  autoCaptions: boolean;
  brandStyleCaptions: boolean;

  // Publish state
  platformToggles: {
    instagram: boolean;
    tiktok: boolean;
    youtube: boolean;
  };
  caption: string;
  hashtags: string;

  // Actions
  setStep: (step: StudioStep) => void;
  setDraftId: (id: string) => void;
  applyScriptVariant: (variantId: string) => void;
  setSlotOverlay: (slotId: ComposeSlotId, text: string) => void;
  setSlotARollMode: (slotId: ComposeSlotId, mode: "upload" | "ai") => void;
  toggleSlotBrandMedia: (slotId: ComposeSlotId, mediaId: string) => void;
  setAutoCaptions: (enabled: boolean) => void;
  setBrandStyleCaptions: (enabled: boolean) => void;
  togglePlatform: (platform: "instagram" | "tiktok" | "youtube") => void;
  setCaption: (caption: string) => void;
  setHashtags: (hashtags: string) => void;
  resetAll: () => void;
  nextStep: () => void;
  previousStep: () => void;
}

// Initial slot state for compose step
const createInitialSlots = (): Record<ComposeSlotId, ComposeSlot> => ({
  hook: {
    id: "hook",
    label: "Hook",
    targetSec: 4, // 3-5s average
    overlayText: "",
    aRollMode: "upload",
    mediaBrandIds: [],
  },
  body: {
    id: "body",
    label: "Body",
    targetSec: 16, // 12-20s average
    overlayText: "",
    aRollMode: "upload",
    mediaBrandIds: [],
  },
  cta: {
    id: "cta",
    label: "CTA",
    targetSec: 4, // 3-5s average
    overlayText: "",
    aRollMode: "upload",
    mediaBrandIds: [],
  },
});

const initialState = {
  step: "plan" as StudioStep,
  draftId: null,
  slots: createInitialSlots(),
  selectedVariantId: null,
  autoCaptions: true,
  brandStyleCaptions: true,
  platformToggles: {
    instagram: true,
    tiktok: true,
    youtube: false,
  },
  caption: "",
  hashtags: "",
};

export const useFlowStore = create<FlowState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setStep: (step) => set({ step }),

      setDraftId: (id) => set({ draftId: id }),

      // Apply a script variant to all slots
      applyScriptVariant: (variantId) => {
        // This will be called with the variant data from mock.ts
        // The actual variant data will be passed in from the UI component
        set({ selectedVariantId: variantId });
      },

      // Update overlay text for a specific slot
      setSlotOverlay: (slotId, text) =>
        set((state) => ({
          slots: {
            ...state.slots,
            [slotId]: {
              ...state.slots[slotId],
              overlayText: text,
            },
          },
        })),

      // Update A-roll mode for a specific slot
      setSlotARollMode: (slotId, mode) =>
        set((state) => ({
          slots: {
            ...state.slots,
            [slotId]: {
              ...state.slots[slotId],
              aRollMode: mode,
            },
          },
        })),

      // Toggle brand media selection for a specific slot
      toggleSlotBrandMedia: (slotId, mediaId) =>
        set((state) => {
          const slot = state.slots[slotId];
          const isSelected = slot.mediaBrandIds.includes(mediaId);
          return {
            slots: {
              ...state.slots,
              [slotId]: {
                ...slot,
                mediaBrandIds: isSelected
                  ? slot.mediaBrandIds.filter((id) => id !== mediaId)
                  : [...slot.mediaBrandIds, mediaId],
              },
            },
          };
        }),

      setAutoCaptions: (enabled) => set({ autoCaptions: enabled }),

      setBrandStyleCaptions: (enabled) => set({ brandStyleCaptions: enabled }),

      togglePlatform: (platform) =>
        set((state) => ({
          platformToggles: {
            ...state.platformToggles,
            [platform]: !state.platformToggles[platform],
          },
        })),

      setCaption: (caption) => set({ caption }),

      setHashtags: (hashtags) => set({ hashtags }),

      // Reset all state and clear sessionStorage
      resetAll: () => set({ ...initialState, slots: createInitialSlots() }),

      nextStep: () => {
        const currentStep = get().step;
        const steps: StudioStep[] = ["plan", "compose", "publish"];
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex < steps.length - 1) {
          set({ step: steps[currentIndex + 1] });
        }
      },

      previousStep: () => {
        const currentStep = get().step;
        const steps: StudioStep[] = ["plan", "compose", "publish"];
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex > 0) {
          set({ step: steps[currentIndex - 1] });
        }
      },
    }),
    {
      name: "therefore-flow-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
