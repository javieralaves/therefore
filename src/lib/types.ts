// Shared TypeScript types for Therefore V2

export type StudioStep = "plan" | "compose" | "publish";

export type ComposeSlotId = "hook" | "body" | "cta";

export interface ComposeSlot {
  id: ComposeSlotId;
  label: string; // "Hook" | "Body" | "CTA"
  targetSec: number; // 3-5, 12-20, 3-5
  overlayText: string; // inline "script" for this slot
  aRollMode: "upload" | "ai"; // selected mode for A-roll
  mediaBrandIds: string[]; // selected brand demo clip ids for this slot
}

export interface ScriptVariant {
  id: string;
  title: string;
  why: string; // rationale
  slots: Record<ComposeSlotId, { overlayText: string }>;
}

export interface Opportunity {
  slug: string; // 'notion'
  brand: string; // 'Notion'
  cpmUsd: number; // 45
  budgetTotalUsd: number; // e.g., 50000
  budgetRemainingUsd: number;
  closesAt: string; // ISO date
  countries: string[]; // ['US','CA','UK','ES']
  whyYou: string; // 1-liner from context
  platforms: "shorts"[]; // keep simple
}

export interface ApprovedCreator {
  id: string;
  handle: string;
  platform: "instagram" | "tiktok" | "youtube";
  views: number;
}

// Guardrail types for panel format
export type GuardrailStatus = "pass" | "warn" | "fail";

export interface Guardrail {
  id: string;
  label: string; // e.g., "#ad upfront"
  status: GuardrailStatus;
  message?: string; // "Add #ad to Hook"
  fix?: string; // Quick suggestion text
}

// V3: Submission types for Brief page
export type SubmissionStatus =
  | "under_review"
  | "approved"
  | "rejected"
  | "live";

export interface Submission {
  id: string;
  title: string;
  platform: "instagram" | "tiktok" | "youtube";
  views: number;
  likes: number;
  comments: number;
  earningsUsd: number;
  postedAt: string; // ISO date
  videoPlaceholderLabel: string;
  creatorHandle: string;
  status?: SubmissionStatus;
  isMine?: boolean;
}

// V3: Flow item for sidebar
export interface FlowItem {
  id: string;
  title: string;
  lastEdited: string; // ISO date
}

// V3: User profile for sidebar
export interface UserProfile {
  name: string;
  handle: string;
  avatar: string; // emoji or URL
}

// V3: My media library item
export interface MyMediaItem {
  id: string;
  label: string;
  durationSec: number;
}
