import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  StudioStep,
  ComposeSlotId,
  ComposeSlot,
  Submission,
} from "./types";

interface FlowState {
  // Studio flow state
  step: StudioStep;
  draftId: string | null;

  // Compose state (V2: replaces Script + Make)
  slots: Record<ComposeSlotId, ComposeSlot>;
  selectedVariantId: string | null;

  // V3: Slot selection and media management
  selectedSlotId: ComposeSlotId | null;

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

  // V3: Submission tracking
  mySubmissionBySlug: Record<string, Submission>;

  // Actions
  setStep: (step: StudioStep) => void;
  setDraftId: (id: string) => void;
  applyScriptVariant: (variantId: string) => void;
  setSlotOverlay: (slotId: ComposeSlotId, text: string) => void;
  setSlotARollMode: (slotId: ComposeSlotId, mode: "upload" | "ai") => void;
  toggleSlotBrandMedia: (slotId: ComposeSlotId, mediaId: string) => void;

  // V3: New actions
  selectSlot: (slotId: ComposeSlotId) => void;
  assignMediaToSlot: (
    slotId: ComposeSlotId,
    source: "mine" | "brand",
    mediaId: string
  ) => void;
  clearMediaFromSlot: (slotId: ComposeSlotId) => void;

  // V3: Submission actions
  setMySubmission: (slug: string, submission: Submission) => void;
  getMySubmission: (slug: string) => Submission | null;

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
  selectedSlotId: "hook" as ComposeSlotId,
  autoCaptions: true,
  brandStyleCaptions: true,
  platformToggles: {
    instagram: true,
    tiktok: true,
    youtube: false,
  },
  caption: "",
  hashtags: "",
  mySubmissionBySlug: {},
};

// V3: Helper to check if all slots have media
export const allSlotsHaveMedia = (
  slots: Record<ComposeSlotId, ComposeSlot>
): boolean => {
  const slotIds: ComposeSlotId[] = ["hook", "body", "cta"];
  return slotIds.every((id) => slots[id].mediaBrandIds.length > 0);
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

      // V3: Slot selection
      selectSlot: (slotId) => set({ selectedSlotId: slotId }),

      // V3: Assign media to slot (replaces media array with single media)
      assignMediaToSlot: (slotId, source, mediaId) =>
        set((state) => ({
          slots: {
            ...state.slots,
            [slotId]: {
              ...state.slots[slotId],
              mediaBrandIds: source === "brand" ? [mediaId] : [`my-${mediaId}`],
            },
          },
        })),

      // V3: Clear media from slot
      clearMediaFromSlot: (slotId) =>
        set((state) => ({
          slots: {
            ...state.slots,
            [slotId]: {
              ...state.slots[slotId],
              mediaBrandIds: [],
            },
          },
        })),

      // V3: Submission management
      setMySubmission: (slug, submission) =>
        set((state) => ({
          mySubmissionBySlug: {
            ...state.mySubmissionBySlug,
            [slug]: submission,
          },
        })),

      getMySubmission: (slug) => {
        const state = get();
        return state.mySubmissionBySlug[slug] || null;
      },

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
      resetAll: () =>
        set({
          ...initialState,
          slots: createInitialSlots(),
          selectedSlotId: "hook" as ComposeSlotId,
          mySubmissionBySlug: {},
        }),

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
