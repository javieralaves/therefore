// Mock data for Therefore V2 prototype

import type {
  Opportunity,
  ApprovedCreator,
  ScriptVariant,
  Guardrail,
  ComposeSlotId,
  ComposeSlot,
} from "./types";
import type { GuardrailStatus } from "./types"; // Used in Guardrail interface

// ============================================================================
// V1 INTERFACES (kept for backward compatibility during migration)
// ============================================================================

export interface IntentSuggestion {
  id: string;
  title: string;
  description: string;
  isSponsored: boolean;
  challengeSlug?: string;
}

export interface ChallengeBrief {
  slug: string;
  brandName: string;
  brandLogo: string;
  whySuggested: string;
  payoutModel: string;
  payoutAmount: string;
  mustSayBullets: string[];
  exampleCount: number;
  // V2 additions
  countries: string[];
  budgetTotalUsd: number;
  budgetRemainingUsd: number;
  closesAt: string;
}

export interface ChatMessage {
  sender: "therefore" | "user";
  content: string;
}

export interface BrollItem {
  id: string;
  label: string;
  duration: string;
}

export interface GuardrailCheck {
  id: string;
  label: string;
  status: "pass" | "warning" | "fail";
}

// ============================================================================
// V2 DATA: OPPORTUNITIES
// ============================================================================

export const mockOpportunities: Opportunity[] = [
  {
    slug: "notion",
    brand: "Notion",
    cpmUsd: 45,
    budgetTotalUsd: 50000,
    budgetRemainingUsd: 32000,
    closesAt: "2025-10-14T23:59:59Z", // 8 days from Oct 6
    countries: ["US", "CA", "UK", "AU"],
    whyYou:
      "Your productivity content gets 2.3x average views and your audience asks about workflow tools.",
    platforms: ["shorts"],
  },
  {
    slug: "canva",
    brand: "Canva",
    cpmUsd: 38,
    budgetTotalUsd: 40000,
    budgetRemainingUsd: 28000,
    closesAt: "2025-10-20T23:59:59Z", // 14 days
    countries: ["US", "CA", "UK", "AU", "NZ"],
    whyYou:
      "You frequently create design content and your audience engages heavily with tool recommendations.",
    platforms: ["shorts"],
  },
  {
    slug: "grammarly",
    brand: "Grammarly",
    cpmUsd: 52,
    budgetTotalUsd: 60000,
    budgetRemainingUsd: 15000,
    closesAt: "2025-10-10T23:59:59Z", // 4 days - urgent
    countries: ["US", "CA", "UK"],
    whyYou:
      "Your writing tips videos perform well, and Grammarly aligns with your educational tone.",
    platforms: ["shorts"],
  },
  {
    slug: "shopify",
    brand: "Shopify",
    cpmUsd: 65,
    budgetTotalUsd: 80000,
    budgetRemainingUsd: 60000,
    closesAt: "2025-10-25T23:59:59Z", // 19 days
    countries: ["US", "CA", "UK", "AU"],
    whyYou:
      "You've covered e-commerce tips before and have an audience interested in side hustles.",
    platforms: ["shorts"],
  },
  {
    slug: "figma",
    brand: "Figma",
    cpmUsd: 42,
    budgetTotalUsd: 45000,
    budgetRemainingUsd: 38000,
    closesAt: "2025-10-18T23:59:59Z", // 12 days
    countries: ["US", "CA", "UK", "DE", "FR"],
    whyYou:
      "Your design workflow content resonates with UX/UI designers who are Figma's core audience.",
    platforms: ["shorts"],
  },
  {
    slug: "discord",
    brand: "Discord",
    cpmUsd: 35,
    budgetTotalUsd: 35000,
    budgetRemainingUsd: 25000,
    closesAt: "2025-10-22T23:59:59Z", // 16 days
    countries: ["US", "CA", "UK", "AU", "NZ", "DE"],
    whyYou:
      "Your community-building content aligns with Discord's focus on creator communities.",
    platforms: ["shorts"],
  },
  {
    slug: "calendly",
    brand: "Calendly",
    cpmUsd: 40,
    budgetTotalUsd: 30000,
    budgetRemainingUsd: 22000,
    closesAt: "2025-10-16T23:59:59Z", // 10 days
    countries: ["US", "CA", "UK"],
    whyYou:
      "Freelancers in your audience frequently ask about scheduling tools and productivity hacks.",
    platforms: ["shorts"],
  },
  {
    slug: "mailchimp",
    brand: "Mailchimp",
    cpmUsd: 48,
    budgetTotalUsd: 55000,
    budgetRemainingUsd: 45000,
    closesAt: "2025-10-28T23:59:59Z", // 22 days
    countries: ["US", "CA", "UK", "AU"],
    whyYou:
      "You've shared marketing tips before and your audience includes small business owners.",
    platforms: ["shorts"],
  },
];

// ============================================================================
// V2 DATA: APPROVED CREATORS
// ============================================================================

export const mockApprovedCreators: ApprovedCreator[] = [
  {
    id: "creator-1",
    handle: "@sarahdesigns",
    platform: "instagram",
    views: 125000,
  },
  {
    id: "creator-2",
    handle: "@productivitypro",
    platform: "tiktok",
    views: 340000,
  },
  {
    id: "creator-3",
    handle: "@workflowwizard",
    platform: "youtube",
    views: 89000,
  },
  {
    id: "creator-4",
    handle: "@creativehustle",
    platform: "instagram",
    views: 210000,
  },
  {
    id: "creator-5",
    handle: "@techexplained",
    platform: "tiktok",
    views: 156000,
  },
  {
    id: "creator-6",
    handle: "@designdaily",
    platform: "youtube",
    views: 98000,
  },
];

// ============================================================================
// V2 DATA: BRAND MEDIA (for Compose step media picker)
// ============================================================================

export interface BrandMediaItem {
  id: string;
  label: string;
  recommendedFor: ComposeSlotId;
  duration: string;
}

export const mockBrandMedia: BrandMediaItem[] = [
  {
    id: "media-1",
    label: "Notion dashboard overview",
    recommendedFor: "hook",
    duration: "3s",
  },
  {
    id: "media-2",
    label: "Linked database demo",
    recommendedFor: "body",
    duration: "5s",
  },
  {
    id: "media-3",
    label: "Template gallery",
    recommendedFor: "body",
    duration: "4s",
  },
  {
    id: "media-4",
    label: "Web clipper in action",
    recommendedFor: "body",
    duration: "4s",
  },
  {
    id: "media-5",
    label: "Mobile app sync",
    recommendedFor: "body",
    duration: "3s",
  },
  {
    id: "media-6",
    label: "CTA screen with link",
    recommendedFor: "cta",
    duration: "3s",
  },
  {
    id: "media-7",
    label: "Notion AI assistant",
    recommendedFor: "body",
    duration: "4s",
  },
  {
    id: "media-8",
    label: "Before/after comparison",
    recommendedFor: "hook",
    duration: "4s",
  },
];

// ============================================================================
// V2 DATA: SCRIPT VARIANTS (with slot structure)
// ============================================================================

export const mockScriptVariants: ScriptVariant[] = [
  {
    id: "variant-1",
    title: "Relatable Problem → Solution",
    why: 'Matches your authentic, relatable style. Opens with the struggle your audience feels (tabs, sticky notes), uses "real talk" phrasing common in your recent videos, and the CTA mirrors your "genuinely" language that drives trust.',
    slots: {
      hook: {
        overlayText:
          "Notion sponsored this, but real talk—I was drowning in tabs and sticky notes until I found these 3 features. #ad",
      },
      body: {
        overlayText:
          "First: linked databases. I can see my projects, deadlines, and ideas in one view. Second: templates. I cloned my weekly review template and never start from scratch. Third: web clipper. I save inspiration directly into my mood board.",
      },
      cta: {
        overlayText:
          "Try it free at notion.so/yourname—link in bio. It genuinely changed how I work.",
      },
    },
  },
  {
    id: "variant-2",
    title: "Fast-Paced Discovery",
    why: 'Higher energy, trending "let\'s go" format. Works if you want to test a punchier style. More platform-friendly for scrolling viewers, but slightly less "you."',
    slots: {
      hook: {
        overlayText:
          "#ad with Notion—3 features that saved my workflow. Let's go.",
      },
      body: {
        overlayText:
          "One: linked databases = one dashboard for everything. Two: templates = never rebuild from zero. Three: web clipper = save ideas in one click.",
      },
      cta: {
        overlayText: "Free plan at notion.so/yourname. You'll thank me later.",
      },
    },
  },
  {
    id: "variant-3",
    title: "Story-Led Transformation",
    why: 'Most narrative-driven, leans into "before/after" transformation. Builds empathy with specific pain points (47 tabs!). Best for audience retention, but needs strong B-roll pacing to work.',
    slots: {
      hook: {
        overlayText:
          "Notion's sponsoring this, but here's what actually happened when I started using it.",
      },
      body: {
        overlayText:
          "I used to have 47 browser tabs open. Notion's linked databases let me close 45 of them. I used to rebuild my weekly plan every Sunday. Their templates cut that to 30 seconds. I used to screenshot inspiration and lose it. Web clipper sends it straight to my workspace.",
      },
      cta: {
        overlayText:
          "It's free to start—notion.so/yourname. Honestly, I should've switched sooner.",
      },
    },
  },
];

// ============================================================================
// V2 HELPER FUNCTIONS
// ============================================================================

/**
 * Format ISO date string to "Closes in X days" format
 */
export function formatClosesIn(closesAt: string): string {
  const now = new Date("2025-10-06"); // Mock current date
  const closes = new Date(closesAt);
  const diffTime = closes.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Closed";
  if (diffDays === 0) return "Closes today";
  if (diffDays === 1) return "Closes tomorrow";
  return `Closes in ${diffDays} days`;
}

/**
 * Calculate budget progress percentage
 */
export function budgetProgress(
  total: number,
  remaining: number
): { percent: number; spent: number } {
  const spent = total - remaining;
  const percent = Math.round((spent / total) * 100);
  return { percent, spent };
}

// ============================================================================
// V2 GUARDRAILS (panel format with checks based on slots)
// ============================================================================

interface GuardrailCheckParams {
  brandName: string;
  slots: Record<ComposeSlotId, ComposeSlot>;
  requireHashtagAd?: boolean;
  requireBrandDemo?: boolean;
  minSec?: number;
  maxSec?: number;
}

export function checkGuardrails(params: GuardrailCheckParams): Guardrail[] {
  const {
    brandName,
    slots,
    requireHashtagAd = true,
    requireBrandDemo = true,
    minSec = 15,
    maxSec = 60,
  } = params;

  const allText = Object.values(slots)
    .map((s) => s.overlayText)
    .join(" ")
    .toLowerCase();

  const totalDuration = Object.values(slots).reduce(
    (sum, s) => sum + s.targetSec,
    0
  );

  const hasBrandMedia = Object.values(slots).some(
    (s) => s.mediaBrandIds.length > 0
  );

  const hookText = slots.hook.overlayText.toLowerCase();

  const checks: Guardrail[] = [];

  // Check 1: Brand mention
  const hasBrandMention = allText.includes(brandName.toLowerCase());
  const brandStatus: GuardrailStatus = hasBrandMention ? "pass" : "fail";
  checks.push({
    id: "brand-mention",
    label: `Brand mention ("${brandName}")`,
    status: brandStatus,
    message: hasBrandMention ? undefined : `Add "${brandName}" to any slot`,
    fix: hasBrandMention
      ? undefined
      : `Mention ${brandName} in your hook or body`,
  });

  // Check 2: #ad upfront
  const hasAdDisclosure =
    hookText.includes("#ad") || hookText.includes("sponsored");
  checks.push({
    id: "ad-disclosure",
    label: "#ad upfront",
    status: requireHashtagAd && !hasAdDisclosure ? "fail" : "pass",
    message:
      requireHashtagAd && !hasAdDisclosure ? "Add #ad to Hook slot" : undefined,
    fix:
      requireHashtagAd && !hasAdDisclosure
        ? 'Add "#ad" or "sponsored" to the beginning of your hook'
        : undefined,
  });

  // Check 3: Visual brand demo
  checks.push({
    id: "brand-demo",
    label: "Visual brand demo",
    status: requireBrandDemo && !hasBrandMedia ? "warn" : "pass",
    message:
      requireBrandDemo && !hasBrandMedia
        ? "Add brand media to at least one slot"
        : undefined,
    fix:
      requireBrandDemo && !hasBrandMedia
        ? "Select branded media from the media picker"
        : undefined,
  });

  // Check 4: CTA present
  const ctaText = slots.cta.overlayText.toLowerCase();
  const hasCTA =
    ctaText.length > 10 &&
    (ctaText.includes("link") ||
      ctaText.includes(".so") ||
      ctaText.includes(".com") ||
      ctaText.includes("bio"));
  checks.push({
    id: "cta-present",
    label: "CTA with link",
    status: hasCTA ? "pass" : "warn",
    message: hasCTA ? undefined : "Add a clear call-to-action with link",
    fix: hasCTA ? undefined : "Include your unique link in the CTA slot",
  });

  // Check 5: Duration estimate
  const durationOk = totalDuration >= minSec && totalDuration <= maxSec;
  checks.push({
    id: "duration",
    label: `Duration (~${minSec}-${maxSec}s)`,
    status: durationOk ? "pass" : "warn",
    message: durationOk
      ? undefined
      : `Current: ~${totalDuration}s (target: ${minSec}-${maxSec}s)`,
    fix: durationOk
      ? undefined
      : totalDuration < minSec
      ? "Add more content to reach minimum duration"
      : "Shorten your script to stay under maximum",
  });

  // Check 6: Format (always pass for prototype)
  checks.push({
    id: "format",
    label: "Format (9:16 vertical)",
    status: "pass",
  });

  return checks;
}

// ============================================================================
// V1 DATA (kept for backward compatibility)
// ============================================================================

// Intent suggestions for Home/Ask page
export const mockIntentSuggestions: IntentSuggestion[] = [
  {
    id: "notion-sponsored",
    title: "Create a productivity tool review",
    description: "Show how you organize your creative workflow",
    isSponsored: true,
    challengeSlug: "notion",
  },
  {
    id: "behind-scenes",
    title: "Share behind-the-scenes content",
    description: "Give your audience a peek into your process",
    isSponsored: false,
  },
  {
    id: "tutorial",
    title: "Teach a skill you recently learned",
    description: "Educational content performs well with your audience",
    isSponsored: false,
  },
  {
    id: "collab",
    title: "Announce a collaboration",
    description: "Partnerships drive engagement for creators like you",
    isSponsored: false,
  },
  {
    id: "trending",
    title: "Jump on a trending topic",
    description: "Timely content in your niche right now",
    isSponsored: false,
  },
  {
    id: "qa",
    title: "Answer frequently asked questions",
    description: "Your audience loves learning from you",
    isSponsored: false,
  },
];

// Challenge brief for Notion (the sponsored one) - V2 enhanced
export const mockChallengeBrief: ChallengeBrief = {
  slug: "notion",
  brandName: "Notion",
  brandLogo: "Notion",
  whySuggested:
    "You frequently create productivity content and have an engaged audience interested in workflow tools. Your recent videos about organization got 2.3x your average views.",
  payoutModel: "Performance CPM",
  payoutAmount: "$45 per 1,000 views (up to $2,250)",
  mustSayBullets: [
    'Mention "Notion" by name at least once',
    "Show the Notion interface (we'll provide B-roll)",
    "Include your unique link: notion.so/yourname",
    'Add #ad or "Sponsored by Notion" disclosure',
    "Keep it under 60 seconds",
  ],
  exampleCount: 4,
  // V2 additions
  countries: ["US", "CA", "UK", "AU"],
  budgetTotalUsd: 50000,
  budgetRemainingUsd: 32000,
  closesAt: "2025-10-14T23:59:59Z",
};

// Pre-seeded conversation for Plan step
export const mockPlanConversation: ChatMessage[] = [
  {
    sender: "therefore",
    content:
      "Let's plan your Notion short! First, who's your primary audience for this?",
  },
  {
    sender: "user",
    content:
      "Early-career creatives, like designers and freelancers who are trying to stay organized.",
  },
  {
    sender: "therefore",
    content:
      'Perfect. What angle do you want to take? For example: "Before/after my workflow", "3 Notion features I wish I knew sooner", or something else?',
  },
  {
    sender: "user",
    content:
      'I like the "features I wish I knew sooner" angle—feels authentic and helpful.',
  },
  {
    sender: "therefore",
    content:
      "Great! What tone feels right? Friendly tutorial? Excited discovery? Relatable struggle?",
  },
  {
    sender: "user",
    content:
      'Relatable struggle → discovery. Like "I was drowning in tabs, then I found these."',
  },
  {
    sender: "therefore",
    content:
      "Love it. Last thing: Notion requires an #ad disclosure. Where feels most natural—upfront in the first 2 seconds, or at the end?",
  },
  {
    sender: "user",
    content:
      'Upfront feels more trustworthy. I\'ll say "Notion sponsored this, but I actually use it."',
  },
  {
    sender: "therefore",
    content:
      "Perfect! I've captured everything. Here's your plan summary—ready to write scripts?",
  },
];

// Plan summary data
export const mockPlanSummary = {
  audience: "Early-career creatives (designers, freelancers)",
  angle: "3 Notion features I wish I knew sooner",
  tone: "Relatable struggle → helpful discovery",
  disclosure: '#ad upfront + "I actually use it"',
  duration: "45-55 seconds",
};

// B-roll items for Make step (V1 - kept for backward compatibility)
export const mockBrollItems: BrollItem[] = [
  { id: "broll-1", label: "Notion dashboard overview", duration: "3s" },
  { id: "broll-2", label: "Linked database demo", duration: "4s" },
  { id: "broll-3", label: "Template gallery", duration: "3s" },
  { id: "broll-4", label: "Web clipper in action", duration: "4s" },
  { id: "broll-5", label: "Mobile app sync", duration: "3s" },
  { id: "broll-6", label: "Collaboration features", duration: "4s" },
  { id: "broll-7", label: "Notion AI assistant", duration: "3s" },
  { id: "broll-8", label: "Calendar integration", duration: "3s" },
];

// User context data for /context page
export const mockUserContext = {
  connectedHandles: [
    { platform: "Instagram", handle: "@yourname", followers: "12.4K" },
    { platform: "TikTok", handle: "@yourname", followers: "8.9K" },
    { platform: "YouTube", handle: "@yourname", followers: "3.2K" },
  ],
  topics: [
    "Productivity",
    "Creative workflow",
    "Design tips",
    "Freelancing",
    "Tech reviews",
  ],
  toneChips: ["Relatable", "Authentic", "Educational", "Casual", "Encouraging"],
  recentPostsCount: 12,
};
