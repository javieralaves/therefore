import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type StudioStep = "plan" | "script" | "make" | "publish";

export type ArollMode = "upload" | "ai" | "record-later";

interface FlowState {
  // Studio flow state
  step: StudioStep;
  draftId: string | null;

  // Script state
  selectedScriptId: string | null;
  scriptEditorContent: string;

  // Make state
  aRollMode: ArollMode;
  selectedBrollIds: string[];
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
  setSelectedScriptId: (id: string | null) => void;
  setScriptEditorContent: (content: string) => void;
  setArollMode: (mode: ArollMode) => void;
  toggleBrollSelection: (id: string) => void;
  setAutoCaptions: (enabled: boolean) => void;
  setBrandStyleCaptions: (enabled: boolean) => void;
  togglePlatform: (platform: "instagram" | "tiktok" | "youtube") => void;
  setCaption: (caption: string) => void;
  setHashtags: (hashtags: string) => void;
  resetFlow: () => void;
  nextStep: () => void;
  previousStep: () => void;
}

const initialState = {
  step: "plan" as StudioStep,
  draftId: null,
  selectedScriptId: null,
  scriptEditorContent: "",
  aRollMode: "upload" as ArollMode,
  selectedBrollIds: [],
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

      setSelectedScriptId: (id) => set({ selectedScriptId: id }),

      setScriptEditorContent: (content) =>
        set({ scriptEditorContent: content }),

      setArollMode: (mode) => set({ aRollMode: mode }),

      toggleBrollSelection: (id) =>
        set((state) => ({
          selectedBrollIds: state.selectedBrollIds.includes(id)
            ? state.selectedBrollIds.filter((bId) => bId !== id)
            : [...state.selectedBrollIds, id],
        })),

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

      resetFlow: () => set(initialState),

      nextStep: () => {
        const currentStep = get().step;
        const steps: StudioStep[] = ["plan", "script", "make", "publish"];
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex < steps.length - 1) {
          set({ step: steps[currentIndex + 1] });
        }
      },

      previousStep: () => {
        const currentStep = get().step;
        const steps: StudioStep[] = ["plan", "script", "make", "publish"];
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
