// Mock data for Therefore prototype

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
}

export interface ChatMessage {
  sender: "therefore" | "user";
  content: string;
}

export interface ScriptVariant {
  id: string;
  title: string;
  hook: string;
  body: string[];
  cta: string;
  rationale: string;
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

// Challenge brief for Notion (the sponsored one)
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

// Script variants for Script step
export const mockScriptVariants: ScriptVariant[] = [
  {
    id: "variant-1",
    title: "Relatable Problem → Solution",
    hook: '[TO CAMERA] "Notion sponsored this, but real talk—I was drowning in tabs and sticky notes until I found these 3 features."',
    body: [
      '[SCREEN RECORD] "First: linked databases. I can see my projects, deadlines, and ideas in one view."',
      '[SCREEN RECORD] "Second: templates. I cloned my weekly review template and never start from scratch."',
      '[SCREEN RECORD] "Third: web clipper. I save inspiration directly into my mood board."',
    ],
    cta: '[TO CAMERA] "Try it free at notion.so/yourname—link in bio. It genuinely changed how I work."',
    rationale:
      'Matches your authentic, relatable style. Opens with the struggle your audience feels (tabs, sticky notes), uses "real talk" phrasing common in your recent videos, and the CTA mirrors your "genuinely" language that drives trust.',
  },
  {
    id: "variant-2",
    title: "Fast-Paced Discovery",
    hook: '[TO CAMERA] "#ad with Notion—3 features that saved my workflow. Let\'s go."',
    body: [
      '[FAST CUT - SCREEN] "One: linked databases = one dashboard for everything."',
      '[FAST CUT - SCREEN] "Two: templates = never rebuild from zero."',
      '[FAST CUT - SCREEN] "Three: web clipper = save ideas in one click."',
    ],
    cta: '[TO CAMERA] "Free plan at notion.so/yourname. You\'ll thank me later."',
    rationale:
      'Higher energy, trending "let\'s go" format. Works if you want to test a punchier style. More platform-friendly for scrolling viewers, but slightly less "you."',
  },
  {
    id: "variant-3",
    title: "Story-Led Transformation",
    hook: "[TO CAMERA] \"Notion's sponsoring this, but here's what actually happened when I started using it.\"",
    body: [
      '[B-ROLL + VO] "I used to have 47 browser tabs open. Notion\'s linked databases let me close 45 of them."',
      '[B-ROLL + VO] "I used to rebuild my weekly plan every Sunday. Their templates cut that to 30 seconds."',
      '[B-ROLL + VO] "I used to screenshot inspiration and lose it. Web clipper sends it straight to my workspace."',
    ],
    cta: "[TO CAMERA] \"It's free to start—notion.so/yourname. Honestly, I should've switched sooner.\"",
    rationale:
      'Most narrative-driven, leans into "before/after" transformation. Builds empathy with specific pain points (47 tabs!). Best for audience retention, but needs strong B-roll pacing to work.',
  },
];

// B-roll items for Make step
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

// Guardrail checks (dynamic based on content)
export const checkGuardrails = (scriptContent: string): GuardrailCheck[] => {
  const lowerContent = scriptContent.toLowerCase();

  return [
    {
      id: "brand-mention",
      label: 'Brand mention ("Notion")',
      status: lowerContent.includes("notion") ? "pass" : "fail",
    },
    {
      id: "disclosure",
      label: 'Disclosure (#ad or "sponsored")',
      status:
        lowerContent.includes("#ad") || lowerContent.includes("sponsor")
          ? "pass"
          : "fail",
    },
    {
      id: "cta",
      label: "CTA with link",
      status: lowerContent.includes("notion.so") ? "pass" : "warning",
    },
    {
      id: "duration",
      label: "Duration estimate (~45-55s)",
      status:
        scriptContent.length > 200 && scriptContent.length < 800
          ? "pass"
          : "warning",
    },
    {
      id: "format",
      label: "Format (9:16 vertical)",
      status: "pass", // Always pass for prototype
    },
  ];
};

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
